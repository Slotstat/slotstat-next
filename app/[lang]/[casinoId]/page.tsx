import LiveCards from "@/app/components/Cards";
import Table from "@/app/components/table/Table";
import { useTableTexts } from "@/app/components/table/columns";
import { Locale } from "@/app/i18n/i18n-config";
import getCasinoCards from "@/lib/getCasinoCards";

import getGamesList from "@/lib/getGamesList";
import { notFound } from "next/navigation";

type Params = {
  params: {
    casinoId: string;
    lang: Locale;
  };
  searchParams: QueryParams;
};

const Casino = async ({
  params: { casinoId, lang },
  searchParams: { orderBy, keyWord, direction },
}: Params) => {
  const { getCasinoAndGameTableTexts } = useTableTexts();

  const gamesListData: Promise<gamesList> = getGamesList(casinoId, {
    keyWord,
    direction,
    orderBy,
  });
  const casinoCardsData: Promise<Card[]> = getCasinoCards(casinoId);

  const [gamesList, casinoCard, gameColumnHeaders] = await Promise.all([
    gamesListData,
    casinoCardsData,
    getCasinoAndGameTableTexts(lang, true),
  ]);

  if (!gamesList.results) return notFound();
  const gameListWithCasinoOnTop = gamesList.results;

  return (
    <>
      {/* <LiveCards cardsData={casinoCard} rows={2} casino={true} /> */}
      <div className="my-18 px-4 lg:my-18 ">
        <h2 className="flex flex-1 items-center justify-between text-[24px] font-bold text-white">
          {gamesList.results[0]?.casinoName}
        </h2>
        <div className="my-4 lg:my-6">
          <Table
            keyWord={keyWord}
            orderBy={orderBy}
            columns={gameColumnHeaders}
            tableBodyData={gameListWithCasinoOnTop}
            showFilter={true}
          />
        </div>
      </div>
    </>
  );
};

export default Casino;
