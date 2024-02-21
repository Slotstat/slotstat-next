import LiveCards from "../components/LiveCards";
import Table from "../components/table/Table";
import { getLandingCards } from "@/lib/getLanding";
import { notFound } from "next/navigation";
// import { openGraphImage } from "@/app/shared-metadata";
import getGamesList from "@/lib/getGamesList";
import IntroComponent from "../components/IntroComponent";
type Params = {
  params: {
    locale: string;
  };
  searchParams: QueryParams;
};

export async function generateMetadata({
  params: { locale },
  searchParams: { orderBy, keyWord, direction, isFiat },
}: Params) {
  try {
    const gamesList: gamesList = await getGamesList(locale, {
      orderBy,
      keyWord,
      direction,
      isFiat,
    });
    if (!gamesList)
      return {
        title: "Not found",
        description: "The page you are looking for doesn't exists",
      };

    return {
      title: "Slotstat",
      description:
        "Unique platform which gives you opportunity to choose where to play and win! ",
      openGraph: {
        // ...openGraphImage,
        images: "../opengraph-image.png",
        title: "Slotstat",
        description:
          "Slotstat, Unique platform which gives you opportunity to choose where to play and win by using statistics!",
      },
      alternates: {
        canonical: `/`,
        languages: {
          "en-US": `en/`,
          "ka-GE": `ka/`,
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

export default async function Home({
  searchParams: { orderBy, keyWord, direction, isFiat },
  params: { locale },
}: Params) {
  const gamesListData: Promise<gamesList> = getGamesList(locale, {
    keyWord,
    direction,
    orderBy,
    isFiat,
  });

  const landingCardsData: Promise<Card[]> = getLandingCards(locale);

  const [games, landingCards] = await Promise.all([
    gamesListData,
    landingCardsData,
  ]);

  if (!games && !landingCards) {
    notFound();
  }

  return (
    <>


      {/* <script
        type="text/javascript"
        src="https://betfury.bet/sources/d4c09e4f7.js"
        defer
        ></script> */}


      <LiveCards cardsData={landingCards} />
      <IntroComponent />
      <div className="my-6 lg:my-12 my">
        <Table
          keyWord={keyWord}
          orderBy={orderBy}
          direction={direction}
          showFilter={true}
          isFiat={isFiat || "false"}
          showCryptoFiatSwitcher={true}
          gamesList={games}
        />
      </div>
    </>
  );
}
