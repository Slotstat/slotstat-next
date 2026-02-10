import LiveCards from "../components/LiveCards";
import { getLandingCards } from "@/lib/getLanding";
import { notFound } from "next/navigation";
// import { openGraphImage } from "@/app/shared-metadata";
import IntroComponent from "../components/IntroComponent";
import TableClientSide from "../components/table/TableClientSide";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

type Params = {
  params: {
    locale: "en" | "ka";
  };
  searchParams: QueryParams;
};

export async function generateMetadata({ params: { locale } }: Params) {
  const t = await getTranslations({ locale, namespace: "Home" });

  return {
    title: t("HomeSeoTitle"),
    description: t("HomeSeoDesc"),
  };
}

export default async function Home({ params: { locale } }: Params) {
  unstable_setRequestLocale(locale);
  const landingCardsData: Promise<Card[]> = getLandingCards(locale);
  const [landingCards] = await Promise.all([landingCardsData]);

  if (!landingCards) {
    notFound();
  }
  return (
    <>
      {landingCards && <LiveCards cardsData={landingCards} />}
      <IntroComponent />
      <div className="my-3 md:my-6 lg:my-12 -mr-4 lg:mr-0">
        <TableClientSide showFilter={true} />
      </div>
      {/* <div className="min-h-screen flex items-center justify-center">
      <div className="text-center p-8 max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-4">
          Technical Update in Progress
        </h1>
        <div className="animate-pulse mb-6">
          <div className="h-2 w-24 bg-blue-500 mx-auto rounded"></div>
        </div>
        <p className="text-xl text-gray-400 mb-4">
          We're currently improving our services to serve you better.
        </p>
        <p className="text-gray-500">
          We'll be back online shortly. Thank you for your patience!
        </p>
      </div>
    </div> */}
    </>
  );
}
