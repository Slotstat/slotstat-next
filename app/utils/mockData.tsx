import { gear } from "@/app/assets";

export const STEPS = [
  {
    icon: gear,
    description:
      "Aq daiwereba pirveli nabiji tu ra unda gaaketos momxmarebel,a max 3 xazi",
  },
  {
    icon: gear,
    description:
      "Aq daiwereba pirveli nabiji tu ra unda gaaketos momxmarebel,a max 3 xazi",
  },
  {
    icon: gear,
    description:
      "Aq daiwereba pirveli nabiji tu ra unda gaaketos momxmarebel,a max 3 xazi teqtsi meti ara.მ",
  },
];

export const accordionData = (t: any) => {
  const ACCORDION_DATA = [
    {
      header: t("WhatIsSlotstat"),
      content: t("WhatIsSlotstatContent"),
    },
    {
      header: t("WhatIsHappeningHere"),
      content: t("WhatIsHappeningHereParams"),

      // content: (
      //   <div>
      //     <p>{t("WhatIsHappeningHereParams")}</p>
      //     <p className="ml-3">{t("WhatIsHappeningHereA")}</p>
      //     <p className="ml-3">{t("WhatIsHappeningHereB")}</p>
      //     <p className="ml-3">{t("WhatIsHappeningHereC")}</p>
      //     <p >{t("WhatIsHappeningHereEnd")}</p>
      //   </div>
      // ),
    },
    {
      header: t("WhatsHitRate"),
      content: t("WhatsHitRateContent"),
    },
    {
      header: t("WhatIsRTP"),
      content: t("WhatIsRTPContent"),
    },
    {
      header: t("fluctuation"),
      content: (
        <div>
          <p>
            "SPS" stands for Slot Profit Status, a real-time indicator displayed
            on our site to show whether a slot game's Live Return to Player
            (RTP) is greater than, less than, or equal to its Theoretical RTP.
          </p>
          <p>How is SPS calculated?</p>
          <p>
            SPS is represented as a percentage, reflecting the difference
            between the Live RTP and the Theoretical RTP. For example:
          </p>
          <ul className=" list-disc ">
            <li className="ml-2">
              If the Theoretical RTP is 97%, but the Live RTP is 120%, the SPS
              would be +23%, indicating that the slot game has paid out 23% more
              than expected.
            </li>
            <li className="ml-2">
              Conversely, if the Live RTP is 90%, the SPS would be -7%,
              indicating that the slot game has paid out 7% less than expected.
            </li>
          </ul>
          <p>How often is SPS updated?</p>
          <p>
            SPS is a live updating feature, with updates occurring every 5
            minutes. This ensures that players have access to the most current
            information about a slot game's performance.
          </p>
          <p>Understanding the additional digits:</p>
          <p>
            In addition to the main SPS percentage, you may notice smaller
            digits beneath it. These smaller digits represent the change in SPS
            since the previous update. They can be either positive or negative,
            indicating whether the slot game has performed better or worse
            compared to the previous update. For example:
          </p>
          <ul className="list-disc list-inside">
            <li className="ml-2">
              If the previous SPS was 7%, and the new SPS is 5%, the smaller
              digits would display "-2%" in red, indicating a decrease in
              performance.
            </li>
            <li className="ml-2">
              If the next update shows an SPS of 6%, the smaller digits would
              display "+1%" in green, indicating an improvement compared to the
              previous update.
            </li>
          </ul>
          <p>
            We hope this helps you understand SPS better and enhances your
            experience on SlotStat.net!
          </p>
        </div>
      ),
    },
    {
      header: t("activateBonus"),
      content: (
        <div>
          <p>
            To activate a bonus or promotion on SlotStat, simply follow these
            steps:
          </p>
          <ol className="list-decimal list-inside">
            <li className="ml-2">
              Navigate to the game page where the bonus is listed.
            </li>
            <li className="ml-2">Locate the bonus card that interests you.</li>
            <li className="ml-2">
              Click on the corresponding "Get Bonus" or "Read More" button on
              the card.
            </li>
            <li className="ml-2">
              You will be redirected to the corresponding section on the
              casino's website to activate the bonus or promotion.
            </li>
            <li className="ml-2">
              Follow the instructions provided by the casino to claim your bonus
              and enjoy enhanced gaming experiences.
            </li>
          </ol>
        </div>
      ),
    },
  ];
  return ACCORDION_DATA;
};
