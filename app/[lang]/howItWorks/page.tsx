// import { skewed_arrow, gear } from "@/app/assets";
// import { getDictionary } from "@/app/i18n/get-dictionary";
// import { STEPS } from "@/app/utils/mockData";
// import Image from "next/image";
import { Locale } from "@/app/i18n/i18n-config";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "slot stat",
  description: "slot stat high level",
};

// const Step = ({ index, icon, description, active }: StepProps) => {
//   return (
//     <div className="flex max-w-md flex-col rounded-3xl border border-grey2 p-4">
//       <div className="flex flex-row items-center justify-between">
//         <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-grey2">
//           <span className="text-[18px] text-white">{index + 1}</span>
//         </div>
//         <Image src={icon} alt="" className="h-8 w-8" width={36} height={37} />
//       </div>
//       <span className="mt-3 text-sm leading-5 text-white lg:text-base">
//         <span className="text-grey1">{description}</span>
//       </span>
//     </div>
//   );
// };

export default async function HowItWorks({
  params,
}: {
  params: { lang: Locale };
}) {
  // const dictionary = await getDictionary(params.lang);
  // const { howItWorks, howItWorksDescription } = dictionary.howItWorksPage;
  return (
    <div className="text-grey1 mb-10">
      <h1 className=" text-4xl font-black text-white my-4">How it works</h1>
      <p className="mb-8">
        {`Welcome to the "How it works" section of Slotstat.ge, where we provide a
        detailed overview of our platform's functionality and features. Let's
        explore the three main pages and their functionalities:`}
      </p>
      <ol className="list-decimal list-inside">
        <li className="mb-8">
          {`Landing Page: Upon visiting Slotstat.ge, users will land on our
          dynamic landing page. This page displays a list of casinos tailored to
          the user's country. Each casino listing provides essential information
          to help users make informed decisions. These details include:`}
        </li>

        <ul className="list-disc  list-inside">
          <li className="mb-8">
            Number of Providers: We showcase how many game providers are
            available at each casino, giving users an idea of the variety and
            diversity of gaming options.
          </li>
          <li className="mb-8">
            Gifts and Promos: We highlight the exclusive gifts and promotions
            (bounties) offered by each casino. This ensures users are aware of
            the exciting bonuses they can take advantage of when signing up.
          </li>
          <li className="mb-8">
            Wining Spin Percentage Changes: We track and display the change in
            winning spin percentage for each casino over two time intervals: the
            past hour and the past 24 hours. The information is categorized into
            three sources:
          </li>
          <ul className="list-disc pl-6 list-inside">
            <li className="mb-4">
              {`Casino API: Data retrieved directly from the casino's API, providing
          real-time statistics.`}
            </li>
            <li className="mb-4">
              Verified API: Data cross-checked by SlotStat, ensuring its
              accuracy and reliability.
            </li>
            <li className="mb-4">
              Algorithm: Preliminary stats calculated using our own formulas and
              observations.
            </li>
          </ul>
          <li className="mb-8">
            Online Updating Jackpots: For casinos offering multiple jackpots, we
            showcase the highest jackpot value that is actively updating in
            real-time. This information allows users to stay up-to-date with the
            potential big wins at their chosen casino.
          </li>
          <li className="mb-8">
            Teaser Graph: A compact preview graph is provided for each casino,
            giving users a visual representation of the winning spin percentages
            over time. This teaser graph offers a glimpse into the overall
            trends at the casino.
          </li>
          <li className="mb-8">
            Games Listing Page: When users select a specific casino from the
            landing page, they are directed to the Games Listing page. Here,
            users can explore the comprehensive collection of games available at
            the selected casino. This page provides an overview of the diverse
            gaming options, including slots, table games, and more.
          </li>
        </ul>
        <li className="mb-8">
          Full-Scale Graph Page: On the Full-Scale Graph page, users can delve
          deeper into the statistical data. This page features a detailed graph
          that represents the average percentage of winning spins over a
          selected period of time. Users can customize the timeframe to their
          preference.
        </li>
      </ol>
      <p>
        {`Additionally, we offer a "Compare" button, allowing users to compare
        graphs of a specific casino or game with another. This feature
        facilitates easy observation and comparison of winning spin percentages,
        enabling users to make data-driven decisions.`}
      </p>
      <p>
        At Slotstat.ge, our aim is to provide users with a user-friendly
        interface and valuable insights to enhance their gaming experience. We
        strive to ensure transparency, accuracy, and accessibility in the data
        we present, empowering users to make informed choices in their online
        gambling ventures. Feel free to explore our website and unlock the power
        of statistical data with Slotstat.ge
      </p>
    </div>
  );
  // old version
  // return (
  //   <div className="my-9 flex flex-col items-center px-4 lg:my-24 lg:px-18">
  //     <div className="flex flex-col items-center lg:flex-row lg:justify-between lg:space-x-16">
  //       <div className="flex flex-1 flex-col">
  //         <div className="flex h-16 items-center lg:h-36">
  //           <span className="text-[36px] font-bold text-white lg:text-[60px]">
  //             {howItWorks}?
  //           </span>
  //         </div>
  //         <span className="mt-10 text-2xl text-grey1">
  //           {howItWorksDescription}
  //         </span>
  //         <div className="relative -top-24 flex -rotate-[58deg] scale-x-[-1] items-center justify-center transition-all duration-200 lg:top-0 lg:mt-15 lg:rotate-[-18deg] lg:scale-x-[1]">
  //           <Image
  //             src={skewed_arrow}
  //             alt=""
  //             className="max-h-24 lg:max-h-36 w-full h-auto"
  //             width="0"
  //             height="0"
  //             sizes="100vw"
  //           />
  //         </div>
  //       </div>
  //       <div className="flex flex-col items-end space-y-6">
  //         {STEPS.map((item, index) => {
  //           return <Step key={index} index={index} active={true} {...item} />;
  //         })}
  //       </div>
  //     </div>
  //     <div className="mt-24 overflow-hidden rounded-3xl">
  //       <video controls>
  //         <source
  //           src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
  //           type="video/mp4"
  //         />
  //       </video>
  //     </div>
  //   </div>
  // );
}
