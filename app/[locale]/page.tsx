import { Metadata } from "next";
import LiveCards from "../components/LiveCards";
import Slider from "../components/Slider";
import Table from "../components/table/Table";
import { getLandingCards, getLandingOffers } from "@/lib/getLanding";
import getCasinos from "@/lib/getCasinos";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "SlotStat",
  description: "slot stat high level",
};

export default async function Home({
  searchParams: { orderBy, keyWord, direction },
}: {
  searchParams: QueryParams;
}) {
  const casinosData: Promise<CasinoData[]> = getCasinos({
    orderBy,
    keyWord,
    direction,
  });
  const landingOffersData: Promise<Offer[]> = getLandingOffers();

  const landingCardsData: Promise<Card[]> = getLandingCards();
  const [casinos, landingCards] = await Promise.all([
    casinosData,
    landingCardsData,
  ]);
  if (!casinos && !landingCards) {
    notFound();
  }
  return (
    <>
      <LiveCards cardsData={landingCards} />
      <Slider landingOffersData={landingOffersData}/>
      <div className="my-6 px-4 lg:my-18 ">
        <Table
          orderBy={orderBy || ""}
          keyWord={keyWord || ""}
          direction={direction}
          tableBodyData={casinos}
          showFilter={true}
          isGame={false}
        />
      </div>
    </>
  );
}
