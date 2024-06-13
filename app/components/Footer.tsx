"use client";
import { logo, slotLogo } from "../assets";
import SubscribeButton from "./SubscribeButton";

// import LanguageToggleButton from "./navbar/LanguageToggleButton";
import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  Accordion as RAccordion,
  AccordionItem as RItem,
} from "@szhsin/react-accordion";
import { useEffect } from "react";
import { Link } from "@/navigation";

const Footer = () => {
  const t = useTranslations("navbar");
  const tFooter = useTranslations("footer");
  const tFaq = useTranslations("faq");

  const Icon = ({ active = false }) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        fill="none"
      >
        <path
          stroke="#fff"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="m16 10-4 4-4-4"
        />
      </svg>
    );
  };

  const AccordionItem = ({
    header,
    ...rest
  }: {
    children: any;
    header: string;
    initialEntered: boolean;
  }) => (
    <RItem
      {...rest}
      header={({ state: { isEnter } }) => (
        <div className="mb-4 flex flex-1 items-center justify-between font-bold text-base text-white lg:text-2xl">
          <h5 className="mb-4 text-xs font-bold text-white lg:text-sm">
            {header}
          </h5>
          <div
            className={`ml-auto transition-transform duration-200 ease-in-out ${
              isEnter && "rotate-180"
            }`}
          >
            <Icon active={isEnter} />
          </div>
        </div>
      )}
      buttonProps={{
        className: ({ isEnter }) => `flex w-full text-left `,
      }}
      contentProps={{
        className:
          "transition-height duration-200 ease-in-out text-sm lg:text-lg font-normal leading-normal text-grey1",
      }}
      panelProps={{ className: " text-xs lg:text-[18px] text-grey1 leading-6" }}
    />
  );
  
  const accordionItems = [
    {
      header: tFooter("company"),
      // <h5 className="mb-4 text-xs font-bold text-white lg:text-sm">
      //   {tFooter("company")}
      // </h5>
      content: (
        <>
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
        </>
      ),
    },
    {
      header: tFaq("support"),
      content: (
        <>
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
        </>
      ),
    },
  ];

  return (
    <>
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
            {typeof window !== "undefined" && window.innerWidth < 768 ? (
              <RAccordion
                transition
                transitionTimeout={200}
                className="space-y-1"
              >
                {accordionItems.map((item, index) => {
                  return (
                    <AccordionItem
                      key={index}
                      header={item.header}
                      initialEntered={index === 0}
                    >
                      {item.content}
                    </AccordionItem>
                  );
                })}
              </RAccordion>
            ) : (
              <>
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
              </>
            )}
          </div>
          <div className="order-last mt-8 flex items-end justify-between  md:justify-center py-0 lg:order-none lg:mt-0 lg:justify-start lg:py-4.5 ">
            <div className="flex flex-row w-full justify-between  md:flex-col">
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
              toOurXChannel={tFaq("toOurXChannel")}
            />
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
