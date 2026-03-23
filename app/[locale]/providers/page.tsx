import slotStatClient from "@/lib/instance";
import { unstable_setRequestLocale } from "next-intl/server";
import JsonLd from "@/app/components/JsonLd";
import Link from "next/link";

export async function generateMetadata() {
  return {
    title: "Slot Game Providers - Live RTP Stats by Developer",
    description:
      "Browse slot game providers and their live RTP statistics. Compare Pragmatic Play, NetEnt, Play'n GO, Evolution, and more — real data updated every 5 minutes.",
    openGraph: {
      images: "https://slotstat.net/opengraph-image.png",
      title: "Slot Game Providers - Live RTP Stats by Developer",
      description:
        "Compare slot game providers by live RTP, win rate, and jackpot data. Real casino statistics updated every 5 minutes.",
    },
    twitter: {
      card: "summary_large_image",
      title: "Slot Game Providers - Live RTP Stats by Developer",
      description:
        "Compare slot game providers by live RTP, win rate, and jackpot data. Real casino statistics updated every 5 minutes.",
      images: ["https://slotstat.net/opengraph-image.png"],
    },
    alternates: {
      canonical: "/en/providers",
      languages: { "en-US": "en/providers" },
    },
  };
}

interface ProviderStat {
  name: string;
  gameCount: number;
  avgRtp: number;
  topGame: string;
}

async function fetchProviderStats(locale: "en" | "ka"): Promise<ProviderStat[]> {
  try {
    const res = await slotStatClient(locale).request({
      url: "/api/Game/aggregated/",
      method: "GET",
      params: { ord: "fixedRtp", direction: "desc", pageSize: 100 },
    });
    if (res.status !== 200) return [];

    const games: GameData[] = res.data?.results ?? [];

    const providerMap = new Map<string, { rtpSum: number; count: number; topGame: string }>();

    for (const game of games) {
      if (!game.provider) continue;
      const existing = providerMap.get(game.provider);
      if (existing) {
        existing.rtpSum += game.fixedRtp ?? 0;
        existing.count += 1;
      } else {
        providerMap.set(game.provider, {
          rtpSum: game.fixedRtp ?? 0,
          count: 1,
          topGame: game.name,
        });
      }
    }

    return Array.from(providerMap.entries())
      .map(([name, stats]) => ({
        name,
        gameCount: stats.count,
        avgRtp: stats.count > 0 ? stats.rtpSum / stats.count : 0,
        topGame: stats.topGame,
      }))
      .sort((a, b) => b.gameCount - a.gameCount);
  } catch {
    return [];
  }
}

export default async function ProvidersPage({
  params: { locale },
}: {
  params: { locale: "en" | "ka" };
}) {
  unstable_setRequestLocale(locale);

  const providers = await fetchProviderStats(locale);

  return (
    <div className="text-white mt-6 mb-12 md:mb-20">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Slot Game Providers - Live RTP Statistics",
          description:
            "Browse slot game providers and compare live RTP statistics across Pragmatic Play, NetEnt, Evolution, and more.",
          url: `https://slotstat.net/${locale}/providers`,
          mainEntity: {
            "@type": "ItemList",
            itemListElement: providers.slice(0, 20).map((p, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: p.name,
              url: `https://slotstat.net/${locale}/providers/${encodeURIComponent(p.name)}`,
            })),
          },
        }}
      />

      <div className="mb-8">
        <h1 className="text-2xl md:text-4xl font-bold mb-2">
          Slot Game Providers
        </h1>
        <p className="text-grey1 text-sm md:text-base">
          Live RTP statistics by game developer. Updated every 5 minutes from
          real casino data.
        </p>
      </div>

      {providers.length === 0 ? (
        <p className="text-grey1">No provider data available right now. Try again later.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {providers.map((provider) => (
            <Link
              key={provider.name}
              href={`/${locale}/providers/${encodeURIComponent(provider.name)}`}
              className="block p-4 md:p-5 rounded-xl bg-dark2 hover:ring-1 hover:ring-blue1 transition-all"
            >
              <h2 className="text-white font-bold text-sm md:text-base mb-1 truncate">
                {provider.name}
              </h2>
              <p className="text-grey1 text-xs mb-3">
                {provider.gameCount} game{provider.gameCount !== 1 ? "s" : ""} tracked
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-grey1 text-[10px] uppercase tracking-wide">
                    Avg RTP
                  </p>
                  <p
                    className={`font-bold text-sm ${
                      provider.avgRtp > 96
                        ? "text-green-400"
                        : provider.avgRtp > 94
                          ? "text-yellow-400"
                          : "text-grey1"
                    }`}
                  >
                    {provider.avgRtp > 0 ? `${provider.avgRtp.toFixed(2)}%` : "N/A"}
                  </p>
                </div>
                <svg
                  className="w-4 h-4 text-grey1"
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
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
