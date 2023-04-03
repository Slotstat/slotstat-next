type TStatCardProps = {
  type?: string;
  icon: string;
  label?: string;
  value?: string | React.ReactNode;
  badge?: string;
  tooltip?: string;
};

type CasinoCols = { Header: string; accessor: string };

type CasinoData = {
  name: string;
  Providers: string;
  Bounties: string;
  "1h": string;
  "24h": string;
  Source: string;
  Jackpot: string;
};

type StepProps = {
  index: number;
  active: boolean;
  icon: string;
  description: string;
};