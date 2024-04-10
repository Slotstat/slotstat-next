export const casinoOrGameColumns = (t: any) => {
  const CASINO_GAME_COLS = [
    {
      header: (
        <div>
          {t("slot")} /<span className="text-grey1 ml-1">{t("provider")}</span>
        </div>
      ),
      accessorKey: "name",
      maxSize: 273,
      size: 273,
      minSize: 188,
    },
    {
      header: (
        <div>
          {t("casino")} /<span className="text-grey1 ml-1">{t("bonus")}</span>
        </div>
      ),
      accessorKey: "casino",
      maxSize: 242,
      size: 242,
      minSize: 148,
      hint: t("casinoBonusHint"),
    },
    {
      header: t("h1"),
      accessorKey: "p1h",
      maxSize: 127,
      size: 127,
      minSize: 100,
      hint: t("h1GameHint"),
    },
    // {
    //   header: t("h24"),
    //   accessorKey: "p24h",
    //   maxSize: 140,
    //   size: 140,
    //   minSize: 100,
    //   hint: t("h24GameHint"),
    // },

    {
      header: t("jackpot"),
      accessorKey: "jackpot",
      maxSize: 203,
      size: 203,
      minSize: 136,
      hint: t("jackpotHint"),
    },
    {
      header: t("maxX"),
      accessorKey: "maxX",
      maxSize: 143,
      size: 143,
      minSize: 130,
      hint: t("maxXHint"),
    },
    {
      header: t("RTP"),
      // (
      //   <div>
      //     {t("RTP")} /<span className="text-grey1 ml-1">{t("swing")}</span>
      //   </div>
      // )
      accessorKey: "RTP",
      maxSize: 109,
      size: 109,
      minSize: 168,
      hint: t("RTPhint"),
    },
    {
      header: t("SPS"),
      accessorKey: "SPS",
      maxSize: 108,
      size: 108,
      minSize: 70,
      hint: t("SPSHint"),
    },
    {
      header: t("play"),
      accessorKey: "play",
      maxSize: 89,
      size: 89,
      minSize: 70,
      hint: t("playHint"),
    },
  ];

  return CASINO_GAME_COLS;
};

// const SORT_BY = [
//   { label: "None", value: "", id: "0" },
//   { label: "Win rate last 24h", id: "1", value: "p24h" },
//   { label: "Win rate last 1h", id: "2", value: "p1h" },
//   { label: "Jackpot", id: "3", value: "jackpot" },
// ];
