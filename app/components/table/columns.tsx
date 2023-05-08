const CASINO_COLS = [
  {
    Header: "Casino name",
    accessor: "name",
    maxWidth: 266,
    width: 266,
    minWidth: 100,
  },
  {
    Header: "Providers",
    accessor: "providers",
    maxWidth: 118,
    width: 118,
    minWidth: 100,
  },
  {
    Header: "Bounties",
    accessor: "bounties",
    maxWidth: 194,
    width: 194,
    minWidth: 80,
  },
  { Header: "1h %", accessor: "p1h", maxWidth: 121, width: 121, minWidth: 50 },
  {
    Header: "24h %",
    accessor: "p24h",
    maxWidth: 129,
    width: 129,
    minWidth: 50,
  },
  {
    Header: "Source",
    accessor: "dataSource",
    maxWidth: 140,
    width: 140,
    minWidth: 50,
  },
  {
    Header: "Jackpot",
    accessor: "jackpot",
    maxWidth: 164,
    width: 164,
    minWidth: 50,
  },
  { Header: "24h", accessor: "t24h", maxWidth: 169, width: 169, minWidth: 50 },
];

const CASINO_GAME_COLS = [
  {
    Header: "Game",
    accessor: "name",
    maxWidth: 276,
    width: 276,
    minWidth: 100,
  },
  {
    Header: "Provider",
    accessor: "provider",
    maxWidth: 168,
    width: 168,
    minWidth: 100,
  },
  { Header: "User", accessor: "user", maxWidth: 129, width: 129, minWidth: 80 },
  { Header: "1h %", accessor: "p1h", maxWidth: 121, width: 121, minWidth: 50 },
  {
    Header: "24h %",
    accessor: "p24h",
    maxWidth: 129,
    width: 129,
    minWidth: 50,
  },
  {
    Header: "Source",
    accessor: "source",
    maxWidth: 140,
    width: 140,
    minWidth: 50,
  },
  {
    Header: "Jackpot",
    accessor: "jackpot",
    maxWidth: 164,
    width: 164,
    minWidth: 50,
  },
  { Header: "24h", accessor: "t24h", maxWidth: 169, width: 169, minWidth: 50 },
];

export { CASINO_COLS, CASINO_GAME_COLS };
