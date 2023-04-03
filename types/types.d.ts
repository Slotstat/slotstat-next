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
