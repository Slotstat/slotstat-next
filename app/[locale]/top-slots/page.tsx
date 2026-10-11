import { getAllGames } from "@/lib/catalogue";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import JsonLd from "@/app/components/JsonLd";
import TopSlotsContent from "./TopSlotsContent";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: "topSlots" });
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
      canonical: `/${locale}/top-slots`,
      languages: {
        "en-US": "/en/top-slots",
        "es-ES": "/es/top-slots",
        "pt-PT": "/pt/top-slots",
        "x-default": "/en/top-slots",
      },
    },
  };
}

// Top `pageSize` games by the given numeric field, highest first. Sorted
// locally from the shared catalogue instead of one backend request per list.
async function fetchTopGames(
  orderBy: "fixedRtp" | "rtpState" | "currencRtp",
  pageSize = 10
): Promise<GameData[]> {
  const games = await getAllGames();
  return [...games]
    .sort((a, b) => (Number(b[orderBy]) || 0) - (Number(a[orderBy]) || 0))
    .slice(0, pageSize);
}

export default async function TopSlotsPage({
  params: { locale },
}: {
  params: { locale: "en" | "es" | "pt" };
}) {
  unstable_setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "topSlots" });

  const [highestRtp, bestWinRate, highestMaxWin] = await Promise.all([
    fetchTopGames("fixedRtp", 10),
    fetchTopGames("rtpState", 10),
    fetchTopGames("currencRtp", 10),
  ]);

  const allGames = [...highestRtp, ...bestWinRate, ...highestMaxWin];

  return (
    <div className="text-white mt-6 mb-12 md:mb-20">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: t("title"),
          description: t("description"),
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
          {t("heading")}
        </h1>
        <p className="text-grey1 text-sm md:text-base">
          {t("subheading")}
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
