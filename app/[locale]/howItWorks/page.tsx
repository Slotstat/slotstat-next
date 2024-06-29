import Breadcrumbs from "@/app/components/Breadcrumbs";

export async function generateMetadata() {
  try {
    return {
      title: "Slotstat how it works",
      description:
        "Unique platform which gives you opportunity to choose where to play and win! ",
      openGraph: {
        // ...openGraphImage,
        images: "../opengraph-image.png",
        title: "How Slotstat works?",
        description:
          "Slotstat, Unique platform which gives you opportunity to choose where to play and win by using statistics!",
      },
      alternates: {
        canonical: `/howitworks`,
        languages: {
          "en-US": `en/howitworks`,
          "ka-GE": `ka/howitworks`,
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

const breadcrumbs = [{ name: "How it works" }];



export default async function HowItWorks() {

  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div className="text-grey1 mb-10">
        <h1 className=" text-4xl font-black text-white my-6">
          SlotStat Mechanics and How it Works
        </h1>
        <h2 className="mb-8">
          Slotstat is an information worktop where users have the power to
          observe general details and real-time statistics of slots and casinos.
          On the landing page, players will find some handy figurines like: RTP,
          RTP SWING, Win Spin Rate, bonuses and Jackpot. Analyzing SlotStat data
          may turn up for players as a tool to plan beforehand playing and an
          advantageous gambling experience.
        </h2>
        <p className="">Figurines:</p>
        <ol className="list-decimal list-inside mb-10 ">
          <li className="">
            RTP - Return to Player Percentage. RTP is predicted, the ideal point
            to which slots constantly aspire and represents the casino tendency
            to realize payouts.
          </li>
          <li className="">
            RTP SWING - Parameter shows the game’s variance from the ideal RTP
            in real-time.
          </li>
          <li className="">
            Win Spin Rate - Win Spin Rate is a frequency of winning spins, where
            win is higher than initial bet.
          </li>
          <li className="">
            Jackpot - Figurine shows maximum Jackpot value of the chosen slot.
          </li>

          {/* <ul className="list-disc  list-inside ml-5">
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
          </ul> */}
        </ol>
        <p className="">Games Listing Page:</p>
        <p className="mb-6">
          On the landing page after selecting the slot and clicking on its bar,
          the player gets directed to the game page of the SlotStat interface,
          where the player is able to analyze general information and real-time
          statistics of desired slot game. Based on this information the player
          can determine whether it’s play time or not.
        </p>
        <p className="">Game Page:</p>
        <p className="mb-6">
          Game Page is a full-scaled graph of the average win spin frequency
          where the player has flexibility to customize time frames and get a
          detailed visualization of chosen game according to its preferences.
        </p>
        <p className="mb-6">
          As an additional function SlotStat also offers a ‘Compare’ button,
          which appears to be an unmatched possibility for users to contrast
          graphs and RTP counters of the specific casino or game to another.
        </p>

        <p>All set, SlotStat data is all yours now. Use it as you please.</p>
      </div>
    </>
  );
}
