import { Stats, Table } from "@/app/components";
import { CASINO_GAME_COLS } from "@/app/components/table/columns";
import { getCasino, getCasinoCards, getGamesList } from "@/lib";
import { notFound } from "next/navigation";

type Params = {
  params: {
    casinoId: string;
  };
};

const Casino = async ({ params: { casinoId } }: Params) => {
  // const casinoData: Promise<CasinoData> = getCasino(casinoId);
  const gamesListData: Promise<gamesList> = getGamesList(casinoId);
  const casinoCardsData: Promise<Card[]> = getCasinoCards(casinoId);

  const [
    // casino,
    gamesList,
    casinoCard,
  ] = await Promise.all([
    // casinoData,
    gamesListData,
    casinoCardsData,
  ]);

  if (!gamesList.results) return notFound();

  return (
    <>
      <Stats cardsData={casinoCard} rows={2} />
      <div className="my-18 px-4 lg:my-18 lg:px-18">
        {/* <h2 className="flex flex-1 items-center justify-between text-[24px] font-bold text-white">
          {casino.name}
        </h2> */}
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
};

export default Casino;
