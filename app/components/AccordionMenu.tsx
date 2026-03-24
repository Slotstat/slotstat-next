"use client";
import React, { Dispatch, SetStateAction } from "react";
import { Accordion, AccordionItem as RItem } from "@szhsin/react-accordion";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";

const Icon = ({ active = false }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none">
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

export default function AccordionMenu({
  isMobileMenu,
  closeMenu,
}: {
  isMobileMenu?: boolean;
  closeMenu?: Dispatch<SetStateAction<boolean>>;
}) {
  const t = useTranslations("navbar");
  const tFooter = useTranslations("footer");
  const tFaq = useTranslations("faq");
  const tNav = useTranslations("nav");

  const Company = [
    { href: "/about-us", title: tFooter("aboutUs") },
    { href: "/terms-of-use", title: tFooter("termsOfUse") },
    { href: "/privacy-policy", title: tFooter("privacyPolicy") },
  ];
  const quickLinks = [
    { href: "/top-slots", title: tNav("topSlots") },
    { href: "/providers", title: tNav("providers") },
    { href: "/casinos", title: tNav("casinos") },
  ];
  const support = [
    { href: "/faq", title: t("faq") },
    { href: "/how-it-works", title: t("howItWorks") },
    { href: "/responsible-gaming", title: tFooter("responsibleGaming") },
  ];
  const blog = [
    { icon: "🕹️", href: "/blog/slots", title: tFooter("slots") },
    { icon: "🎰", href: "/blog/casinos", title: tFooter("casinos") },
    { icon: "📡", href: "/blog/providers", title: tFooter("providers") },
    { icon: "📰", href: "/blog/news", title: tFooter("news") },
    { icon: "🎓", href: "/blog/education", title: tFooter("education") },
  ];

  const renderLinkItems = (arr: any) => {
    return (
      <>
        {arr.map(({ href, title, icon }: { href: string; title: string; icon?: string }) => (
          <Link
            key={title}
            href={href}
            onClick={() => closeMenu && closeMenu(false)}
            className={`mb-3 font-normal flex flex-row items-center  cursor-pointer ${
              isMobileMenu ? "text-xs text-white" : "text-grey1 text-xs lg:text-sm"
            } `}
          >
            {icon && isMobileMenu && (
              <div className="mr-2 rounded-full h-8 w-8 bg-grey3 flex items-center justify-center ">
                <span>{icon}</span>
              </div>
            )}
            {title}
          </Link>
        ))}
      </>
    );
  };

  const accordionItems = [
    {
      header: tFooter("company"),
      content: renderLinkItems(Company),
    },
    {
      header: tFaq("support"),
      content: renderLinkItems(support),
    },
    {
      header: tFooter("blog"),
      content: renderLinkItems(blog),
    },
  ];

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
        <div className="mb-3 flex flex-1 items-center justify-between font-bold text-xs text-white lg:text-2xl">
          <h5
            className={`relative font-bold text-white ${
              isMobileMenu ? "text-xs" : "text-xs lg:text-sm"
            }`}
          >
            {header}
            {header === tFooter("blog") && isMobileMenu && (
              <div className="absolute top-0 -right-2 h-1.5 w-1.5 bg-red rounded" />
            )}
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

  return (
    <div>
      <div>
        {isMobileMenu &&
          quickLinks.map(({ href, title }) => (
            <Link
              key={title}
              href={href}
              onClick={() => closeMenu && closeMenu(false)}
              className="mb-4 flex w-full items-center font-bold text-xs text-white"
            >
              {title}
            </Link>
          ))}
      </div>
      <Accordion transition transitionTimeout={200} className="space-y-1">
        {accordionItems.map((item, index) => {
          return (
            <AccordionItem key={index} header={item.header} initialEntered={false}>
              {item.content}
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}
