import { getCasinos, getLandingCards } from "@/lib";
import { useTableTexts } from "../components/table/columns";
import { Metadata } from "next";
import { Locale } from "@/app/i18n/i18n-config";
import LiveCards from "../components/Cards";
import Slider from "../components/Slider";
import Table from "../components/table/Table";

export const metadata: Metadata = {
  title: "SlotStat",
  description: "slot stat high level",
};

export default async function Home({
  searchParams: { orderBy, keyWord, direction },
  params,
}: {
  searchParams: QueryParams;
  params: { lang: Locale };
}) {
  const { getCasinoAndGameTableTexts } = useTableTexts();
  const casinosData: Promise<CasinoData[]> = getCasinos({
    orderBy,
    keyWord,
    direction,
  });
  const { lang } = params;

  const landingCardsData: Promise<Card[]> = getLandingCards();
  const [casinos, landingCards, casinoColumnHeaders] = await Promise.all([
    casinosData,
    landingCardsData,
    getCasinoAndGameTableTexts(lang, false),
  ]);

  return (
    <>
      <LiveCards cardsData={landingCards} />

      <Slider />
      <div className="my-6 px-4 lg:my-18 ">
        <Table
          orderBy={orderBy || ""}
          keyWord={keyWord || ""}
          columns={casinoColumnHeaders}
          tableBodyData={casinos}
          showFilter={true}
        />
      </div>
    </>
  );
}
