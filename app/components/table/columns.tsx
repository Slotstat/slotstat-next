export const casinoColumns = (t: any, isGame: boolean) => {
  const casinoColumns = [
    {
      Header: t("casinoName"),
      accessor: "name",
      maxWidth: 266,
      width: 266,
      minWidth: 100,
    },
    {
      Header: t("providers"),
      accessor: "providers",
      maxWidth: 118,
      width: 118,
      minWidth: 100,
    },
    {
      Header: t("bounties"),
      accessor: "bounties",
      maxWidth: 194,
      width: 194,
      minWidth: 80,
      hint: t("bountiesHint"),
    },
    {
      Header: t("h1"),
      accessor: "p1h",
      maxWidth: 121,
      width: 121,
      minWidth: 50,
      hint: t("h1Hint"),
    },
    {
      Header: t("h24"),
      accessor: "p24h",
      maxWidth: 129,
      width: 129,
      minWidth: 50,
      hint: t("h24Hint"),
    },
    {
      Header: t("source"),
      accessor: "dataSource",
      maxWidth: 140,
      width: 140,
      minWidth: 50,
      hint: t("sourceHint"),
    },
    {
      Header: t("jackpot"),
      accessor: "jackpot",
      maxWidth: 164,
      width: 164,
      minWidth: 50,
      hint: t("jackpotHint"),
    },
    {
      Header: t("t24h"),
      accessor: "t24h",
      maxWidth: 169,
      width: 169,
      minWidth: 50,
    },
  ];

  const CASINO_GAME_COLS = [
    {
      Header: t("game"),
      accessor: "name",
      maxWidth: 276,
      width: 276,
      minWidth: 100,
    },
    {
      Header: t("providers"),
      accessor: "provider",
      maxWidth: 168,
      width: 168,
      minWidth: 100,
    },
    {
      Header: t("user"),
      accessor: "user",
      maxWidth: 129,
      width: 129,
      minWidth: 80,
      hint: t("userHint"),
    },
    {
      Header: t("h1"),
      accessor: "p1h",
      maxWidth: 121,
      width: 121,
      minWidth: 50,
      hint: t("h1GameHint"),
    },
    {
      Header: t("h24"),
      accessor: "p24h",
      maxWidth: 129,
      width: 129,
      minWidth: 50,
      hint: t("h24GameHint"),
    },
    {
      Header: t("source"),
      accessor: "source",
      maxWidth: 140,
      width: 140,
      minWidth: 50,
      hint: t("sourceHint"),
    },
    {
      Header: t("jackpot"),
      accessor: "jackpot",
      maxWidth: 164,
      width: 164,
      minWidth: 50,
      hint: t("jackpotHint"),
    },
    {
      Header: t("t24h"),
      accessor: "t24h",
      maxWidth: 169,
      width: 169,
      minWidth: 50,
    },
  ];

  return isGame ? CASINO_GAME_COLS : casinoColumns;
};

// const SORT_BY = [
//   { label: "None", value: "", id: "0" },
//   { label: "Win rate last 24h", id: "1", value: "p24h" },
//   { label: "Win rate last 1h", id: "2", value: "p1h" },
//   { label: "Jackpot", id: "3", value: "jackpot" },
// ];
