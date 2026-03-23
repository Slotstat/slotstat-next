import slotStatClient from "@/lib/instance";
import { unstable_setRequestLocale } from "next-intl/server";
import JsonLd from "@/app/components/JsonLd";
import ProviderContent from "./ProviderContent";
import type { Metadata } from "next";

interface Props {
  params: { locale: "en" | "ka"; slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const providerName = decodeURIComponent(params.slug);
  return {
    title: `${providerName} Slots - Live RTP & Win Rate Statistics`,
    description: `Live RTP, win spin rate, and max win statistics for ${providerName} slot games. Real data from active casinos, updated every 5 minutes.`,
    openGraph: {
      images: "https://slotstat.net/opengraph-image.png",
      title: `${providerName} Slots - Live RTP Statistics`,
      description: `Live RTP, win spin rate, and max win statistics for ${providerName} slot games. Real casino data updated every 5 minutes.`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${providerName} Slots - Live RTP Statistics`,
      description: `Live RTP, win spin rate, and max win statistics for ${providerName} slot games. Real casino data updated every 5 minutes.`,
      images: ["https://slotstat.net/opengraph-image.png"],
    },
    alternates: {
      canonical: `/en/providers/${encodeURIComponent(providerName)}`,
      languages: {
        "en-US": `en/providers/${encodeURIComponent(providerName)}`,
      },
    },
  };
}

async function fetchProviderGames(
  locale: "en" | "ka",
  providerName: string
): Promise<GameData[]> {
  try {
    const res = await slotStatClient(locale).request({
      url: "/api/Game/aggregated/",
      method: "GET",
      params: {
        keyWord: providerName,
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

export default async function ProviderPage({ params }: Props) {
  unstable_setRequestLocale(params.locale);

  const providerName = decodeURIComponent(params.slug);
  const games = await fetchProviderGames(params.locale, providerName);

  const avgRtp =
    games.length > 0
      ? games.reduce((sum, g) => sum + (g.fixedRtp ?? 0), 0) / games.length
      : 0;

  const topByWsr = [...games].sort((a, b) => (b.wsr ?? 0) - (a.wsr ?? 0))[0];
  const topByMaxWin = [...games].sort(
    (a, b) => parseFloat(b.maxX ?? "0") - parseFloat(a.maxX ?? "0")
  )[0];

  return (
    <div className="text-white mt-6 mb-12 md:mb-20">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: `${providerName} Slots - Live RTP Statistics`,
          description: `Live RTP, win spin rate, and max win statistics for ${providerName} slot games.`,
          url: `https://slotstat.net/${params.locale}/providers/${encodeURIComponent(providerName)}`,
          mainEntity: {
            "@type": "ItemList",
            itemListElement: games.slice(0, 20).map((game, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: `${game.name} - ${game.casinoName}`,
              url: `https://slotstat.net/${params.locale}/${game.gameId}`,
            })),
          },
        }}
      />

      {/* Breadcrumb */}
      <nav className="text-xs text-grey1 mb-6">
        <a href={`/${params.locale}`} className="hover:text-white">
          Home
        </a>
        <span className="mx-2">/</span>
        <a href={`/${params.locale}/providers`} className="hover:text-white">
          Providers
        </a>
        <span className="mx-2">/</span>
        <span className="text-white">{providerName}</span>
      </nav>

      <div className="mb-8">
        <h1 className="text-2xl md:text-4xl font-bold mb-2">
          {providerName} Slots
        </h1>
        <p className="text-grey1 text-sm md:text-base">
          Live statistics for {providerName} games across active casinos. Data
          updated every 5 minutes.
        </p>
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
              {topByMaxWin?.maxX ? `${topByMaxWin.maxX}x` : "N/A"}
            </p>
          </div>
        </div>
      )}

      {/* Server-rendered summary for crawlers */}
      {games.length > 0 && (
        <section className="mb-6 p-4 rounded-xl bg-dark2 text-grey1 text-sm leading-relaxed">
          <p>
            {providerName} currently has {games.length} slot game
            {games.length !== 1 ? "s" : ""} tracked across multiple casinos on
            SlotStat.
            {avgRtp > 0 &&
              ` The average live RTP across these games is ${avgRtp.toFixed(2)}%.`}
            {topByWsr &&
              topByWsr.wsr > 0 &&
              ` The best Win Spin Rate (WSR) belongs to ${topByWsr.name} at ${topByWsr.wsr.toFixed(2)}%.`}
            {topByMaxWin &&
              topByMaxWin.maxX &&
              ` The highest max win multiplier is ${topByMaxWin.maxX}x on ${topByMaxWin.name}.`}
            {" "}All statistics are based on real casino gameplay data updated
            every 5 minutes.
          </p>
        </section>
      )}

      <ProviderContent games={games} providerName={providerName} locale={params.locale} />
    </div>
  );
}
