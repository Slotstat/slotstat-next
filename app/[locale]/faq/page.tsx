import Accordion from "@/app/components/Accordion";
// import Breadcrumbs from "@/app/components/Breadcrumbs";
import SubscribeButton from "@/app/components/SubscribeButton";

import { accordionData } from "@/app/utils/mockData";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
const breadcrumbs = [{ name: "FAQ" }];

export async function generateMetadata() {
  try {
    return {
      title: "Frequently Asked Questions",
      description:
        "Find answers to common questions about SlotStat, including slot statistics, data insights, and how our platform enhances your gambling experience.",
      openGraph: {
        // ...openGraphImage,
        images: "../opengraph-image.png",
        title: "Frequently Asked Questions",
        description:
          "Find answers to common questions about SlotStat, including slot statistics, data insights, and how our platform enhances your gambling experience.",
      },
      alternates: {
        canonical: `/faq`,
        languages: {
          "en-US": `en/faq`,
          // "ka-GE": `ka/faq`,
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

export default function FAQ() {
  const t = useTranslations("faq");

  const columns = useMemo(() => accordionData(t), [t]);

  return (
    <>
      {/* bg-[url("./assets/img/chart-pattern.png")] */}
      {/* <Breadcrumbs breadcrumbs={breadcrumbs} /> */}
      <div className="py-6 ">
        <div className='h-full relative  flex w-full flex-col items-center   justify-center rounded-3xl bg-dark2 bg-[url("./assets/img/bg.png")] bg-cover lg:bg-auto   md:bg-[url("./assets/img/chart-pattern.png")]  lg:bg-right lg:bg-no-repeat py-12 px-9 lg:items-start lg:py-24 lg:px-28'>
          <h1 className=" text-xs my-2 font-bold text-blue1 lg:text-lg">
            {t("theFAQs")}
          </h1>
          <p className="my-2 text-lg font-bold text-white lg:text-6xl">
            {t("helpCentre")}
          </p>
          <p className=" text-xs my-2  font-normal text-grey1 lg:text-lg">
            {t("aboutProduct")}
          </p>
        </div>
        <div className=" flex flex-col  lg:my-28 lg:flex-row">
          <div className="hidden lg:flex lg:flex-col lg:flex-1">
            <p className="text-[18px] font-normal text-blue1">{t("support")}</p>
            <p className="my-2 text-[32px] font-bold text-white">{t("FAQs")}</p>
            <p className="text-[18px] font-normal text-grey1">
              {t("What-you-need-to-know")}
            </p>
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
