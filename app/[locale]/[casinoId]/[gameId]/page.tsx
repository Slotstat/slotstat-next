import LiveCards from "@/app/components/LiveCards";
import OtherGames from "@/app/components/OtherGames";
import ChartComponent from "@/app/components/chart/ChartComponent";
import Table from "@/app/components/table/Table";
import getCasinoCards from "@/lib/getCasinoCards";
import getGameCards from "@/lib/getGameCards";
import getGamesList from "@/lib/getGamesList";
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
  const AllGamesListData: Promise<gamesList> = getGamesList(casinoId, {});

  const gamesCardsData: Promise<Card[]> =
    casinoId === gameId ? getCasinoCards(casinoId) : getGameCards(gameId);

  const [AllGamesList, gamesList, gameCards] = await Promise.all([
    AllGamesListData,
    gamesListData,
    gamesCardsData,
  ]);

  const mainGame: GameData | undefined = AllGamesList?.results?.find((x) => {
    if (casinoId === gameId) {
      return x.casinoId === gameId;
    } else {
      return x.gameId === gameId;
    }
  });

  if (casinoId === gameId && gamesList) {
    gamesList.results.shift();
  } else {
    const removeIndex = gamesList.results
      .map((item) => item.gameId)
      .indexOf(gameId);
    ~removeIndex && gamesList.results.splice(removeIndex, 1);
  }

  // if (!mainGame) {
  //   notFound();
  // } else {
  return (
    <>
      <LiveCards
        cardsData={gameCards}
        rows={2}
        game={true}
        casinoId={casinoId}
        gamesCardsData={gamesCardsData}
      />
      {mainGame && (
        <ChartComponent
          gameId={gameId}
          mainGame={mainGame}
          isAllGames={casinoId === gameId}
        />
      )}
      {gamesList.results[0] && (
        <div className="my-6 px-4 lg:my-18 ">
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
