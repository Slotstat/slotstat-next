import { Stats, Table, Chart } from "@/app/components";
import { CASINO_GAME_COLS } from "@/app/components/table/columns";
import { getDictionary } from "@/app/i18n/get-dictionary";
import { Locale } from "@/app/i18n/i18n-config";
import { STATS } from "@/app/utils/mockData";
import getGamesList from "@/lib/getGamesList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "slot stat",
  description: "slot stat high level",
};

export default async function Casino({
  params,
}: {
  params: { lang: Locale; casinoId: string; gameId: string };
}) {
  const { lang, casinoId, gameId } = params;

  const dictionary = await getDictionary(lang);
  const gamesListData: Promise<gamesList> = getGamesList(casinoId);

  const gamesList: gamesList = await gamesListData;

  return (
    <>
      <Stats data={STATS} rows={2} />
      <Chart
        dictionary={dictionary}
        gameId={gameId}
        tableBodyData={gamesList.results}
      />
      <div className="my-6 px-4 lg:my-18 lg:px-18">
        <h2 className="flex flex-1 items-center justify-between text-[24px] font-bold text-white">
          Other Adjarabet games
        </h2>
        <div className="my-4 lg:my-6">
          <Table
            columns={CASINO_GAME_COLS}
            tableBodyData={gamesList.results}
            showFilter={true}
          />
        </div>
      </div>
    </>
  );
}
