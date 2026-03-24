import Accordion from "@/app/components/Accordion";
// import Breadcrumbs from "@/app/components/Breadcrumbs";
import SubscribeButton from "@/app/components/SubscribeButton";

import { accordionData } from "@/app/utils/mockData";
import { useTranslations } from "next-intl";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { useMemo } from "react";
const breadcrumbs = [{ name: "FAQ" }];

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  try {
    const t = await getTranslations({ locale, namespace: "faqPage" });
    return {
      title: t("metaTitle"),
      description: t("metaDescription"),
      openGraph: {
        images: "https://slotstat.net/opengraph-image.png",
        title: t("metaTitle"),
        description: t("metaDescription"),
      },
      twitter: {
        card: "summary_large_image",
        title: t("metaTitle"),
        description: t("metaDescription"),
        images: ["https://slotstat.net/opengraph-image.png"],
      },
      alternates: {
        canonical: `/${locale}/faq`,
        languages: {
          "en-US": "/en/faq",
          "es-ES": "/es/faq",
          "pt-PT": "/pt/faq",
        },
      },
    };
  } catch (error) {
    const tError = await getTranslations({ locale, namespace: "errors" });
    return {
      title: tError("notFound"),
      description: tError("pageNotExist"),
    };
  }
}
import JsonLd from "@/app/components/JsonLd";

export default function FAQ({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const t = useTranslations("faq");

  const columns = useMemo(() => accordionData(t), [t]);

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is Slotstat?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "SlotStat, a neutral observer in the gambling realm, meticulously displays slot game statistics to enhance players' gaming experiences. Providing essential features such as RTP, RTP Swing, Win Spin Regular, bonuses, JACKPOT, Max X, and SPS data, SlotStat empowers players with comprehensive insights for informed gaming decisions.",
        },
      },
      {
        "@type": "Question",
        name: "What's Win Spin Rate?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Win Spin Rate is a frequency of winning spins, where win is counted if higher than initial bet.",
        },
      },
      {
        "@type": "Question",
        name: "What's Max X?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Max X, also known as the maximum win multiplier, signifies the highest potential payout a slot game offers. This value represents how many times your initial bet you can win under ideal conditions. For instance, if a game has a Max X of 1200X, it means you could potentially win 1200 times your bet amount.",
        },
      },
      {
        "@type": "Question",
        name: "What's RTP Swing?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "RTP SWING is a real-time tool that shows a slot game's fluctuation towards its own ideal RTP at a very exact moment of present, updating once every 5 minutes.",
        },
      },
      {
        "@type": "Question",
        name: "What's SPS?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "SPS stands for Slot Profit Status, a real-time indicator showing whether a slot game's Live RTP is greater than, less than, or equal to its Theoretical RTP. It is represented as a percentage reflecting the difference between Live RTP and Theoretical RTP, updating every 5 minutes.",
        },
      },
      {
        "@type": "Question",
        name: "How do I activate a bonus or promotion on SlotStat?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Navigate to the game page where the bonus is listed, locate the bonus card that interests you, click on the 'Get Bonus' or 'Read More' button, and you will be redirected to the casino's website to activate the bonus.",
        },
      },
    ],
  };

  return (
    <>
      <JsonLd data={faqStructuredData} />
      {/* bg-[url("./assets/img/chart-pattern.png")] */}
      {/* <Breadcrumbs breadcrumbs={breadcrumbs} /> */}
      <div className="py-6 ">
        <div className='h-full relative  flex w-full flex-col items-center   justify-center rounded-3xl bg-dark2 bg-[url("./assets/img/bg.png")] bg-cover lg:bg-auto   md:bg-[url("./assets/img/chart-pattern.png")]  lg:bg-right lg:bg-no-repeat py-12 px-9 lg:items-start lg:py-24 lg:px-28'>
          <p className=" text-xs my-2 font-bold text-blue1 lg:text-lg">{t("theFAQs")}</p>
          <h1 className="my-2 text-lg font-bold text-white lg:text-6xl">{t("helpCentre")}</h1>
          <p className=" text-xs my-2  font-normal text-grey1 lg:text-lg">{t("aboutProduct")}</p>
        </div>
        <div className=" flex flex-col  lg:my-28 lg:flex-row">
          <div className="hidden lg:flex lg:flex-col lg:flex-1">
            <p className="text-[18px] font-normal text-blue1">{t("support")}</p>
            <p className="my-2 text-[32px] font-bold text-white">{t("FAQs")}</p>
            <p className="text-[18px] font-normal text-grey1">{t("What-you-need-to-know")}</p>
          </div>
          <div className="mt-16 lg:mt-0 lg:flex-1">
            <Accordion data={columns} />
          </div>
        </div>
        {/* <div className="relative mt-28 mb-12 flex w-full flex-col flex-wrap items-center rounded-3xl bg-dark2 py-16 px-9 md:flex-row lg:space-x-40 lg:py-20 lg:px-28">
          <div className="flex-1">
            <h1 className="my-2 text-lg text-center md:text-start lg:text-3xl font-bold text-white">
              {t("joinUs")}
            </h1>
            <h1 className="my-2 text-lg text-center md:text-start lg:text-3xl font-bold text-white">
              {t("joinUs1")}
            </h1>
            <h1 className="text-xs lg:text-lg font-normal text-grey1">
              {t("stayInLoop")}
            </h1>
          </div>
          <div className="w-full mt-10 flex flex-1 lg:mt-0 lg:justify-end">
            <SubscribeButton
              subscribe={t("subscribe")}
              XChan={t("XChan")}
              account={t("account")}
            />
          </div>
        </div> */}
      </div>
    </>
  );
}
