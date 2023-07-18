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
  searchParams: { orderBy, keyWord, direction, type },
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

  const gamesCardsData: Promise<Card[]> =
    type === "AllGames" ? getCasinoCards(casinoId) : getGameCards(gameId);

  const [gamesList, gameCards] = await Promise.all([
    gamesListData,
    gamesCardsData,
  ]);

  const mainGame: GameData | undefined = gamesList?.results?.find((x) => {
    if (type === "AllGames") {
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

  // const GameExists = gamesList?.results?.find((obj) => obj.gameId === gameId);
  // if (!GameExists) return notFound();

  return (
    <>
      <LiveCards
        cardsData={gameCards}
        rows={2}
        game={true}
        casinoId={casinoId}
        gamesCardsData={gamesCardsData}
        // casinoCardsData={casinoCardsData}
      />
      {mainGame && (
        <ChartComponent gameId={gameId} mainGame={mainGame} type={type} />
      )}
      {gamesList && (
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
}
