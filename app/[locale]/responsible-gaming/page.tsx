import React from "react";

export async function generateMetadata() {
  try {
    return {
      title: "Responsible Gambling",
      description:
        "SlotStat prioritizes responsible gambling to ensure a safe and enjoyable experience for all players.",
      openGraph: {
        // ...openGraphImage,
        images: "../opengraph-image.png",
        title: "Responsible Gaming",
        description:
          "SlotStat prioritizes responsible gambling to ensure a safe and enjoyable experience for all players.",
      },
      alternates: {
        canonical: `/responsible-gaming`,
        languages: {
          "en-US": `en/responsible-gaming`,
          "ka-GE": `ka/responsible-gaming`,
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

export default function ResponsibleGaming() {
  return (
    <div className="text-grey1 mb-10">
      <h1 className=" text-4xl font-black text-white my-6">
        SlotStat prioritizes responsible gambling to ensure a safe and enjoyable
        experience for all players.
      </h1>

      <h2 className="text-xl font-bold my-4">SlotStat's Commitment</h2>

      <ul className="list-disc ml-6">
        <li>
          Information and Resources: Access guides on gambling risks and
          responsible practices.
        </li>
        <li>
          Deposit Limits: Set daily, weekly, or monthly limits to manage
          spending.
        </li>
        <li>
          Self-Exclusion: Temporarily or permanently block access to the account
          if needed.
        </li>
        <li>
          Support and Assistance: Find links to professional support services
          and helplines.
        </li>
      </ul>

      <h2 className="text-lg font-semibold my-4">Watch for these signs:</h2>
      <ul className="list-disc ml-6">
        <li>Spending more than intended</li>
        <li>Chasing losses</li>
        <li>Neglecting responsibilities</li>
        <li>Feeling anxious or stressed when not gambling</li>
      </ul>

      <h2 className="text-lg font-semibold mt-4 ">Getting Help</h2>
      <p className="mb-4">For assistance contact:</p>

      <ul className="list-disc ml-6">
        <li>Gamblers Anonymous</li>
        <li>National Problem Gambling Helpline</li>
        <li>BeGambleAware</li>
      </ul>

      <p className="mt-8">
        SlotStat believes data is the foundation of responsible gambling. Stay
        informed. Play responsibly.
      </p>
    </div>
  );
}
