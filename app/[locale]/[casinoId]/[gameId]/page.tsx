import LiveCards from "@/app/components/LiveCards";
import OtherGames from "@/app/components/OtherGames";
import ChartComponent from "@/app/components/chart/Chart";
import Table from "@/app/components/table/Table";
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
}: {
  params: { casinoId: string; gameId: string };
}) {
  const { casinoId, gameId } = params;
  const gamesListData: Promise<gamesList> = getGamesList(casinoId, {});
  const gamesCardsData: Promise<Card[]> = getGameCards(gameId);

  const [gamesList, gameCards] = await Promise.all([
    gamesListData,
    gamesCardsData,
  ]);

  const GameExists = gamesList?.results?.find((obj) => obj.gameId === gameId);
  if (!GameExists) return notFound();

  return (
    <>
      <LiveCards
        cardsData={gameCards}
        rows={2}
        game={true}
        casinoId={casinoId}
        gamesCardsData={gamesCardsData}
      />
      <ChartComponent gameId={gameId} gamesList={gamesList.results} />
      <div className="my-6 px-4 lg:my-18 ">
        <OtherGames casinoName={gamesList.results[0].casinoName} />
        <div className="my-4 lg:my-6">
          <Table
            tableBodyData={gamesList.results}
            showFilter={false}
            isGame={true}
          />
        </div>
      </div>
    </>
  );
}
