import slotStatClient from "@/lib/instance";
import { unstable_setRequestLocale } from "next-intl/server";
import JsonLd from "@/app/components/JsonLd";
import CasinoContent from "./CasinoContent";
import type { Metadata } from "next";
import { baseUrl } from "@/lib/baseURL";
import { isPublishableName, toSlug } from "@/lib/slug";
import axios from "axios";
import { redirect, notFound } from "next/navigation";

export const revalidate = 3600;

interface Props {
  params: { locale: "en" | "es" | "pt"; slug: string };
}

async function resolveCasinoName(slug: string): Promise<string | undefined> {
  try {
    const res = await axios({
      method: "get",
      url: `${baseUrl}/api/Game/aggregated/`,
      headers: { "User-Agent": "Vercel-Worker-Client" },
      params: { ord: "fixedRtp", direction: "desc", pageSize: 200 },
      timeout: 15000,
    });
    if (res.status !== 200) return undefined;
    const games: GameData[] = res.data?.results ?? [];
    const seen = new Set<string>();
    for (const g of games) {
      const name = g.casinoName?.trim();
      if (!name || seen.has(name)) continue;
      seen.add(name);
      if (toSlug(name) === slug) return name;
    }
    return undefined;
  } catch {
    return undefined;
  }
}

export async function generateStaticParams() {
  try {
    const res = await axios({
      method: "get",
      url: `${baseUrl}/api/Game/aggregated/`,
      headers: { "User-Agent": "Vercel-Worker-Client" },
      params: { ord: "fixedRtp", direction: "desc", pageSize: 100 },
      timeout: 15000,
    });
    if (res.status !== 200) return [];
    const games: GameData[] = res.data?.results ?? [];
    const seen = new Set<string>();
    const params: { slug: string }[] = [];
    for (const g of games) {
      const name = g.casinoName?.trim();
      if (!name || seen.has(name) || !isPublishableName(name)) continue;
      seen.add(name);
      params.push({ slug: toSlug(name) });
    }
    return params;
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const rawSlug = decodeURIComponent(params.slug);
  const normalisedSlug = toSlug(rawSlug);

  if (rawSlug !== normalisedSlug) {
    redirect(`/en/casinos/${normalisedSlug}`);
  }

  const casinoName = await resolveCasinoName(normalisedSlug);
  if (!casinoName) notFound();

  const canonicalPath = `/en/casinos/${normalisedSlug}`;

  return {
    title: `${casinoName} - Live Slot RTP & Win Rate Statistics`,
    description: `Live RTP, win spin rate, and max win statistics for slots at ${casinoName}. Real casino data updated every 5 minutes.`,
    openGraph: {
      images: "https://slotstat.net/opengraph-image.png",
      title: `${casinoName} - Live Slot RTP Statistics`,
      description: `Live RTP and win rate stats for slots at ${casinoName}. Real data updated every 5 minutes.`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${casinoName} - Live Slot RTP Statistics`,
      description: `Live RTP and win rate stats for slots at ${casinoName}. Real data updated every 5 minutes.`,
      images: ["https://slotstat.net/opengraph-image.png"],
    },
    alternates: {
      canonical: canonicalPath,
    },
  };
}

async function fetchCasinoGames(
  locale: "en" | "es" | "pt",
  casinoName: string
): Promise<GameData[]> {
  try {
    const res = await slotStatClient(locale).request({
      url: "/api/Game/aggregated/",
      method: "GET",
      params: {
        keyWord: casinoName,
        ord: "fixedRtp",
        direction: "desc",
        pageSize: 50,
      },
    });
    if (res.status !== 200) return [];
    return res.data?.results ?? [];
  } catch {
    return [];
  }
}

export default async function CasinoPage({ params }: Props) {
  unstable_setRequestLocale(params.locale);

  const rawSlug = decodeURIComponent(params.slug);
  const normalisedSlug = toSlug(rawSlug);
  if (rawSlug !== normalisedSlug) {
    redirect(`/${params.locale}/casinos/${normalisedSlug}`);
  }

  const casinoName = await resolveCasinoName(normalisedSlug);
  if (!casinoName) notFound();

  const games = await fetchCasinoGames(params.locale, casinoName);
  // Empty casino page = soft-404 to Google. Drop it.
  if (games.length === 0) notFound();

  const casinoImageUrl = games[0]?.casinoImageUrl;
  const redirectUrl = games[0]?.redirectUrl;

  const avgRtp =
    games.length > 0
      ? games.reduce((sum, g) => sum + (g.fixedRtp ?? 0), 0) / games.length
      : 0;

  const topByWsr = [...games].sort((a, b) => (b.wsr ?? 0) - (a.wsr ?? 0))[0];
  const topByMaxWin = [...games].sort(
    (a, b) => parseFloat(b.maxX ?? "0") - parseFloat(a.maxX ?? "0")
  )[0];

  const hasValidImage =
    !!casinoImageUrl &&
    casinoImageUrl !== "null" &&
    (casinoImageUrl.startsWith("http://") ||
      casinoImageUrl.startsWith("https://"));

  return (
    <div className="text-white mt-6 mb-12 md:mb-20">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: `${casinoName} - Live Slot RTP Statistics`,
          description: `Live RTP and win rate statistics for slots at ${casinoName}.`,
          url: `https://slotstat.net/en/casinos/${normalisedSlug}`,
          mainEntity: {
            "@type": "ItemList",
            numberOfItems: games.length,
            itemListElement: games.slice(0, 20).map((game, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: `${game.name} - ${game.casinoName}`,
              url: `https://slotstat.net/en/${game.gameId}`,
            })),
          },
        }}
      />
      {games.length > 0 && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            name: casinoName,
            url: `https://slotstat.net/en/casinos/${normalisedSlug}`,
            ...(hasValidImage && { logo: casinoImageUrl }),
            description: `${casinoName} is an online casino tracked by SlotStat with ${games.length} slot game${games.length !== 1 ? "s" : ""} monitored for live RTP and win-rate statistics.`,
          }}
        />
      )}

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `https://slotstat.net/${params.locale}` },
            { "@type": "ListItem", position: 2, name: "Casinos", item: `https://slotstat.net/${params.locale}/casinos` },
            { "@type": "ListItem", position: 3, name: casinoName },
          ],
        }}
      />

      {/* Breadcrumb */}
      <nav className="text-xs text-grey1 mb-6">
        <a href={`/${params.locale}`} className="hover:text-white">
          Home
        </a>
        <span className="mx-2">/</span>
        <a href={`/${params.locale}/casinos`} className="hover:text-white">
          Casinos
        </a>
        <span className="mx-2">/</span>
        <span className="text-white">{casinoName}</span>
      </nav>

      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        {/* TODO(aws-s3): restore casino logo — S3 image hosting broken, see memory project_aws_s3_images_broken */}
        {/* {hasValidImage && (
          <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-grey3 shrink-0">
            <img
              src={casinoImageUrl}
              alt={casinoName}
              className="w-full h-full object-cover"
            />
          </div>
        )} */}
        <div>
          <h1 className="text-2xl md:text-4xl font-bold">{casinoName}</h1>
          <p className="text-grey1 text-sm mt-1">
            Live slot statistics updated every 5 minutes.
          </p>
        </div>
        {redirectUrl && (
          <a
            href={redirectUrl}
            target="_blank"
            rel="nofollow noopener noreferrer sponsored"
            className="ml-auto shrink-0 px-5 py-2 bg-blue1 text-white font-bold rounded-xl hover:opacity-90 transition-opacity text-sm"
          >
            Play
          </a>
        )}
      </div>

      {/* Summary stats */}
      {games.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          <div className="p-4 rounded-xl bg-dark2">
            <p className="text-grey1 text-xs uppercase tracking-wide mb-1">
              Games Tracked
            </p>
            <p className="text-white font-bold text-lg">{games.length}</p>
          </div>
          <div className="p-4 rounded-xl bg-dark2">
            <p className="text-grey1 text-xs uppercase tracking-wide mb-1">
              Avg Live RTP
            </p>
            <p
              className={`font-bold text-lg ${avgRtp > 96 ? "text-green-400" : avgRtp > 94 ? "text-yellow-400" : "text-white"}`}
            >
              {avgRtp > 0 ? `${avgRtp.toFixed(2)}%` : "N/A"}
            </p>
          </div>
          <div className="p-4 rounded-xl bg-dark2">
            <p className="text-grey1 text-xs uppercase tracking-wide mb-1">
              Top WSR Game
            </p>
            <p className="text-white font-bold text-sm truncate">
              {topByWsr?.name ?? "N/A"}
            </p>
          </div>
          <div className="p-4 rounded-xl bg-dark2">
            <p className="text-grey1 text-xs uppercase tracking-wide mb-1">
              Highest Max Win
            </p>
            <p className="text-white font-bold text-sm truncate">
              {topByMaxWin?.maxX ? `${topByMaxWin.maxX}` : "N/A"}
            </p>
          </div>
        </div>
      )}

      {/* Crawler-readable summary */}
      {games.length > 0 && (
        <section className="mb-6 p-4 rounded-xl bg-dark2 text-grey1 text-sm leading-relaxed">
          <p>
            {casinoName} currently has {games.length} slot game
            {games.length !== 1 ? "s" : ""} tracked on SlotStat.
            {avgRtp > 0 &&
              ` The average live RTP across these games is ${avgRtp.toFixed(2)}%.`}
            {topByWsr &&
              topByWsr.wsr > 0 &&
              ` The best Win Spin Rate belongs to ${topByWsr.name} at ${topByWsr.wsr.toFixed(2)}%.`}
            {" "}All statistics are based on real gameplay data updated every 5
            minutes.
          </p>
        </section>
      )}

      <CasinoContent
        games={games}
        casinoName={casinoName}
        locale={params.locale}
      />
    </div>
  );
}
