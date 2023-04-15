import getCasinos from "@/lib/getCasinos";
import { Table, Slider, Stats } from "../components";
import { CASINO_COLS } from "../components/table/columns";
import { SLIDES, STATS } from "../utils/mockData";
import getCasinoCards from "@/lib/getCasinoCards";
import { useRouter } from "next/router";

export default async function Home() {
  const casinos: Promise<CasinoData[]> = getCasinos();
  const casinosData = await casinos;

  // const casinoCardsData: Promise<casinoCard[]> = getCasinoCards(casinoId);
  // const casinoCard = await casinoCardsData;

  return (
    <>
      <Stats data={STATS} rows={1} />
      <Slider data={SLIDES} />
      <div className="my-6 px-4 lg:my-18 lg:px-18">
        {casinosData?.length > 0 ? (
          <Table
            columns={CASINO_COLS}
            tableBodyData={casinosData}
            showFilter={true}
          />
        ) : (
          <div>casinos not found</div>
        )}
      </div>
    </>
  );
}
