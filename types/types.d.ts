type TStatCardProps = {
  type?: string;
  icon: string;
  label?: string;
  value?: string | React.ReactNode;
  badge?: string;
  tooltip?: string;
};

type Card = {
  cardId: string;
  imageUrl: string;
  value: string;
  culture: string;
  name: string;
  isLive: boolean;
  additionalInfo?: string;
  redirectUrl: string;
  additionalProps: string[];
  contextId?: string;
  valueTypeId: string;
  contextType: string;
  valueType: string;
  isDefault: boolean;
};

type Offer = {
  offerId: string;
  imageUrl: string;
  creagteDate: string;
  redirectUrl: string;
  title: string;
  subTitle: string;
  culture: string;
};

type CasinoCols = {
  Header: string;
  accessor: string;
  maxWidth: number;
  width: number;
  minWidth: number;
  hint?: string;
};

type StepProps = {
  index: number;
  active: boolean;
  icon: string;
  description: string;
};

type Dictionary = {
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
    XChan: string;
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
  table: {
    casinoName: string;
    providers: string;
    bonuses: string;
    h1: string;
    h24: string;
    source: string;
    jackpot: string;
    t24h: string;
    game: string;
    user: string;
    bonusesHint: string;
    bountiesHint: string;
    h1Hint: string;
    h24Hint: string;
    sourceHint: string;
    jackpotHint: string;
    userHint: string;
    h1GameHint: string;
    h24GameHint: string;
  };
};

type GameData = {
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
  casinoName: string;
  redirectUrl: string;
  type?: "AllGames";
  casinoCurrency?: string;
  rtp: RTP;
  bounties: string;
  currencyCode: string;
  fixedRtp: string;
  isCrypto: boolean;
  isFiat: boolean;
  additionalInfo: string;
  casinoImageUrl: string;
  jackpotInfo: "string";
  verificationStatus: number;
};

type RTP = {
  casinoId: string;
  displayOnCasionListing: boolean;
  id: string;
  isDemoActive: boolean;
  max: number;
  min: number;
  name: string;
  preferredValue: number;
  provider: string;
  value: number;
};

type gamesList = {
  results: GameData[];
  currentPage: number;
  pageCount: number;
  pageSize: number;
  rowCount: number;
};

type StatisticsData = {
  betCount?: number;
  betCount2?: number;
  winRate?: number;
  winRate2?: number;
  date: Date;
  timeStamp: number;
};

type RTPListingProps = {
  rtp: RTP;
};

type FiltersKey = "1D" | "1W" | "1M" | "1Y" | "All" | string;

type DateFilterForChartProps = {
  activeFilterId: FiltersKey;
  onPressFilter: (key: FiltersKey) => void;
  setFilterDisabled: (boolean: boolean) => void;
  filterDisabled: boolean;
};
type CasinoNamesWithCompareButtonProps = {
  onPressCompare: () => void;
  onPressRemove: () => void;
  compareGameObject: GameData | undefined;
  mainGameObject: GameData | undefined;
};
type ActionPaneProps = CasinoNamesWithCompareButtonProps &
  DateFilterForChartProps;

type Type = "AllGames" | "Game";
interface QueryParamsGamePage extends QueryParams {
  casId: string;
}

type QueryParams = {
  orderBy?: string;
  keyWord?: string;
  direction?: string;
  type?: Type;
  isFiat?: string;
  compareGameId?: string;
  isGame?: string;
  page?: string;
};

type GetGamesFromChosenCasinoProps = {
  casinoId: string;
  name: string;
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
  redirectUrl: string;
  isForAllGames?: boolean;
}
