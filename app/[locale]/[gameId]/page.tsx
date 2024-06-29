import ChartCasinoAndGameWrapper from "@/app/components/chart/ChartCasinoAndGameWrapper";
import getCasino from "@/lib/getCasino";
import getCasinoBonuses from "@/lib/getCasinoBonuses";
import getCasinoCards from "@/lib/getCasinoCards";
import getGameCards from "@/lib/getGameCards";
import getGamesList from "@/lib/getGamesList";
import getSingleGame from "@/lib/getSingleGame";
import { notFound } from "next/navigation";

// export async function generateMetadata({
//   params: { gameId, locale },
//   searchParams: { orderBy, keyWord, direction, isFiat, casId },
// }: {
//   params: { casinoId: string; gameId: string; locale: "en" | "ka" };
//   searchParams: QueryParamsGamePage;
// }) {
//   try {
//     var mainGame: GameData | undefined;
//     if (gameId) {
//       mainGame = await getSingleGame(gameId);
//     }

//     if (!mainGame)
//       return {
//         title: "Not found",
//         description: "The page you are looking for doesn't exists",
//       };

//     return {
//       title: mainGame.casinoName + " | " + mainGame.name,
//       description: mainGame.provider,
//       alternates: {
//         canonical: `/${locale}/${gameId}?casId=${casId}`,
//         languages: {
//           "en-US": `en/${gameId}?casId=${casId}`,
//           "ka-GE": `ka/${gameId}?casId=${casId}`,
//         },
//       },
//     };
//   } catch (error) {
//     return {
//       title: "Not found",
//       description: "The page you are looking for doesn't exists",
//     };
//   }
// }

const wait = () => {
  return new Promise((resolve, reject) => setTimeout(resolve, 3000));
};

export default async function gamePage({
  params: { gameId, locale },
  searchParams: {
    orderBy,
    keyWord,
    direction,
    isFiat,
    compareGameId,
    ActiveTab = "slot",
    casId,
  },
}: {
  params: { gameId: string; locale: "en" | "ka" };
  searchParams: QueryParamsGamePage;
}) {
 

  // const compareGame = [];

  const mainGameData: Promise<GameData> = getSingleGame(gameId);
  const gamesCardsData: Promise<Card[]> = getGameCards(locale, gameId);

  const casinoData: Promise<CasinoData> = getCasino(casId);
  const casinoCardsData: Promise<Card[]> = getCasinoCards(locale, casId);
  const casinoBonusData: Promise<Card[]> = getCasinoBonuses(locale, casId);

  // const [mainGame, gameCards] = await Promise.all([
  //   mainGameData,
  //   gamesCardsData,
  // ]);
  const mainGame = await mainGameData;
  const gameCards = await gamesCardsData;

  const casino = await casinoData;
  const casinoCards = await casinoCardsData;
  const casinoBonuses = await casinoBonusData;
  
  await wait();

  // if (compareGameId) {
  //   const compareGameData: Promise<GameData> = getSingleGame(compareGameId);
  //   compareGame = await compareGameData;
  // }

  // if (!mainGame) {
  //   return notFound();
  // }



  // const [casino, casinoCards, casinoBonuses] = await Promise.all([
  //   casinoData,
  //   casinoCardsData,
  //   casinoBonusData,
  // ]);



  // const breadcrumbs = [
  //   {
  //     name: mainGameObj?.name,
  //   },
  // ];

  return (
    <div className="min-h-screen  ">
      28
      <ChartCasinoAndGameWrapper
        casId={casId}
        casino={casino}
        casinoCardsData={casinoCardsData}
        casinoBonuses={casinoBonuses}
        // compareGame={compareGame}
        compareGameId={compareGameId}
        orderBy={orderBy}
        keyWord={keyWord}
        direction={direction}
        isFiat={isFiat}
        ActiveTab={ActiveTab}
        casinoCards={casinoCards}
        gameCards={gameCards}
        gameId={gameId}
        mainGameObj={mainGame}
        gamesCardsData={gamesCardsData}
      />
    </div>
  );
}
