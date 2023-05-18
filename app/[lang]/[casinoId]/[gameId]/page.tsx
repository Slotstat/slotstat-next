import useStore from "@/app/(store)/store";
import { Stats, Table, Chart } from "@/app/components";
import { CASINO_GAME_COLS } from "@/app/components/table/columns";
import { getDictionary } from "@/app/i18n/get-dictionary";
import { Locale } from "@/app/i18n/i18n-config";
import { getGamesList } from "@/lib";
import getGameCards from "@/lib/getGameCards";
import { Metadata } from "next";
import { notFound } from "next/navigation";
// import useSignalR from "@/app/utils/singlar";

export const metadata: Metadata = {
  title: "slot-stat statistic",
  description: "statistic chart for comparing two different games!",
};

export default async function Casino({
  params,
}: {
  params: { lang: Locale; casinoId: string; gameId: string };
}) {
  const { lang, casinoId, gameId } = params;
  const gamesListData: Promise<gamesList> = getGamesList(casinoId, {});
  const gamesCardsData: Promise<Card[]> = getGameCards(gameId);

  const [dictionary, gamesList, gameCards] = await Promise.all([
    getDictionary(lang),
    gamesListData,
    gamesCardsData,
  ]);

  const GameExists = gamesList.results.find((obj) => obj.gameId === gameId);
  if (!GameExists) return notFound();

  return (
    <>
      <Stats cardsData={gameCards} rows={2} game={true} />
      <Chart
        dictionary={dictionary}
        gameId={gameId}
        gamesList={gamesList.results}
      />
      <div className="my-6 px-4 lg:my-18 ">
        <h2 className="flex flex-1 items-center justify-between text-[24px] font-bold text-white">
          Other {gamesList.results[0].casinoName} games
        </h2>
        <div className="my-4 lg:my-6">
          <Table
            columns={CASINO_GAME_COLS}
            tableBodyData={gamesList.results}
            showFilter={false}
          />
        </div>
      </div>
    </>
  );
}
