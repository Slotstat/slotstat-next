// import { skewed_arrow, gear } from "@/app/assets";
// import { getDictionary } from "@/app/i18n/get-dictionary";
// import { STEPS } from "@/app/utils/mockData";
// import Image from "next/image";
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

export default async function HowItWorks() {
  // const dictionary = await getDictionary(params.lang);
  // const { howItWorks, howItWorksDescription } = dictionary.howItWorksPage;
  return (
    <div className="text-grey1 mb-10">
      <h1 className=" text-4xl font-black text-white my-4">How it works</h1>
      <p className="mb-8">
        {`Welcome to the "How it works" section of Slotstat.ge, where we offer an in-depth overview of our platform's functionalities and features. Let's delve into the three main pages and their capabilities:`}
      </p>
      <ol className="list-decimal list-inside ">
        <li className="mb-8">
          {`Landing Page: Upon visiting Slotstat.ge, users will be directed to our
          dynamic landing page. This page displays a tailored list of casinos
          based on the user's country. Each casino listing provides essential
          information to assist users in making informed decisions. These
          details include:`}
        </li>

        <ul className="list-disc  list-inside ml-5">
          <li className="mb-8">
            {`RTP (Return to Player) Percentage: This is a predicted, ideal number
            that represents the casino's tendency to realize payouts. It serves
            as a guideline for players.`}
          </li>
          <li className="mb-8">
            {`RTP Fluctuation: This live parameter indicates the variance from the
            ideal RTP. It's visible on the landing page, game listings, and
            specific game pages. The game page offers a detailed visualization
            of RTP fluctuations, allowing users to compare them across games,
            casinos, and providers.`}
          </li>
          <li className="mb-8">
            Gifts and Promos: We highlight exclusive gifts and promotions
            (bounties) offered by each casino.
          </li>
          <li className="mb-8">
            Hit Rate Frequency: We track and display the change in hit rate
            frequency for each casino over two time intervals: the past hour and
            the past 24 hours. The information is sourced from either the Casino
            API for real-time data or our Algorithm for preliminary stats based
            on our formulas and observations.
          </li>
          <li className="mb-8">
            Online Updating Jackpots: For casinos with multiple jackpots, we
            showcase the highest jackpot value that is actively updating in
            real-time. This keeps users informed about potential big wins at
            their chosen casino.
          </li>
          <li className="mb-8">
            Teaser Counter: Each casino is accompanied by a compact preview
            graph, offering users a visual representation of winning spin
            percentages over time. This teaser graph provides a quick overview
            of casino trends.
          </li>

          {/* <ul className="list-disc pl-6 list-inside">
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
          </ul> */}
          {/* <li className="mb-8">
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
          </li> */}
        </ul>
        <li className="mb-8">
          Games Listing Page: When users select a specific casino from the
          landing page, they will be directed to the Games Listing page. Here,
          users can explore an extensive collection of games available at the
          chosen casino.
        </li>
        <li className="mb-8">
          Game Page: On the Full-Scale Graph page, users can dive deeper into
          statistical data. This page features a detailed graph representing the
          average hit rate frequency over a selected time period. Users have the
          flexibility to customize the timeframe according to their preferences.
        </li>
      </ol>
      <p className="mb-8">
        {` Additionally, we offer a "Compare" button, enabling users to compare
        graphs and RTP counters of a specific casino or game with another. This
        feature streamlines observation and facilitates the comparison of hit
        rates and RTP percentages, assisting users in making data-driven
        decisions.`}
      </p>
      <p className="mb-8">
        At Slotstat.ge, our goal is to provide users with a user-friendly
        interface, valuable information, and insights. We are dedicated to
        ensuring transparency, accuracy, and accessibility in the data we
        present, empowering users to make well-informed choices in their online
        gambling endeavors.
      </p>
      <p>
        Feel free to explore our website and harness the potential of
        statistical data with Slotstat.ge
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
