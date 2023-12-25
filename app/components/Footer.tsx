"use client";
import { logo, slotLogo } from "../assets";
import SubscribeButton from "./SubscribeButton";
import Link from "next-intl/link";
// import LanguageToggleButton from "./navbar/LanguageToggleButton";
import Image from "next/image";
import { useTranslations } from "next-intl";

const Footer = () => {
  const t = useTranslations("navbar");
  const tFooter = useTranslations("footer");
  const tFaq = useTranslations("faq");

  return (
    <footer className="flex justify-center bg-dark2  pt-8 pb-12  ">
      <div className="grid grid-cols-1 lg:grid-cols-flexauto w-[100%] max-w-screen-xl lg:px-0 px-4">
        <div className="flex items-start justify-center lg:justify-start">
          <div className="flex flex-1 items-center justify-between lg:justify-start">
            <Link href="/" className="flex items-center">
              <Image
                src={slotLogo}
                alt="logo of slotstat"
                width={140}
                height={40}
              />
            </Link>
            {/* <LanguageToggleButton css="flex lg:hidden h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border border-grey1 text-[10px] font-normal text-grey1" /> */}
          </div>
        </div>
        <div className="order-3 mt-8 flex flex-col justify-center lg:order-none lg:mt-0 lg:flex-row lg:justify-start">
          <div>
            <h5 className="mb-4 text-xs font-bold text-white lg:text-sm">
              {tFooter("company")}
            </h5>
            <Link
              href="/aboutUs"
              className="mb-4 block text-xs font-normal text-grey1 lg:text-sm"
            >
              {tFooter("aboutUs")}
            </Link>
            <Link
              href="/termsOfUse"
              className="mb-4 block text-xs font-normal text-grey1 lg:text-sm"
            >
              {tFooter("termsOfUse")}
            </Link>
            <Link
              href="/privacyPolicy"
              className="mb-4 block text-xs font-normal text-grey1 lg:text-sm"
            >
              {tFooter("privacyPolicy")}
            </Link>
          </div>
          <div className="mt-8 lg:mt-0 lg:ml-18">
            <h5 className="mb-4 block text-xs font-black text-white lg:text-sm">
              {tFaq("support")}
            </h5>
            <Link
              href="/faq"
              className="mb-4 block text-xs font-normal text-grey1 lg:text-sm"
            >
              {t("faq")}
            </Link>
            <Link
              href="/howItWorks"
              className="mb-4 block text-xs font-normal text-grey1 lg:text-sm"
            >
              {t("howItWorks")}
            </Link>
          </div>
        </div>
        <div className="order-last mt-8 flex items-end justify-center py-0 lg:order-none lg:mt-0 lg:justify-start lg:py-4.5 ">
          <div className="flex flex-col">
            <a
              className="text-sm font-normal text-white mb-3"
              href={`mailto:info@slotstat.net`}
            >
              info@slotstat.net
            </a>

            <span className="text-sm font-normal text-grey1">
              {tFooter("allRightsReserved")}
            </span>
          </div>
        </div>
        <div className="order-3 mt-8 flex flex-col justify-center lg:order-none lg:mx-0 lg:mt-18 lg:justify-start">
          <SubscribeButton
            subscribe={tFaq("subscribe")}
            XChan={tFaq("XChan")}
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
