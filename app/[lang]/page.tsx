import { getCasinos, getLandingCards } from "@/lib";
import { Table, Slider, Stats } from "../components";
import { CASINO_COLS } from "../components/table/columns";
import { Metadata } from "next";

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
  const landingCardsData: Promise<Card[]> = getLandingCards();
  const [casinos, landingCards] = await Promise.all([
    casinosData,
    landingCardsData,
  ]);

  return (
    <>
      <Stats cardsData={landingCards} rows={1} />
      <Slider />
      <div className="my-6 px-4 lg:my-18 ">
        <Table
          orderBy={orderBy || ""}
          keyWord={keyWord || ""}
          columns={CASINO_COLS}
          tableBodyData={casinos}
          showFilter={true}
        />
      </div>
    </>
  );
}
