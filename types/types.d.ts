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
type Bonus = {
  cardId: string;
  imageUrl: string;
  value: string | null;
  culture: string;
  name: string;
  isLive: boolean;
  additionalInfo: string;
  redirectUrl: string;
  additionalProps: string | null;
  contextId: string;
  valueTypeId: string | null;
  contextType: string;
  valueType: "CasinoPromotion" | "WelcomeBonus";
  isDefault: boolean;
  order: number;
  expireDate: string;
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
  isCrypto: boolean;
  isFiat: boolean;
  additionalInfo: string;
  casinoImageUrl: string;
  jackpotInfo: string;
  verificationStatus: number;
  fixedRtp: number;
  currencRtp: number;
  rtpChange: number;
  rtpState: number;
  sps: number;
  maxX: string;
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
  previousValue: number;
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
  orderBy?: string | null;
  keyWord?: string | null;
  direction?: string | null;
  type?: Type;
  isFiat?: string | null;
  compareGameId?: string;
  ActiveTab?: string;
  page?: string;
  ids?: string;
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

type TableWrapperProps = {
  showFilter: boolean;
  onAddToCompare?: (gameId: GameData) => void;
  orderByBottomsheet?: string | null;
  keyWordBottomsheet?: string | null;
  directionBottomsheet?: string | null;
  isFiatBottomsheet?: string;
  setSearchKeyInBottomSheet?: (text: string) => void;
  setOrderByKeyInBottomSheet?: (text: string | undefined) => void;
  showCryptoFiatSwitcher?: boolean;
  setIsFiatState?: (text: string) => void;
  gameId?: string;
  blogSearchFromTitle?: string;
};

interface TableProps extends TableWrapperProps {
  gamesList?: gamesList;
  setScrollY: (text: number) => void;
  getGames: (selectedPage?: string) => void;
  loading: boolean;
  orderBy?: string | null;
  keyWord?: string | null;
  direction?: string | null;
  isFiat?: string;
}

type TableIn = {
  gamesList: gamesList;
  onAddToCompare?: (gameId: GameData) => void;
  orderBy?: string | null;
  isFiat?: string | null;

  getGames: (selectedPage?: string) => void;
  bottomSheetRowClick: (row: any) => void;
};

interface simpleBlogCard {
  title: string;
  smallDescription: string;
  currentSlug: string;
  titleImage: any;
  _createdAt: string;
}

interface fullBlog {
  currentSlug: string;
  title: string;
  content: any;
  titleImage: any;
  smallDescription: string;
}

type FloatingButtonsItem = {
  label: string;
  id: string;
  value: string;
  width: string;
};
type FloatingButtonsItems = FloatingButtonsItem[];

type InputForOptions =
  | "password"
  | "userName"
  | "email"
  | "verification"
  | undefined;

interface Props {
  extraContainerClasses?: string;
  extraInputClasses?: string;
  type?: string;
  name?: string;
  id?: string;
  inputFor?: InputForOptions;
  customPlaceholder?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: any;
}
