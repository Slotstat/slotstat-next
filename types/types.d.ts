type TStatCardProps = {
  type?: string;
  icon: string;
  label?: string;
  value?: string | React.ReactNode;
  badge?: string;
  tooltip?: string;
};

type CasinoCols = { Header: string; accessor: string };

type StepProps = {
  index: number;
  active: boolean;
  icon: string;
  description: string;
};

type Dictionary = {
  dictionary: {
    navbar: {
      howItWorks: string;
      faq: string;
      slotstat: string;
      lang: { ge: string; en: string };
    };
    howItWorksPage: {
      howItWorks: string;
      howItWorksDescription: string;
    };
    faq: {
      theFAQs: string;
      helpCentre: string;
      aboutProduct: string;
      FAQs: string;
      support: string;
      joinUs: string;
      stayInLoop: string;
      subscribe: string;
      telegramChan: string;
    };
    footer: {
      company: string;
      aboutUs: string;
      termsOfUse: string;
      privacyPolicy: string;
      allRightsReserved: string;
    };
    compare: string;
    vs: string;
  };
};

interface CasinoData extends GameData {
  casinoId: string;
  name: string;
  imageUrl: string;
  providers: number;
  bounties: string;
  dataSource: string;
  jackpot: number;
  jackpotCurrency: string;
  s24h?: null[] | null;
  p1h: number;
  p24h: number;
  users: number;
  pallTime: number;
  t1H: number;
  t24h: number;
}

interface GameData {
  gameId: string;
  name: string;
  imageUrl: string;
  provider: string;
  dataSource: string;
  jackpot: number;
  jackpotCurrency: string;
  s24h?: null[] | null;
  p1h: number;
  p24h: number;
  t1H: number;
  t24h: number;
  casinoId?: string;
}

type gamesList = {
  results: GameData[];
  currentPage: number;
  pageCount: number;
  pageSize: number;
  rowCount: number;
};

type casinoCard = {
  cardId: string;
  imageUrl: string;
  value: string;
  culture: string;
  name: string;
  isLive: boolean;
  additionalInfo?: null;
  redirectUrl: string;
  additionalProps?: null;
  contextId: string;
  valueTypeId: string;
  contextType: string;
  valueType: string;
  isDefault: boolean;
};
