import Breadcrumbs from "@/app/components/Breadcrumbs";
import LiveCards from "@/app/components/LiveCards";
import Table from "@/app/components/table/Table";
import getCasinoCards from "@/lib/getCasinoCards";

import getGamesList from "@/lib/getGamesList";
import { notFound } from "next/navigation";

type Params = {
  params: {
    casinoId: string;
    locale: string;
  };

  searchParams: QueryParams;
};

export async function generateMetadata({
  params: { casinoId, locale },
  searchParams: { orderBy, keyWord, direction },
}: Params) {
  try {
    const gamesList: gamesList = await getGamesList(locale, casinoId, {
      orderBy,
      keyWord,
      direction,
    });
    if (!gamesList)
      return {
        title: "Not found",
        description: "The page you are looking for doesn't exists",
      };

    return {
      title: gamesList.results[0].casinoName,
      description: gamesList.results[0].casinoName,
      alternates: {
        canonical: `/${casinoId}`,
        languages: {
          'en-US': `en/${casinoId}`,
          'ka-GE': `ka/${casinoId}`,
        },
      },
    };
  } catch (error) {
    return {
      title: "Not found",
      description: "The page you are looking for doesn't exists",
    };
  }
}

const Casino = async ({
  params: { casinoId, locale },
  searchParams: { orderBy, keyWord, direction, isFiat },
}: Params) => {
  const gamesListData: Promise<gamesList> = getGamesList(locale, casinoId, {
    keyWord,
    direction,
    orderBy,
  });

  const casinoCardsData: Promise<Card[]> = getCasinoCards(locale, casinoId);

  const [gamesList, casinoCards] = await Promise.all([
    gamesListData,
    casinoCardsData,
  ]);
  if (!gamesList.results) return notFound();

  const gameListWithCasinoOnTop = gamesList.results;

  const breadcrumbs = [
    {
      name: gameListWithCasinoOnTop[0]?.casinoName,
      // url: `/${casinoId}`
    },
  ];

  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />

      {!!casinoCards && (
        <LiveCards
          cardsData={casinoCards}
          rows={2}
          casino={true}
          casinoId={casinoId}
          casinoCardsData={casinoCardsData}
        />
      )}
      <div className="md:my-18 my-10 lg:my-18 ">
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
            isFiat={isFiat || "false"}
          />
        </div>
      </div>
    </>
  );
};

export default Casino;
