export const casinoOrGameColumns = (t: any) => {
  const CASINO_GAME_COLS = [
    {
      Header: (
        <div>
          {t("slot")} /<span className="text-grey1 ml-1">{t("provider")}</span>
        </div>
      ),
      accessorKey: "name",
      maxWidth: 279,
      width: 279,
      minWidth: 188,
    },
    {
      Header: (
        <div>
          {t("casino")} /<span className="text-grey1 ml-1">{t("bonus")}</span>
        </div>
      ),
      accessorKey: "casino",
      maxWidth: 246,
      width: 246,
      minWidth: 148,
      hint: t("casinoBonusHint"),
    },
    {
      Header: t("h1"),
      accessorKey: "p1h",
      maxWidth: 127,
      width: 127,
      minWidth: 100,
      hint: t("h1GameHint"),
    },
    {
      Header: t("h24"),
      accessorKey: "p24h",
      maxWidth: 140,
      width: 140,
      minWidth: 100,
      hint: t("h24GameHint"),
    },

    {
      Header: t("jackpot"),
      accessorKey: "jackpot",
      maxWidth: 212,
      width: 212,
      minWidth: 136,
      hint: t("jackpotHint"),
    },
    {
      Header: (
        <div>
          {t("RTP")} /<span className="text-grey1 ml-1">{t("swing")}</span>
        </div>
      ),
      accessorKey: "RTP",
      maxWidth: 210,
      width: 210,
      minWidth: 168,
      hint: t("RTPhint"),
    },
    {
      Header: t("SPS"),
      accessorKey: "SPS",
      maxWidth: 82,
      width: 82,
      minWidth: 70,
      hint: t("SPSHint"),
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
