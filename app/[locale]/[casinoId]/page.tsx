import LiveCards from "@/app/components/LiveCards";
import Table from "@/app/components/table/Table";
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

  const [gamesList, casinoCard] = await Promise.all([
    gamesListData,
    casinoCardsData,
  ]);

  if (!gamesList.results) return notFound();
  const gameListWithCasinoOnTop = gamesList.results;

  return (
    <>
      <LiveCards
        cardsData={casinoCard}
        rows={2}
        casino={true}
        casinoId={casinoId}
      />
      <div className="my-18 px-4 lg:my-18 ">
        <h2 className="flex flex-1 items-center justify-between text-[24px] font-bold text-white">
          {gamesList.results[0]?.casinoName}
        </h2>
        <div className="my-4 lg:my-6">
          <Table
            keyWord={keyWord}
            orderBy={orderBy}
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
