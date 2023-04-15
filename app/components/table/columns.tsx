const CASINO_COLS = [
  { Header: "Casino name", accessor: "name" },
  { Header: "Providers", accessor: "providers" },
  { Header: "Bounties", accessor: "bounties" },
  { Header: "1h %", accessor: "p1h" },
  { Header: "24h %", accessor: "p24h" },
  { Header: "Source", accessor: "dataSource" },
  { Header: "Jackpot", accessor: "jackpot" },
  { Header: "24h", accessor: "t24h", maxWidth: 200 },
];

const CASINO_GAME_COLS = [
  { Header: "Game", accessor: "name" },
  { Header: "Provider", accessor: "provider" },
  { Header: "User", accessor: "user" },
  { Header: "1h %", accessor: "p1h" },
  { Header: "24h %", accessor: "p24h" },
  { Header: "Source", accessor: "source" },
  { Header: "Jackpot", accessor: "jackpot" },
  { Header: "24h", accessor: "t24h" },
];


export { CASINO_COLS, CASINO_GAME_COLS };
