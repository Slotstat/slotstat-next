"use client";
import { logo } from "../assets";
import SubscribeButton from "./SubscribeButton";
import Link from "next/link";
import LanguageToggleButton from "./navbar/LanguageToggleButton";
import Image from "next/image";

const Footer = ({ dictionary }: Dictionary) => {
  const { slotstat, lang, faq, howItWorks } = dictionary.navbar;
  const { company, aboutUs, termsOfUse, privacyPolicy, allRightsReserved } =
    dictionary.footer;
  const { support, subscribe, telegramChan } = dictionary.faq;
  return (
    <footer className="grid grid-cols-1 bg-dark2 px-4 pt-8 pb-12 lg:grid-cols-flexauto lg:px-18">
      <div className="flex items-start justify-center lg:justify-start">
        <div className="flex flex-1 items-center justify-between lg:justify-start">
          <>
            <Image src={logo} alt="" width={40} height={40} />
            <span className="ml-2 hidden text-[26px] font-bold text-white lg:inline">
              {slotstat}
            </span>
          </>
          <LanguageToggleButton
            lang={lang}
            css="flex lg:hidden h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border border-grey1 text-[10px] font-normal text-grey1"
          />
        </div>
      </div>
      <div className="order-3 mt-8 flex flex-col justify-center lg:order-none lg:mt-0 lg:flex-row lg:justify-start">
        <div>
          <h5 className="mb-4 text-xs font-bold text-white lg:text-sm">
            {company}
          </h5>
          <Link
            href="/aboutUs"
            className="mb-4 block text-xs font-normal text-grey1 lg:text-sm"
          >
            {aboutUs}
          </Link>
          <Link
            href="/termsOfUse"
            className="mb-4 block text-xs font-normal text-grey1 lg:text-sm"
          >
            {termsOfUse}
          </Link>
          <Link
            href="/privacyPolicy"
            className="mb-4 block text-xs font-normal text-grey1 lg:text-sm"
          >
            {privacyPolicy}
          </Link>
        </div>
        <div className="mt-8 lg:mt-0 lg:ml-18">
          <h5 className="mb-4 block text-xs font-black text-white lg:text-sm">
            {support}
          </h5>
          <Link
            href="/faq"
            className="mb-4 block text-xs font-normal text-grey1 lg:text-sm"
          >
            {faq}
          </Link>
          <Link
            href="/howItWorks"
            className="mb-4 block text-xs font-normal text-grey1 lg:text-sm"
          >
            {howItWorks}
          </Link>
        </div>
      </div>
      <div className="order-last mt-8 flex items-end justify-center py-0 lg:order-none lg:mt-0 lg:justify-start lg:py-4.5">
        <span className="text-sm font-normal text-grey1">
          {allRightsReserved}
        </span>
      </div>
      <div className="order-3 mt-8 flex flex-col justify-center lg:order-none lg:mx-0 lg:mt-18 lg:justify-start">
        <SubscribeButton subscribe={subscribe} telegramChan={telegramChan} />
      </div>
    </footer>
  );
};

export default Footer;
