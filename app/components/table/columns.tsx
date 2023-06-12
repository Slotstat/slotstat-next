import { getDictionary } from "@/app/i18n/get-dictionary";
import { Locale } from "@/app/i18n/i18n-config";

const useTableTexts = () => {
  const getCasinoAndGameTableTexts = async (lang: Locale, isGame: boolean) => {
    const dictionary: Dictionary = await getDictionary(lang);
    const { table } = dictionary;
    const {
      casinoName,
      providers,
      bounties,
      h1,
      h24,
      t24h,
      source,
      jackpot,
      game,
      user,
      bountiesHint,
      h1Hint,
      h24Hint,
      sourceHint,
      jackpotHint,
      userHint,
      h1GameHint,
      h24GameHint,
    } = table;
    const casinoColumns = [
      {
        Header: casinoName,
        accessor: "name",
        maxWidth: 266,
        width: 266,
        minWidth: 100,
      },
      {
        Header: providers,
        accessor: "providers",
        maxWidth: 118,
        width: 118,
        minWidth: 100,
      },
      {
        Header: bounties,
        accessor: "bounties",
        maxWidth: 194,
        width: 194,
        minWidth: 80,
        hint: bountiesHint,
      },
      {
        Header: h1,
        accessor: "p1h",
        maxWidth: 121,
        width: 121,
        minWidth: 50,
        hint: h1Hint,
      },
      {
        Header: h24,
        accessor: "p24h",
        maxWidth: 129,
        width: 129,
        minWidth: 50,
        hint: h24Hint,
      },
      {
        Header: source,
        accessor: "dataSource",
        maxWidth: 140,
        width: 140,
        minWidth: 50,
        hint: sourceHint,
      },
      {
        Header: jackpot,
        accessor: "jackpot",
        maxWidth: 164,
        width: 164,
        minWidth: 50,
        hint: jackpotHint,
      },
      {
        Header: t24h,
        accessor: "t24h",
        maxWidth: 169,
        width: 169,
        minWidth: 50,
      },
    ];

    const CASINO_GAME_COLS = [
      {
        Header: game,
        accessor: "name",
        maxWidth: 276,
        width: 276,
        minWidth: 100,
      },
      {
        Header: providers,
        accessor: "provider",
        maxWidth: 168,
        width: 168,
        minWidth: 100,
      },
      {
        Header: user,
        accessor: "user",
        maxWidth: 129,
        width: 129,
        minWidth: 80,
        hint: userHint,
      },
      {
        Header: h1,
        accessor: "p1h",
        maxWidth: 121,
        width: 121,
        minWidth: 50,
        hint: h1GameHint,
      },
      {
        Header: h24,
        accessor: "p24h",
        maxWidth: 129,
        width: 129,
        minWidth: 50,
        hint: h24GameHint,
      },
      {
        Header: source,
        accessor: "source",
        maxWidth: 140,
        width: 140,
        minWidth: 50,
        hint: sourceHint,
      },
      {
        Header: jackpot,
        accessor: "jackpot",
        maxWidth: 164,
        width: 164,
        minWidth: 50,
        hint: jackpotHint,
      },
      {
        Header: t24h,
        accessor: "t24h",
        maxWidth: 169,
        width: 169,
        minWidth: 50,
      },
    ];
    return isGame ? CASINO_GAME_COLS : casinoColumns;
  };

  return { getCasinoAndGameTableTexts };
};

const SORT_BY = [
  { label: "None", value: "", id: "0" },
  { label: "Win rate last 1 day", id: "1", value: "p24h" },
  { label: "Win rate last 1 week", id: "2", value: "p1h" },
  { label: "Win rate last 1 month", id: "4", value: "jackpot" },
  { label: "Win rate last 1 year", id: "5", value: "jackpot" },
  { label: "Win rate all time", id: "6", value: "jackpot" },
  { label: "Jackpot", id: "7", value: "jackpot" },
];
// const SORT_BY = [
//   { label: "None", value: "", id: "0" },
//   { label: "Win rate last 24h", id: "1", value: "p24h" },
//   { label: "Win rate last 1h", id: "2", value: "p1h" },
//   { label: "Jackpot", id: "3", value: "jackpot" },
// ];

export { SORT_BY, useTableTexts };
