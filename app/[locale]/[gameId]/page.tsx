// import Breadcrumbs from "@/app/components/Breadcrumbs";
import LiveCards from "@/app/components/LiveCards";
import OtherGames from "@/app/components/OtherGames";
import ChartComponent from "@/app/components/chart/ChartComponent";
import ChartComponentHeader from "@/app/components/chart/ChartComponentHeader";
import Table from "@/app/components/table/Table";
import getCasinoCards from "@/lib/getCasinoCards";
import getGameCards from "@/lib/getGameCards";
import getGamesList from "@/lib/getGamesList";
import getSingleGame from "@/lib/getSingleGame";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params: { casinoId, gameId, locale },
  searchParams: { orderBy, keyWord, direction, isFiat },
}: {
  params: { casinoId: string; gameId: string; locale: string };
  searchParams: QueryParams;
}) {
  try {
    var mainGame: GameData | undefined;
    if (casinoId !== gameId) {
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
  params: { gameId, locale },
  searchParams: {
    orderBy,
    keyWord,
    direction,
    isFiat,
    compareGameId,
    isGame = "true",
  },
}: {
  params: { gameId: string; locale: string };
  searchParams: QueryParams;
}) {
  const gamesListData: Promise<gamesList> = getGamesList(locale, {
    keyWord,
    direction,
    orderBy,
    isFiat,
  });
  const mainGameData: Promise<GameData> = getSingleGame(gameId);

  const gamesCardsData: Promise<Card[]> = getGameCards(locale, gameId);

  let mainGameObj: GameData;

  var [mainGame, gamesList, gameCards] = await Promise.all([
    mainGameData,
    gamesListData,
    gamesCardsData,
  ]);
  mainGameObj = mainGame;

  let compareGame;

  if (compareGameId) {
    const compareGameData: Promise<GameData> = getSingleGame(compareGameId);
    compareGame = await compareGameData;
  }

  // if (mainGameObj?.casinoId && isGame === "true") {
  //   casinoCards = await casinoCardsData;
  // }

  if (!mainGameObj) {
    return notFound();
  }
  const casinoCardsData: Promise<Card[]> = getCasinoCards(
    locale,
    // @ts-ignore
    mainGameObj.casinoId
  );
  const casinoCards = await casinoCardsData;

  // const breadcrumbs = [
  //   {
  //     name: mainGameObj?.name,
  //   },
  // ];

  return (
    <>
      {/* <Breadcrumbs breadcrumbs={breadcrumbs} /> */}
      <ChartComponentHeader gameObj={mainGame} isGame={isGame} />
      {isGame === "true" ? (
        <>
          {mainGameObj && (
            <ChartComponent
              gameId={gameId}
              mainGame={mainGameObj}
              compareGame={compareGame}
              isFiat={isFiat || "false"}
              compareGameId={compareGameId}
            />
          )}
          <LiveCards
            cardsData={gameCards}
            rows={2}
            game={true}
            gamesCardsData={gamesCardsData}
          />
        </>
      ) : (
        <div className="mt-72">
          {!!casinoCards && mainGameObj?.casinoId && (
            <LiveCards
              cardsData={casinoCards}
              rows={2}
              casino={true}
              casinoId={mainGameObj.casinoId}
              casinoCardsData={casinoCardsData}
            />
          )}
        </div>
      )}
      {gamesList.results[0] && (
        <div className="my-6 lg:my-12 ">
          <OtherGames casinoName={gamesList.results[0].casinoName} />
          <div className="my-0 lg:my-6">
            <Table
              keyWord={keyWord}
              orderBy={orderBy}
              direction={direction}
              tableBodyData={gamesList.results}
              showFilter={true}
              isFiat={isFiat || "false"}
            />
          </div>
        </div>
      )}
    </>
  );
}
