import LiveCards from "@/app/components/LiveCards";
import Table from "@/app/components/table/Table";
import getCasino from "@/lib/getCasino";
import getCasinoCards from "@/lib/getCasinoCards";

import getGamesList from "@/lib/getGamesList";
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
  // const casinoData: Promise<CasinoData> = getCasino(casinoId);

  const [
    gamesList,
    casinoCard,
    //  casino
  ] = await Promise.all([
    gamesListData,
    casinoCardsData,
    // casinoData,
  ]);
  if (!gamesList.results) return notFound();
  const gameListWithCasinoOnTop = gamesList.results;
  // casino.name = "all games";
  // casino.isForAllGames = true;

  // gameListWithCasinoOnTop.unshift(casino);

  return (
    <>
      {!!casinoCard && (
        <LiveCards
          cardsData={casinoCard}
          rows={2}
          casino={true}
          casinoId={casinoId}
          casinoCardsData={casinoCardsData}
        />
      )}
      <div className="my-18 px-4 lg:my-18 ">
        <h2 className="flex flex-1 items-center justify-between text-[24px] font-bold text-white">
          {gamesList.results[0]?.casinoName}
        </h2>
        <div className="my-4 lg:my-6">
          <Table
            keyWord={keyWord}
            orderBy={orderBy}
            direction={direction}
            tableBodyData={gameListWithCasinoOnTop}
            showFilter={true}
            isGame={true}
          />
        </div>
      </div>
    </>
  );
};

export default Casino;
