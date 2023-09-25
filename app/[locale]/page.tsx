import LiveCards from "../components/LiveCards";
import Slider from "../components/Slider";
import Table from "../components/table/Table";
import { getLandingCards, getLandingOffers } from "@/lib/getLanding";
import getCasinos from "@/lib/getCasinos";
import { notFound } from "next/navigation";
import { openGraphImage } from "@/app/shared-metadata";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Slotstat",
  description:
    "Unique platform which gives you opportunity to choose where to play and win! ",
  openGraph: {
    ...openGraphImage,
    title: "Slotstat",
    description:
      "Slotstat, Unique platform which gives you opportunity to choose where to play and win by using statistics!",
  },
};

export default async function Home({
  searchParams: { orderBy, keyWord, direction, isFiat },
  params: { locale },
}: {
  searchParams: QueryParams;
  params: { locale: string };
}) {
  const casinosData: Promise<CasinoData[]> = getCasinos(locale, {
    orderBy,
    keyWord,
    direction,
    isFiat,
  });

  const landingOffersData: Promise<Offer[]> = getLandingOffers(locale);

  const landingCardsData: Promise<Card[]> = getLandingCards(locale);

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
      <Slider landingOffersData={landingOffersData} />
      <div className="my-6 lg:my-18">
        <Table
          orderBy={orderBy || ""}
          keyWord={keyWord || ""}
          direction={direction}
          isFiat={isFiat || "false"}
          tableBodyData={casinos}
          showFilter={true}
          isGame={false}
          showCryptoFiatSwitcher={true}
        />
      </div>
    </>
  );
}
