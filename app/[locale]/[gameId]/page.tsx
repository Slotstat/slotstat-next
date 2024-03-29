import ChartCasinoAndGameWrapper from "@/app/components/chart/ChartCasinoAndGameWrapper";

import getCasino from "@/lib/getCasino";
import getCasinoBonuses from "@/lib/getCasinoBonuses";
import getCasinoCards from "@/lib/getCasinoCards";
import getGameCards from "@/lib/getGameCards";
import getGamesList from "@/lib/getGamesList";
import getSingleGame from "@/lib/getSingleGame";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params: { gameId, locale },
  searchParams: { orderBy, keyWord, direction, isFiat, casId },
}: {
  params: { casinoId: string; gameId: string; locale: string };
  searchParams: QueryParamsGamePage;
}) {
  try {
    var mainGame: GameData | undefined;
    if (casId !== gameId) {
      mainGame = await getSingleGame(gameId);
    } else {
      const gamesListData: gamesList = await getGamesList(locale, {
        keyWord,
        direction,
        orderBy,
        isFiat,
      });
      mainGame = gamesListData.results[0];
    }

    if (!mainGame)
      return {
        title: "Not found",
        description: "The page you are looking for doesn't exists",
      };

    return {
      title: mainGame.casinoName + " | " + mainGame.name,
      description: mainGame.provider,
      alternates: {
        canonical: `/${casId}/${gameId}`,
        languages: {
          "en-US": `en/${casId}/${gameId}`,
          "ka-GE": `ka/${casId}/${gameId}`,
        },
      },
    };
  } catch (error) {
    return {
      title: "Not found",
      description: "The page you are looking for doesn't exists",
    };
  }
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
  params: { gameId: string; locale: string };
  searchParams: QueryParamsGamePage;
}) {
  // const gamesListData: Promise<gamesList> = getGamesList(locale, {
  //   keyWord,
  //   direction,
  //   orderBy,
  //   isFiat,
  // });
  let mainGameObj: GameData | null = null;
  let compareGame;

  const mainGameData: Promise<GameData> = getSingleGame(gameId);

  const gamesCardsData: Promise<Card[]> = getGameCards(locale, gameId);

  var [
    mainGame,
    gameCards,
    // gamesList
  ] = await Promise.all([
    mainGameData,
    gamesCardsData,
    // gamesListData,
  ]);
  mainGameObj = mainGame;

  if (compareGameId) {
    const compareGameData: Promise<GameData> = getSingleGame(compareGameId);
    compareGame = await compareGameData;
  }

  if (!mainGameObj) {
    return notFound();
  }

  const casinoData: Promise<CasinoData> = getCasino(casId);
  const casinoCardsData: Promise<Card[]> = getCasinoCards(locale, casId);
  const casinoBonusData: Promise<Card[]> = getCasinoBonuses(locale, casId);

  const casino = await casinoData;
  const casinoCards = await casinoCardsData;
  const casinoBonuses = await casinoBonusData;

  // const breadcrumbs = [
  //   {
  //     name: mainGameObj?.name,
  //   },
  // ];

  return (
    <ChartCasinoAndGameWrapper
      orderBy={orderBy}
      keyWord={keyWord}
      direction={direction}
      isFiat={isFiat}
      ActiveTab={ActiveTab}
      casinoCards={casinoCards}
      casino={casino}
      gameCards={gameCards}
      gameId={gameId}
      mainGameObj={mainGameObj}
      compareGame={compareGame}
      compareGameId={compareGameId}
      gamesCardsData={gamesCardsData}
      casId={casId}
      casinoCardsData={casinoCardsData}
      casinoBonuses={casinoBonuses}
    />
  );
}
