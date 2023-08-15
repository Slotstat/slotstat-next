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
      header: t("WhatIsHappeningHere"),
      content: (
        <div>
          <p>{t("WhatIsHappeningHereParams")}</p>
          <p>{t("WhatIsHappeningHereA")}</p>
          <p>{t("WhatIsHappeningHereB")}</p>
          <p>{t("WhatIsHappeningHereC")}</p>
          <p>{t("WhatIsHappeningHereEnd")}</p>
        </div>
      ),
    },
    {
      header: t("WhatIsSlotstat"),
      content: t("WhatIsSlotstatContent"),
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
