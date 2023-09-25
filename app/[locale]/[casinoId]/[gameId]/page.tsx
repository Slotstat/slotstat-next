import Breadcrumbs from "@/app/components/Breadcrumbs";
import LiveCards from "@/app/components/LiveCards";
import OtherGames from "@/app/components/OtherGames";
import ChartComponent from "@/app/components/chart/ChartComponent";
import Table from "@/app/components/table/Table";
import getCasino from "@/lib/getCasino";
import getCasinoCards from "@/lib/getCasinoCards";
import getGameCards from "@/lib/getGameCards";
import getGamesList from "@/lib/getGamesList";
import getSingleGame from "@/lib/getSingleGame";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params: { casinoId, gameId, locale },
  searchParams: { orderBy, keyWord, direction, isFiat, compareGameId },
}: {
  params: { casinoId: string; gameId: string; locale: string };
  searchParams: QueryParams;
}) {
  try {
    var mainGame: GameData | undefined;
    if (casinoId !== gameId) {
      mainGame = await getSingleGame(gameId);
    } else {
      const gamesListData: gamesList = await getGamesList(locale, casinoId, {
        keyWord,
        direction,
        orderBy,
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
        canonical: `/${casinoId}/${gameId}`,
        languages: {
          "en-US": `en/${casinoId}/${gameId}`,
          "ka-GE": `ka/${casinoId}/${gameId}`,
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

export default async function Casino({
  params: { casinoId, gameId, locale },
  searchParams: { orderBy, keyWord, direction, isFiat, compareGameId },
}: {
  params: { casinoId: string; gameId: string; locale: string };
  searchParams: QueryParams;
}) {
  const gamesListData: Promise<gamesList> = getGamesList(locale, casinoId, {
    keyWord,
    direction,
    orderBy,
  });
  const mainGameData: Promise<GameData> = getSingleGame(gameId);
  // const casinoStatisticsData: Promise<GameData> = getCasino(casinoId);

  const gamesCardsData: Promise<Card[]> =
    casinoId === gameId
      ? getCasinoCards(locale, casinoId)
      : getGameCards(locale, gameId);

  let mainGameObj: GameData;
  if (casinoId !== gameId) {
    var [mainGame, gamesList, gameCards] = await Promise.all([
      mainGameData,
      gamesListData,
      gamesCardsData,
    ]);
    mainGameObj = mainGame;
  } else {
    var [gamesList, gameCards] = await Promise.all([
      gamesListData,
      gamesCardsData,
    ]);
    mainGameObj = gamesList.results[0];
  }

  let compareGame;
  // using if statement "casinoId !== gameId" for avoiding all games crush
  if (compareGameId && casinoId !== gameId) {
    const compareGameData: Promise<GameData> = getSingleGame(compareGameId);
    compareGame = await compareGameData;
  }

  if (casinoId === gameId && gamesList) {
    gamesList.results.shift();
  } else {
    const removeIndex = gamesList.results
      .map((item) => item.gameId)
      .indexOf(gameId);
    ~removeIndex && gamesList.results.splice(removeIndex, 1);
  }

  if (!mainGameObj) {
    return notFound();
  }

  const breadcrumbs = [
    {
      name: mainGameObj.casinoName,
      url: `/${casinoId}?isFiat=${isFiat || "false"}`,
    },
    {
      name: mainGameObj.name,
    },
  ];

  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />

      <LiveCards
        cardsData={gameCards}
        rows={2}
        game={true}
        casinoId={casinoId}
        gamesCardsData={gamesCardsData}
      />
      {mainGameObj && (
        <ChartComponent
          gameId={gameId}
          mainGame={mainGameObj}
          compareGame={compareGame}
          isAllGames={casinoId === gameId}
          isFiat={isFiat || "false"}
          compareGameId={compareGameId}
        />
      )}
      {gamesList.results[0] && (
        <div className="my-6 lg:my-18 ">
          <OtherGames casinoName={gamesList.results[0].casinoName} />
          <div className="my-4 lg:my-6">
            <Table
              keyWord={keyWord}
              orderBy={orderBy}
              direction={direction}
              tableBodyData={gamesList.results}
              showFilter={true}
              isGame={true}
              isFiat={isFiat || "false"}
            />
          </div>
        </div>
      )}
    </>
  );
  // }
}
