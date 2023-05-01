import { skewed_arrow, gear } from "@/app/assets";
import { getDictionary } from "@/app/i18n/get-dictionary";
import { Locale } from "@/app/i18n/i18n-config";
import { STEPS } from "@/app/utils/mockData";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "slot stat",
  description: "slot stat high level",
};

const Step = ({ index, icon, description, active }: StepProps) => {
  return (
    <div className="flex max-w-md flex-col rounded-3xl border border-grey2 p-4">
      <div className="flex flex-row items-center justify-between">
        <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-grey2">
          <span className="text-[18px] text-white">{index + 1}</span>
        </div>
        <Image src={icon} alt="" className="h-8 w-8" width={36} height={37} />
      </div>
      <span className="mt-3 text-sm leading-5 text-white lg:text-base">
        <span className="text-grey1">{description}</span>
      </span>
    </div>
  );
};

export default async function HowItWorks({
  params,
}: {
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(params.lang);
  const { howItWorks, howItWorksDescription } = dictionary.howItWorksPage;

  return (
    <div className="my-9 flex flex-col items-center px-4 lg:my-24 lg:px-18">
      <div className="flex flex-col items-center lg:flex-row lg:justify-between lg:space-x-16">
        <div className="flex flex-1 flex-col">
          <div className="flex h-16 items-center lg:h-36">
            <span className="text-[36px] font-bold text-white lg:text-[60px]">
              {howItWorks}?
            </span>
          </div>
          <span className="mt-10 text-2xl text-grey1">
            {howItWorksDescription}
          </span>
          <div className="relative -top-24 flex -rotate-[58deg] scale-x-[-1] items-center justify-center transition-all duration-200 lg:top-0 lg:mt-15 lg:rotate-[-18deg] lg:scale-x-[1]">
            <Image
              src={skewed_arrow}
              alt=""
              className="max-h-24 lg:max-h-36 w-full h-auto"
              width="0"
              height="0"
              sizes="100vw"
            />
          </div>
        </div>
        <div className="flex flex-col items-end space-y-6">
          {STEPS.map((item, index) => {
            return <Step key={index} index={index} active={true} {...item} />;
          })}
        </div>
      </div>
      <div className="mt-24 overflow-hidden rounded-3xl">
        <video controls>
          <source
            src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            type="video/mp4"
          />
        </video>
      </div>
    </div>
  );
}
