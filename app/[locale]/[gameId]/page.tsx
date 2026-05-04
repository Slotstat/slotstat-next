import ChartCasinoAndGameWrapper from "@/app/components/chart/ChartCasinoAndGameWrapper";
import getCasino from "@/lib/getCasino";
import getCasinoBonuses from "@/lib/getCasinoBonuses";
import getCasinoCards from "@/lib/getCasinoCards";
import getGameCards from "@/lib/getGameCards";
import getGamesList from "@/lib/getGamesList";
import getSingleGame from "@/lib/getSingleGame";
import { notFound } from "next/navigation";
import JsonLd from "@/app/components/JsonLd";
import Link from "next/link";
import axios from "axios";
import { baseUrl } from "@/lib/baseURL";

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const res = await axios({
      method: "get",
      url: `${baseUrl}/api/Game/aggregated/`,
      headers: { "User-Agent": "Vercel-Worker-Client" },
      params: { ord: "fixedRtp", direction: "desc", pageSize: 50 },
      timeout: 15000,
    });
    if (res.status !== 200) return [];
    const games: GameData[] = res.data?.results ?? [];
    return games
      .filter(
        (g) =>
          g.gameId &&
          g.gameId !== "00000000-0000-0000-0000-000000000000"
      )
      .map((g) => ({ gameId: g.gameId }));
  } catch {
    return [];
  }
}

async function safeGetSingleGame(gameId: string | undefined): Promise<GameData | undefined> {
  try {
    return await getSingleGame(gameId);
  } catch {
    return undefined;
  }
}

export async function generateMetadata({
  params: { gameId, locale },
  searchParams: { orderBy, keyWord, direction, isFiat, casId },
}: {
  params: { casinoId: string; gameId: string; locale: "en" | "es" | "pt" };
  searchParams: QueryParamsGamePage;
}) {
  const mainGame = await safeGetSingleGame(gameId);

  if (!mainGame) {
    notFound();
  }

  const title = `${mainGame.name} - ${mainGame.casinoName}`;
    const description = `Get insights on ${mainGame.name} at ${mainGame.casinoName}. Check current RTP, max win: ${mainGame.maxX}. Track your gameplay with detailed stats on Slotstat.`;
    const ogImage = mainGame.imageUrl || "https://slotstat.net/opengraph-image.png";

    return {
      title,
      description,
      openGraph: {
        images: ogImage,
        title,
        description,
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [ogImage],
      },
      alternates: {
        canonical: `/${locale}/${gameId}`,
        languages: {
          "en-US": `/en/${gameId}`,
          "es-ES": `/es/${gameId}`,
          "pt-PT": `/pt/${gameId}`,
        },
      },
    };
}

export default async function gamePage({
  params: { gameId, locale },
  searchParams: {
    orderBy,
    keyWord,
    direction,
    isFiat,
    compareGameId,
    ActiveTab = "slot",
    casId,
  },
}: {
  params: { gameId: string; locale: "en" | "es" | "pt" };
  searchParams: QueryParamsGamePage;
}) {
  const mainGame = await safeGetSingleGame(gameId);
  if (!mainGame) {
    notFound();
  }

  const gamesCardsData: Promise<Card[]> = getGameCards(locale, gameId);
  const casinoCardsData: Promise<Card[]> = getCasinoCards(locale, casId);
  const casinoBonusData: Promise<Card[]> = getCasinoBonuses(locale, casId);

  const [gameCards, casinoCards, casinoBonuses] = await Promise.all([
    gamesCardsData,
    casinoCardsData,
    casinoBonusData,
  ]);

  // const breadcrumbs = [
  //   {
  //     name: mainGameObj?.name,
  //   },
  // ];

  return (
    <div className="min-h-screen">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: mainGame.name,
          applicationCategory: "GameApplication",
          operatingSystem: "Web",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
          },
          ...(mainGame.provider && { author: { "@type": "Organization", name: mainGame.provider } }),
          ...(mainGame.imageUrl && { image: mainGame.imageUrl }),
          description: `${mainGame.name} at ${mainGame.casinoName}. Live RTP tracking, max win: ${mainGame.maxX}.`,
        }}
      />
      <ChartCasinoAndGameWrapper
        casId={casId}
        // casino={casino}
        casinoCardsData={casinoCardsData}
        casinoBonuses={casinoBonuses}
        // compareGame={compareGame}
        compareGameId={compareGameId}
        orderBy={orderBy}
        keyWord={keyWord}
        direction={direction}
        isFiat={isFiat}
        ActiveTab={ActiveTab}
        casinoCards={casinoCards}
        gameCards={gameCards}
        gameId={gameId}
        mainGameObj={mainGame}
        gamesCardsData={gamesCardsData}
      />

      <section className="mt-8 mb-4 p-4 md:p-6 rounded-xl bg-dark2 text-grey1 text-sm leading-relaxed">
        <h2 className="text-white text-base md:text-lg font-bold mb-2">
          {mainGame.name} Stats at {mainGame.casinoName}
        </h2>
        <p>
          {mainGame.name}
          {mainGame.provider ? `, developed by ${mainGame.provider},` : ""} is
          available at {mainGame.casinoName}.
          {mainGame.fixedRtp
            ? ` The current live RTP is ${mainGame.fixedRtp.toFixed(2)}%.`
            : ""}
          {mainGame.maxX ? ` The maximum win multiplier is ${mainGame.maxX}x.` : ""}
          {mainGame.wsr
            ? ` The Win Spin Rate (WSR) is currently ${mainGame.wsr.toFixed(2)}%, indicating the frequency of spins that pay out more than the initial bet.`
            : ""}
          {mainGame.sps !== undefined && mainGame.sps !== null
            ? ` The Slot Profit Status (SPS) is ${mainGame.sps > 0 ? "+" : ""}${mainGame.sps.toFixed(2)}%, meaning the game is currently paying ${mainGame.sps >= 0 ? "above" : "below"} its theoretical RTP.`
            : ""}
          {" "}All statistics are updated every 5 minutes based on real gameplay data.
        </p>
        <div className="flex flex-wrap gap-4 mt-3">
          {mainGame.provider && (
            <Link
              href={`/${locale}/providers/${encodeURIComponent(mainGame.provider)}`}
              className="text-xs text-blue1 hover:underline"
            >
              Browse all {mainGame.provider} slots →
            </Link>
          )}
          {mainGame.casinoName && (
            <Link
              href={`/${locale}/casinos/${encodeURIComponent(mainGame.casinoName)}`}
              className="text-xs text-blue1 hover:underline"
            >
              View all {mainGame.casinoName} slots →
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}
