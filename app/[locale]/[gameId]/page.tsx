import { findGame, getAllGames } from "@/lib/catalogue";
import { resolveImageAbsolute } from "@/lib/imageUrl";
import ChartCasinoAndGameWrapper from "@/app/components/chart/ChartCasinoAndGameWrapper";
import getCasino from "@/lib/getCasino";
import getCasinoBonuses from "@/lib/getCasinoBonuses";
import getCasinoCards from "@/lib/getCasinoCards";
import getGameCards from "@/lib/getGameCards";
import getGamesList from "@/lib/getGamesList";
import getSingleGame from "@/lib/getSingleGame";
import { notFound } from "next/navigation";
import { Suspense, cache } from "react";
import JsonLd from "@/app/components/JsonLd";
import Link from "next/link";
import { toSlug } from "@/lib/slug";

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const games = await getAllGames();
    return games
      .filter(
        (g) =>
          g.gameId &&
          g.gameId !== "00000000-0000-0000-0000-000000000000"
      )
      .slice(0, 50)
      .map((g) => ({ gameId: g.gameId }));
  } catch {
    return [];
  }
}

const GAMEID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const NIL_UUID = "00000000-0000-0000-0000-000000000000";

// Wrapped in React cache() so generateMetadata and the page render share a
// single backend call within one request (axios is not auto-deduped by Next).
// The UUID guard short-circuits crawler junk (/en/wp-login, random slugs that
// fall through to this catch-all segment) before any API round-trip — they
// cost a regex, not a backend hit, which is what keeps CPU flat under crawl load.
const getGameOnce = cache(
  async (gameId: string | undefined): Promise<GameData | undefined> => {
    if (!gameId || gameId === NIL_UUID || !GAMEID_RE.test(gameId)) {
      return undefined;
    }
    try {
      return await getSingleGame(gameId);
    } catch {
      // The single-game call failed (backend blocked or down): fall back to
      // the shared catalogue so the page still renders. If that fails too the
      // error propagates — better than answering 404 for a game that exists.
      return await findGame(gameId);
    }
  }
);

// Neither function below may read searchParams: touching them makes Next
// render the page on every request and ignore `revalidate`, which is what
// made game pages the largest CPU and request cost on Vercel. The casino
// comes from the game itself (links only ever pass the game's own casinoId),
// and the active tab is read on the client.
export async function generateMetadata({
  params: { gameId },
}: {
  params: { gameId: string; locale: "en" | "es" | "pt" };
}) {
  const mainGame = await getGameOnce(gameId);

  if (!mainGame) {
    notFound();
  }

  const title = `${mainGame.name} - ${mainGame.casinoName}`;
    const description = `Get insights on ${mainGame.name} at ${mainGame.casinoName}. Check current RTP, max win: ${mainGame.maxX}. Track your gameplay with detailed stats on Slotstat.`;
    const ogImage =
      resolveImageAbsolute(mainGame.imageUrl) || "https://slotstat.net/opengraph-image.png";

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
        canonical: `/en/${gameId}`,
      },
    };
}

export default async function gamePage({
  params: { gameId, locale },
}: {
  params: { gameId: string; locale: "en" | "es" | "pt" };
}) {
  const mainGame = await getGameOnce(gameId);
  if (!mainGame) {
    notFound();
  }
  const casId = mainGame.casinoId ?? "";

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
          ...(resolveImageAbsolute(mainGame.imageUrl) && {
            image: resolveImageAbsolute(mainGame.imageUrl),
          }),
          description: `${mainGame.name} at ${mainGame.casinoName}. Live RTP tracking, max win: ${mainGame.maxX}.`,
        }}
      />
      {/* The wrapper reads the query string (tab, compare game) on the client;
          the Suspense boundary keeps the rest of the page in the static HTML. */}
      <Suspense fallback={<div className="h-80" />}>
        <ChartCasinoAndGameWrapper
          casId={casId}
          casinoCardsData={casinoCardsData}
          casinoBonuses={casinoBonuses}
          casinoCards={casinoCards}
          gameCards={gameCards}
          gameId={gameId}
          mainGameObj={mainGame}
          gamesCardsData={gamesCardsData}
        />
      </Suspense>

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
              href={`/${locale}/providers/${toSlug(mainGame.provider)}`}
              className="text-xs text-blue1 hover:underline"
            >
              Browse all {mainGame.provider} slots →
            </Link>
          )}
          {mainGame.casinoName && (
            <Link
              href={`/${locale}/casinos/${toSlug(mainGame.casinoName)}`}
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
