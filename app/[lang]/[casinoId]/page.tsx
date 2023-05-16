import { Stats, Table } from "@/app/components";
import { CASINO_GAME_COLS } from "@/app/components/table/columns";
import { getCasino, getCasinoCards, getGamesList } from "@/lib";
import { notFound } from "next/navigation";

type Params = {
  params: {
    casinoId: string;
  };
  searchParams: QueryParams;
};

const Casino = async ({
  params: { casinoId },
  searchParams: { orderBy, keyWord, direction },
}: Params) => {
  const gamesListData: Promise<gamesList> = getGamesList(casinoId, {
    keyWord,
    direction,
    orderBy,
  });
  const casinoCardsData: Promise<Card[]> = getCasinoCards(casinoId);
  const casinoData: Promise<CasinoData> = getCasino(casinoId);

  const [
    gamesList,
    casinoCard,
    // casino
  ] = await Promise.all([
    gamesListData,
    casinoCardsData,
    // casinoData,
  ]);

  if (!gamesList.results) return notFound();
  const gameListWithCasinoOnTop = gamesList.results;
  // gameListWithCasinoOnTop.unshift(casino);
  // console.log("object", gameListWithCasinoOnTop);
  return (
    <>
      <Stats cardsData={casinoCard} rows={2} />
      <div className="my-18 px-4 lg:my-18 ">
        <h2 className="flex flex-1 items-center justify-between text-[24px] font-bold text-white">
          {gamesList.results[0]?.casinoName}
        </h2>
        <div className="my-4 lg:my-6">
          <Table
            keyWord={keyWord}
            orderBy={orderBy}
            columns={CASINO_GAME_COLS}
            tableBodyData={gameListWithCasinoOnTop}
            showFilter={true}
          />
        </div>
      </div>
    </>
  );
};

export default Casino;
