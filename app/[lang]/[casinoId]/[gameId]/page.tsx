import { Stats, Table, Chart } from "@/app/components";
import { CASINO_GAME_COLS } from "@/app/components/table/columns";
import { getDictionary } from "@/app/i18n/get-dictionary";
import { Locale } from "@/app/i18n/i18n-config";
import { getCasino, getCasinoCards, getGamesList } from "@/lib";
import { Metadata } from "next";

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
  const gamesListData: Promise<gamesList> = getGamesList(casinoId);
  const gamesCardsData: Promise<Card[]> = getCasinoCards(casinoId);

  // const casinoData: Promise<CasinoData> = getCasino(casinoId);

  const [
    dictionary,
    gamesList,
    gameCards,
    // casino
  ] = await Promise.all([
    getDictionary(lang),
    gamesListData,
    gamesCardsData,
    // casinoData,
  ]);

  return (
    <>
      <Stats cardsData={gameCards} rows={2} />
      <Chart
        dictionary={dictionary}
        gameId={gameId}
        gamesList={gamesList.results}
        // casino={casino}
      />
      <div className="my-6 px-4 lg:my-18 ">
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
