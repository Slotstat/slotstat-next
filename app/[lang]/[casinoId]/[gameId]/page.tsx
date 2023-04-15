import { Stats, Table, Chart } from "@/app/components";
import { CASINO_GAME_COLS } from "@/app/components/table/columns";
import { getDictionary } from "@/app/i18n/get-dictionary";
import { Locale } from "@/app/i18n/i18n-config";
import { CASINO_GAME_DATA, STATS } from "@/app/utils/mockData";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "slot stat",
  description: "slot stat high level",
};

export default async function Casino({ params }: { params: { lang: Locale } }) {
  const dictionary = await getDictionary(params.lang);
  return (
    <>
      <Stats data={STATS} rows={2} />
      {/* <Chart dictionary={dictionary} /> */}
      <div className="my-6 px-4 lg:my-18 lg:px-18">
        <h2 className="flex flex-1 items-center justify-between text-[24px] font-bold text-white">
          Other Adjarabet games
        </h2>
        <div className="my-4 lg:my-6">
          {/* <Table
            linkPath="/adjarabet/netent"
            columns={CASINO_GAME_COLS}
            mockData={CASINO_GAME_DATA}
            showFilter
          /> */}
        </div>
      </div>
    </>
  );
}
