import Breadcrumbs from "@/app/components/Breadcrumbs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "How Slotstat works?",
  description:
    "Unique platform which gives you opportunity to choose where to play and win! ",
};

const breadcrumbs = [{ name: "How it works" }];

export default function HowItWorks() {
  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
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
              frequency for each casino over two time intervals: the past hour
              and the past 24 hours. The information is sourced from either the
              Casino API for real-time data or our Algorithm for preliminary
              stats based on our formulas and observations.
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
          </ul>
          <li className="mb-8">
            Games Listing Page: When users select a specific casino from the
            landing page, they will be directed to the Games Listing page. Here,
            users can explore an extensive collection of games available at the
            chosen casino.
          </li>
          <li className="mb-8">
            Game Page: On the Full-Scale Graph page, users can dive deeper into
            statistical data. This page features a detailed graph representing
            the average hit rate frequency over a selected time period. Users
            have the flexibility to customize the timeframe according to their
            preferences.
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
          present, empowering users to make well-informed choices in their
          online gambling endeavors.
        </p>
        <p>
          Feel free to explore our website and harness the potential of
          statistical data with Slotstat.ge
        </p>
      </div>
    </>
  );
}
