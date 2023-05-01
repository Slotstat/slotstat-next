import { Accordion, SubscribeButton } from "@/app/components";
import { getDictionary } from "@/app/i18n/get-dictionary";
import { Locale } from "@/app/i18n/i18n-config";
import { ACCORDION_DATA } from "@/app/utils/mockData";

export default async function FAQ({ params }: { params: { lang: Locale } }) {
  const dictionary = await getDictionary(params.lang);
  const {
    theFAQs,
    helpCentre,
    aboutProduct,
    FAQs,
    support,
    joinUs,
    stayInLoop,
    subscribe,
    telegramChan,
  } = dictionary.faq;

  return (
    <div className="px-4 py-6 ">
      <div className='relative flex w-full flex-col  justify-center rounded-3xl bg-dark2 bg-[url("./assets/img/chart-pattern.png")] bg-right bg-no-repeat py-12 px-9 lg:py-24 lg:px-28'>
        <h1 className="text-[18px] font-normal text-blue1">{theFAQs}</h1>
        <h1 className="my-2 text-[64px] font-bold text-white">{helpCentre}</h1>
        <h1 className="text-[18px] font-normal text-grey1">{aboutProduct}</h1>
      </div>
      <div className="my-16 flex flex-col lg:my-28 lg:flex-row">
        <div className="lg:flex-1">
          <h1 className="text-[18px] font-normal text-blue1">{support}</h1>
          <h1 className="my-2 text-[32px] font-bold text-white">{FAQs}</h1>
          <h1 className="text-[18px] font-normal text-grey1">{aboutProduct}</h1>
        </div>
        <div className="mt-16 lg:mt-0 lg:flex-1">
          <Accordion data={ACCORDION_DATA} />
        </div>
      </div>
      <div className="relative mt-28 mb-12 flex w-full flex-col flex-wrap items-center rounded-3xl bg-dark2 py-16 px-9 lg:flex-row lg:space-x-40 lg:py-20 lg:px-28">
        <div className="flex-1">
          <h1 className="my-2 text-[32px] font-bold text-white">{joinUs}</h1>
          <h1 className="text-[18px] font-normal text-grey1">{stayInLoop}</h1>
        </div>
        <div className="mt-10 flex flex-1 lg:mt-0 lg:justify-end">
          <div>
            <SubscribeButton
              subscribe={subscribe}
              telegramChan={telegramChan}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
