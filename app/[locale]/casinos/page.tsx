import slotStatClient from "@/lib/instance";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import JsonLd from "@/app/components/JsonLd";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 3600;

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: "casinos" });
  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      images: "https://slotstat.net/opengraph-image.png",
      title: t("title"),
      description: t("description"),
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: ["https://slotstat.net/opengraph-image.png"],
    },
    alternates: {
      canonical: `/${locale}/casinos`,
      languages: { "en-US": "/en/casinos", "es-ES": "/es/casinos", "pt-PT": "/pt/casinos" },
    },
  };
}

interface CasinoEntry {
  casinoId: string;
  name: string;
  imageUrl: string;
  redirectUrl: string;
  gameCount: number;
  avgRtp: number;
  totalSpins: number;
}

async function fetchCasinos(locale: "en" | "es" | "pt"): Promise<CasinoEntry[]> {
  try {
    const res = await slotStatClient(locale).request({
      url: "/api/Game/aggregated/",
      method: "GET",
      params: { ord: "fixedRtp", direction: "desc", pageSize: 100 },
    });
    if (res.status !== 200) return [];

    const games: GameData[] = res.data?.results ?? [];
    const casinoMap = new Map<string, CasinoEntry>();

    for (const game of games) {
      if (!game.casinoId) continue;
      const existing = casinoMap.get(game.casinoId);
      if (existing) {
        existing.gameCount += 1;
        existing.avgRtp =
          (existing.avgRtp * (existing.gameCount - 1) + (game.fixedRtp ?? 0)) /
          existing.gameCount;
        existing.totalSpins += game.t1H ?? 0;
      } else {
        casinoMap.set(game.casinoId, {
          casinoId: game.casinoId,
          name: game.casinoName,
          imageUrl: game.casinoImageUrl,
          redirectUrl: game.redirectUrl,
          gameCount: 1,
          avgRtp: game.fixedRtp ?? 0,
          totalSpins: game.t1H ?? 0,
        });
      }
    }

    return Array.from(casinoMap.values()).sort(
      (a, b) => b.gameCount - a.gameCount
    );
  } catch (err) {
    console.error("[Casinos] fetch error:", err);
    return [];
  }
}

export default async function CasinosPage({
  params: { locale },
}: {
  params: { locale: "en" | "es" | "pt" };
}) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "casinos" });
  const casinos = await fetchCasinos(locale);

  const hasValidImage = (url: string | undefined) =>
    !!url &&
    url !== "null" &&
    url !== "" &&
    (url.startsWith("http://") || url.startsWith("https://"));

  return (
    <div className="text-white mt-6 mb-12 md:mb-20">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Online Casinos - Live RTP Statistics",
          description:
            "Compare online casinos by live RTP, win spin rate, and player activity. Real casino data updated every 5 minutes.",
          url: `https://slotstat.net/${locale}/casinos`,
          mainEntity: {
            "@type": "ItemList",
            itemListElement: casinos.slice(0, 20).map((casino, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: casino.name,
              url: `https://slotstat.net/${locale}/casinos/${encodeURIComponent(casino.name)}`,
            })),
          },
        }}
      />

      <div className="mb-8">
        <h1 className="text-2xl md:text-4xl font-bold mb-2">{t("heading")}</h1>
        <p className="text-grey1 text-sm md:text-base">
          {t("subheading")}
        </p>
      </div>

      {casinos.length === 0 ? (
        <p className="text-grey1">
          {t("noData")}
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {casinos.map((casino) => (
            <Link
              key={casino.casinoId}
              href={`/${locale}/casinos/${encodeURIComponent(casino.name)}`}
              className="flex items-center gap-4 p-4 rounded-xl bg-dark2 hover:ring-1 hover:ring-blue1 transition-all"
            >
              <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-grey3 shrink-0">
                {hasValidImage(casino.imageUrl) ? (
                  <Image
                    src={casino.imageUrl}
                    alt={casino.name}
                    fill
                    className="object-cover"
                    sizes="48px"
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-grey1 text-xs font-bold">
                    {casino.name?.slice(0, 2).toUpperCase()}
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <h2 className="text-white font-bold text-sm md:text-base truncate">
                  {casino.name}
                </h2>
                <div className="flex gap-3 mt-1">
                  <span className="text-grey1 text-xs">
                    <span className="text-white font-bold">{casino.gameCount}</span>{" "}
                    {t("gamesTracked")}
                  </span>
                  {casino.avgRtp > 0 && (
                    <span className="text-grey1 text-xs">
                      <span
                        className={`font-bold ${casino.avgRtp > 96 ? "text-green-400" : "text-yellow-400"}`}
                      >
                        {casino.avgRtp.toFixed(1)}%
                      </span>{" "}
                      {t("avgRTP")}
                    </span>
                  )}
                </div>
              </div>

              <svg
                className="w-4 h-4 text-grey1 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          ))}
        </div>
      )}

      {casinos.length > 0 && (
        <section className="mt-10 p-5 md:p-6 rounded-xl bg-dark2 text-grey1 text-sm leading-relaxed space-y-3">
          <h2 className="text-white text-base md:text-lg font-bold">
            About SlotStat&apos;s casino tracking
          </h2>
          <p>
            SlotStat currently tracks {casinos.length} online casino
            {casinos.length !== 1 ? "s" : ""}, monitoring live RTP, win spin
            rate, and player activity in real time. Casinos are ranked by the
            number of slot games tracked and the average return-to-player (RTP)
            currently delivered across their game library, recalculated every
            five minutes from real gameplay data.
          </p>
          <p>
            Click into any casino to see the full slot lineup, the highest
            performing titles by Win Spin Rate (WSR), and the current Slot
            Profit Status (SPS) — a real-time indicator of whether games are
            paying above or below their theoretical RTP. All bonus and
            registration links are clearly marked as affiliate.
          </p>
          <p>
            Want to understand the metrics? Read{" "}
            <a href={`/${locale}/how-it-works`} className="text-blue1 hover:underline">
              how SlotStat works
            </a>{" "}
            or browse the{" "}
            <a href={`/${locale}/faq`} className="text-blue1 hover:underline">
              FAQ
            </a>
            {" "}for definitions of every statistic. SlotStat is a neutral
            observer — we do not run casinos and never edit live RTP data.
          </p>
        </section>
      )}
    </div>
  );
}
