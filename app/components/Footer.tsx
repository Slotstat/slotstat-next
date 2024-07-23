"use client";
import { logo, slotLogo } from "../assets";
import SubscribeButton from "./SubscribeButton";

// import LanguageToggleButton from "./navbar/LanguageToggleButton";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Accordion, AccordionItem as RItem } from "@szhsin/react-accordion";
import { useEffect } from "react";
import { Link } from "@/navigation";
import {
  Instagram,
  InstagramSmall,
  Reddit,
  RedditSmall,
  X,
  XSmall,
  Youtube,
  YoutubeSmall,
} from "../assets/svg/FooterIcons";

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
        <div className="mb-2 flex flex-1 items-center justify-between font-bold text-base text-white lg:text-2xl">
          <h5 className=" text-xs font-bold text-white lg:text-sm">{header}</h5>
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
        <div>
          <Link
            href="/about-us"
            className="mb-4 block text-xs font-normal text-grey1 lg:text-sm"
          >
            {tFooter("aboutUs")}
          </Link>
          <Link
            href="/terms-of-use"
            className="mb-4 block text-xs font-normal text-grey1 lg:text-sm"
          >
            {tFooter("termsOfUse")}
          </Link>
          <Link
            href="/privacy-policy"
            className="mb-4 block text-xs font-normal text-grey1 lg:text-sm"
          >
            {tFooter("privacyPolicy")}
          </Link>
        </div>
      ),
    },
    {
      header: tFaq("support"),
      content: (
        <div>
          <Link
            href="/faq"
            className="mb-4 block text-xs font-normal text-grey1 lg:text-sm"
          >
            {t("faq")}
          </Link>
          <Link
            href="/how-it-works"
            className="mb-4 block text-xs font-normal text-grey1 lg:text-sm"
          >
            {t("howItWorks")}
          </Link>
        </div>
      ),
    },
    {
      header: tFooter("blog"),
      content: (
        <div>
          <Link
            href="/blog/slots"
            className="mb-4 block text-xs font-normal text-grey1 lg:text-sm"
          >
            {tFooter("slots")}
          </Link>
          <Link
            href="/blog/casinos"
            className="mb-4 block text-xs font-normal text-grey1 lg:text-sm"
          >
            {tFooter("casinos")}
          </Link>
          <Link
            href="/blog/providers"
            className="mb-4 block text-xs font-normal text-grey1 lg:text-sm"
          >
            {tFooter("providers")}
          </Link>
          <Link
            href="/blog/news"
            className="mb-4 block text-xs font-normal text-grey1 lg:text-sm"
          >
            {tFooter("news")}
          </Link>
          <Link
            href="/blog/education"
            className="mb-4 block text-xs font-normal text-grey1 lg:text-sm"
          >
            {tFooter("education")}
          </Link>
        </div>
      ),
    },
  ];

  return (
    <>
      <footer className="flex justify-center bg-dark2  pt-4 pb-10 md:pt-8 md:pb-12  ">
        <div className="grid grid-cols-1 lg:grid-cols-flexauto w-[100%] max-w-screen-xl lg:px-0 px-4">
          <div className=" hidden md:flex items-start justify-center lg:justify-start">
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
          <div className="order-3 flex flex-col justify-center lg:order-none  md:mt-8 lg:mt-0 lg:flex-row lg:justify-start">
            {typeof window !== "undefined" && window.innerWidth < 768 ? (
              <Accordion
                transition
                transitionTimeout={200}
                className="space-y-1"
              >
                {accordionItems.map((item, index) => {
                  return (
                    <AccordionItem
                      key={index}
                      header={item.header}
                      initialEntered={false}
                    >
                      {item.content}
                    </AccordionItem>
                  );
                })}
              </Accordion>
            ) : (
              <>
                <div>
                  <h5 className="mb-4 text-xs font-bold text-white lg:text-sm">
                    {tFooter("company")}
                  </h5>
                  <Link
                    href="/about-us"
                    className="mb-4 block text-xs font-normal text-grey1 lg:text-sm"
                  >
                    {tFooter("aboutUs")}
                  </Link>
                  <Link
                    href="/terms-of-use"
                    className="mb-4 block text-xs font-normal text-grey1 lg:text-sm"
                  >
                    {tFooter("termsOfUse")}
                  </Link>
                  <Link
                    href="/privacy-policy"
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
                    href="/how-it-works"
                    className="mb-4 block text-xs font-normal text-grey1 lg:text-sm"
                  >
                    {t("howItWorks")}
                  </Link>
                </div>
                <div className="mt-8 lg:mt-0 lg:ml-18">
                  <h5 className="mb-4 block text-xs font-black text-white lg:text-sm">
                    {tFooter("blog")}
                  </h5>
                  <Link
                    href="/blog/slots"
                    className="mb-4 block text-xs font-normal text-grey1 lg:text-sm"
                  >
                    {tFooter("slots")}
                  </Link>
                  <Link
                    href="/blog/casinos"
                    className="mb-4 block text-xs font-normal text-grey1 lg:text-sm"
                  >
                    {tFooter("casinos")}
                  </Link>
                  <Link
                    href="/blog/providers"
                    className="mb-4 block text-xs font-normal text-grey1 lg:text-sm"
                  >
                    {tFooter("providers")}
                  </Link>
                  <Link
                    href="/blog/news"
                    className="mb-4 block text-xs font-normal text-grey1 lg:text-sm"
                  >
                    {tFooter("news")}
                  </Link>
                  <Link
                    href="/blog/education"
                    className="mb-4 block text-xs font-normal text-grey1 lg:text-sm"
                  >
                    {tFooter("education")}
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
          <div className="hidden order-3 lg:order-none lg:mx-0 lg:mt-18  lg:justify-end md:flex md:flex-row lg:py-4.5">
            <a href="https://x.com/slotstat_net" target="_blank">
              <X className=" ml-3" />
            </a>
            <a
              href="https://www.instagram.com/slotstat_net"
              target="_blank"
              className=""
            >
              <Instagram className=" ml-3" />
            </a>
            <a
              href="https://www.reddit.com/r/SlotStrategy/"
              target="_blank"
              className=""
            >
              <Reddit className=" ml-3" />
            </a>
            <a href="https://x.com/slotstat_net" target="_blank" className="">
              <Youtube className=" ml-3" />
            </a>
          </div>
          <div className="order-3 flex flex-row justify-between  md:hidden  ">
            <a href="https://x.com/slotstat_net" target="_blank" className="">
              <XSmall />
            </a>
            <a
              href="https://www.instagram.com/slotstat_net"
              target="_blank"
              className=""
            >
              <InstagramSmall />
            </a>
            <a
              href="https://www.reddit.com/r/SlotStrategy/"
              target="_blank"
              className=""
            >
              <RedditSmall />
            </a>
            <a href="https://x.com/slotstat_net" target="_blank" className="">
              <YoutubeSmall />
            </a>
          </div>
          {/* <div className="order-3 flex flex-col justify-center lg:order-none lg:mx-0 lg:mt-18 lg:justify-start">
            <SubscribeButton
              subscribe={tFaq("subscribe")}
              toOurXChannel={tFaq("toOurXChannel")}
            />
          </div> */}
        </div>
      </footer>
    </>
  );
};

export default Footer;
