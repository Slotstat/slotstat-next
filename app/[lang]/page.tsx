import { getCasinos, getLandingCards } from "@/lib";
import { Table, Slider, Stats } from "../components";
import { CASINO_COLS } from "../components/table/columns";
import { SLIDES } from "../utils/mockData";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "slot111",
  description: "slot stat high level",
};

export default async function Home() {
  const casinosData: Promise<CasinoData[]> = getCasinos();
  const landingCardsData: Promise<Card[]> = getLandingCards();
  const [casinos, landingCards] = await Promise.all([
    casinosData,
    landingCardsData,
  ]);

  return (
    <>
      <Stats cardsData={landingCards} rows={1} />
      <Slider data={SLIDES} />
      <div className="my-6 px-4 lg:my-18 ">
        {casinos?.length > 0 ? (
          <Table
            columns={CASINO_COLS}
            tableBodyData={casinos}
            showFilter={true}
          />
        ) : (
          <div>casinos not found</div>
        )}
      </div>
    </>
  );
}
