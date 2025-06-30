export const casinoOrGameColumns = (t: any) => {
  const CASINO_GAME_COLS = [
    {
      header: (
        <div>
          {t("slot")} /<span className="text-grey1 ml-1">{t("provider")}</span>
        </div>
      ),
      accessorKey: "name",
      maxSize: 290,
      size: 290,
      minSize: 148,
    },

    {
      header: t("play"),
      accessorKey: "play",
      maxSize: 114,
      size: 114,
      minSize: 90,
      hint: t("playHint"),
    },
    {
      header: t("liveRTP"),
      accessorKey: "totalRtp",
      maxSize: 117,
      size: 117,
      minSize: 80,
      hint: t("playHint"),
    },
    {
      header: (
        <div>
          {t("liveRTP")}
          <span className="text-grey1 text-xs font-normal ml-1">(Per 100 Spins)</span>
        </div>
      ),
      accessorKey: "currencRtp",
      maxSize: 189,
      size: 189,
      minSize: 180,
      hint: t("playHint"),
    },

    {
      header: (
        <div>
          {t("wsr")}
          <span className="text-grey1 text-xs font-normal ml-1">(Per 100 Spins)</span>
        </div>
      ),
      accessorKey: "wsr",
      maxSize: 185,
      size: 185,
      minSize: 140,
      hint: t("h1GameHint"),
    },
    {
      header: t("RTP"),
      accessorKey: "fixedRtp",
      maxSize: 86,
      size: 86,
      minSize: 60,
      hint: t("RTPhint"),
    },

    {
      header: t("casino"),
      accessorKey: "casinoName",
      maxSize: 172,
      size: 172,
      minSize: 90,
      hint: t("casinoBonusHint"),
    },
    {
      header: t("statistics"),
      accessorKey: "statType",
      maxSize: 141,
      size: 141,
      minSize: 100,
      hint: t("casinoBonusHint"),
    },
    // {
    //   header: t("SPS"),
    //   accessorKey: "SPS",
    //   maxSize: 108,
    //   size: 108,
    //   minSize: 72,
    //   hint: t("SPSHint"),
    // },
    // {
    //   header: t("h24"),
    //   accessorKey: "p24h",
    //   maxSize: 140,
    //   size: 140,
    //   minSize: 100,
    //   hint: t("h24GameHint"),
    // },

    // {
    //   header: t("jackpot"),
    //   accessorKey: "jackpot",
    //   maxSize: 203,
    //   size: 203,
    //   minSize: 136,
    //   hint: t("jackpotHint"),
    // },
    // {
    //   header: t("maxX"),
    //   accessorKey: "maxX",
    //   maxSize: 143,
    //   size: 143,
    //   minSize: 107,
    //   hint: t("maxXHint"),
    // },
    // {
    //   header: (
    //     <div>
    //       {t("casino")} /<span className="text-grey1 ml-1">{t("bonus")}</span>
    //     </div>
    //   ),
    //   accessorKey: "casino",
    //   maxSize: 242,
    //   size: 242,
    //   minSize: 148,
    //   hint: t("casinoBonusHint"),
    // },
  ];

  return CASINO_GAME_COLS;
};

// const SORT_BY = [
//   { label: "None", value: "", id: "0" },
//   { label: "Win rate last 24h", id: "1", value: "p24h" },
//   { label: "Win rate last 1h", id: "2", value: "p1h" },
//   { label: "Jackpot", id: "3", value: "jackpot" },
// ];
