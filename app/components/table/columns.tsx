export const casinoOrGameColumns = (t: any) => {
  const CASINO_GAME_COLS = [
    {
      Header: (
        <div>
          {t("slot")} /<span className="text-grey1 ml-1">{t("provider")}</span>
        </div>
      ),
      accessor: "name",
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
      accessor: "casino",
      maxWidth: 246,
      width: 246,
      minWidth: 148,
      hint: t("casinoBonusHint"),
    },
    {
      Header: t("h1"),
      accessor: "p1h",
      maxWidth: 127,
      width: 127,
      minWidth: 100,
      hint: t("h1GameHint"),
    },
    {
      Header: t("h24"),
      accessor: "p24h",
      maxWidth: 140,
      width: 140,
      minWidth: 100,
      hint: t("h24GameHint"),
    },

    {
      Header: t("jackpot"),
      accessor: "jackpot",
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
      accessor: "RTP",
      maxWidth: 210,
      width: 210,
      minWidth: 168,
      hint: t("RTPhint"),
    },
    {
      Header: t("SPS"),
      accessor: "SPS",
      maxWidth: 82,
      width: 82,
      minWidth: 60,
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
