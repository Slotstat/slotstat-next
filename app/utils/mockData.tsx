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
      content: t("fluctuationContent"),
    },
  ];
  return ACCORDION_DATA;
};
