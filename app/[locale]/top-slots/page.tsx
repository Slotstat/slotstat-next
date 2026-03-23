import slotStatClient from "@/lib/instance";
import { unstable_setRequestLocale } from "next-intl/server";
import JsonLd from "@/app/components/JsonLd";
import TopSlotsContent from "./TopSlotsContent";

export async function generateMetadata() {
  return {
    title: "Top Slots - Best RTP, Win Rate & Max Win Rankings",
    description:
      "Discover the top-performing slot games ranked by live RTP, win spin rate, and max win multiplier. Data-driven slot rankings updated in real-time.",
    openGraph: {
      images: "https://slotstat.net/opengraph-image.png",
      title: "Top Slots - Best RTP, Win Rate & Max Win Rankings",
      description:
        "Discover the top-performing slot games ranked by live RTP, win spin rate, and max win multiplier.",
    },
    twitter: {
      card: "summary_large_image",
      title: "Top Slots - Best RTP, Win Rate & Max Win Rankings",
      description:
        "Discover the top-performing slot games ranked by live RTP, win spin rate, and max win multiplier.",
      images: ["https://slotstat.net/opengraph-image.png"],
    },
    alternates: {
      canonical: "/en/top-slots",
      languages: {
        "en-US": "en/top-slots",
      },
    },
  };
}

async function fetchTopGames(
  locale: "en" | "ka",
  orderBy: string,
  direction: string,
  pageSize = 10
): Promise<GameData[]> {
  try {
    const res = await slotStatClient(locale).request({
      url: "/api/Game/aggregated/",
      method: "GET",
      params: {
        ord: orderBy,
        direction,
        pageSize,
      },
    });
    if (res.status !== 200) return [];
    return res.data?.results ?? [];
  } catch {
    return [];
  }
}

export default async function TopSlotsPage({
  params: { locale },
}: {
  params: { locale: "en" | "ka" };
}) {
  unstable_setRequestLocale(locale);

  const [highestRtp, bestWinRate, highestMaxWin] = await Promise.all([
    fetchTopGames(locale, "fixedRtp", "desc", 10),
    fetchTopGames(locale, "rtpState", "desc", 10),
    fetchTopGames(locale, "currencRtp", "desc", 10),
  ]);

  const allGames = [...highestRtp, ...bestWinRate, ...highestMaxWin];

  return (
    <div className="text-white mt-6 mb-12 md:mb-20">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Top Slots - Best RTP, Win Rate & Max Win Rankings",
          description:
            "Discover the top-performing slot games ranked by live RTP, win spin rate, and max win multiplier.",
          url: `https://slotstat.net/${locale}/top-slots`,
          mainEntity: {
            "@type": "ItemList",
            itemListElement: allGames.slice(0, 30).map((game, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: `${game.name} - ${game.casinoName}`,
              url: `https://slotstat.net/${locale}/${game.gameId}`,
            })),
          },
        }}
      />

      <div className="mb-8">
        <h1 className="text-2xl md:text-4xl font-bold mb-2">
          Top Performing Slots
        </h1>
        <p className="text-grey1 text-sm md:text-base">
          Live rankings based on real casino data. Updated every 5 minutes.
        </p>
      </div>

      <TopSlotsContent
        highestRtp={highestRtp}
        bestWinRate={bestWinRate}
        highestMaxWin={highestMaxWin}
      />
    </div>
  );
}
