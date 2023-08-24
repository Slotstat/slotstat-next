import Breadcrumbs from "@/app/components/Breadcrumbs";
import LiveCards from "@/app/components/LiveCards";
import OtherGames from "@/app/components/OtherGames";
import ChartComponent from "@/app/components/chart/ChartComponent";
import Table from "@/app/components/table/Table";
import getCasinoCards from "@/lib/getCasinoCards";
import getGameCards from "@/lib/getGameCards";
import getGamesList from "@/lib/getGamesList";
import getSingleGame from "@/lib/getSingleGame";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "slot-stat statistic",
  description: "statistic chart for comparing two different games!",
};

export default async function Casino({
  params,
  searchParams: { orderBy, keyWord, direction },
}: {
  params: { casinoId: string; gameId: string };
  searchParams: QueryParams;
}) {
  const { casinoId, gameId } = params;
  const gamesListData: Promise<gamesList> = getGamesList(casinoId, {
    keyWord,
    direction,
    orderBy,
  });
  const mainGameData: Promise<GameData> = getSingleGame(gameId);

  const gamesCardsData: Promise<Card[]> =
    casinoId === gameId ? getCasinoCards(casinoId) : getGameCards(gameId);

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
      url: `/${casinoId}`,
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
          isAllGames={casinoId === gameId}
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
            />
          </div>
        </div>
      )}
    </>
  );
  // }
}
