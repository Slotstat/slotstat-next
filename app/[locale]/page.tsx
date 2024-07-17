import LiveCards from "../components/LiveCards";
import { getLandingCards } from "@/lib/getLanding";
import { notFound } from "next/navigation";
// import { openGraphImage } from "@/app/shared-metadata";
import IntroComponent from "../components/IntroComponent";
import TableClientSide from "../components/table/TableClientSide";
type Params = {
  params: {
    locale: "en" | "ka";
  };
  searchParams: QueryParams;
};

export async function generateMetadata({ params: { locale } }: Params) {
  try {
    const landingCardsData: Promise<Card[]> = getLandingCards(locale);
    if (!landingCardsData)
      return {
        title: "Not found",
        description: "The page you are looking for doesn't exists",
      };

    return {
      title: "SlotStat: Real-Time Slot Statistics & Data-Driven Gambling Insights",
      description:
        "Explore SlotStat for real-time slot statistics and insights. Discover RTP, Win Spin Rate, and more to make smarter decisions while playing.",
      openGraph: {
        // ...openGraphImage,
        images: "../opengraph-image.png",
        title: "Slotstat",
        description:
          "Explore SlotStat for real-time slot statistics and insights. Discover RTP, Win Spin Rate, and more to make smarter decisions while playing.",
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

export default async function Home({ params: { locale } }: Params) {
  const landingCardsData: Promise<Card[]> = getLandingCards(locale);

  const [landingCards] = await Promise.all([landingCardsData]);

  if (!landingCards) {
    notFound();
  }

  return (
    <>
      {landingCards && <LiveCards cardsData={landingCards} />}
      <IntroComponent />
      <div className="my-6 lg:my-12 my">
        <TableClientSide showFilter={true} showCryptoFiatSwitcher={true} />
      </div>
    </>
  );
}
