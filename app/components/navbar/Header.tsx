"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { Collapse } from "@material-tailwind/react";

import { menu, slotLogo } from "@/app/assets";
import Image from "next/image";
import LanguageToggleButton from "./LanguageToggleButton";
import { Locale } from "@/app/i18n/i18n-config";

const NavList = ({
  dictionary,
}: {
  dictionary: Dictionary;
  // language: Locale;
}) => {
  const { howItWorks } = dictionary.howItWorksPage;
  const { faq } = dictionary.navbar;
  const pathName = usePathname();

  const checkIsActive = (path: string) => {
    if (!pathName) return "text-grey1";
    const segments = pathName.split("/");
    return segments[2] === path ? "text-white" : "text-grey1";
  };

  return (
    <nav className="my-2 flex flex-col lg:my-0 lg:ml-auto lg:flex-row lg:items-center">
      <span className="mt-4 text-sm font-normal lg:mt-0 lg:ml-8">
        <Link href={`/howItWorks`} className={checkIsActive("howItWorks")}>
          {howItWorks}
        </Link>
      </span>
      <span className="mt-4 text-sm font-normal lg:mt-0 lg:ml-8">
        <Link href={`/faq`} className={checkIsActive("faq")}>
          {faq}
        </Link>
      </span>
    </nav>
  );
};

const Header = ({
  dictionary,
  language,
}: {
  dictionary: Dictionary;
  language: Locale;
}) => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const { lang } = dictionary.navbar;

  const toggleNav = () => {
    setNavbarOpen(!navbarOpen);
  };

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 1024 && setNavbarOpen(false)
    );
  }, []);

  return (
    <header className="px-4 py-6 lg:border-b lg:border-b-dark3  justify-center items-center	">
      <div className="flex justify-center">
        <div className="flex items-center justify-between w-[100%] max-w-screen-xl">
          <Link href="/" className="flex items-center">
            <Image
              src={slotLogo}
              alt="logo of slotstat"
              width={140}
              height={40}
            />
          </Link>
          <div className="hidden items-center lg:flex">
            <NavList
              dictionary={dictionary}
              // language={language}
            />
            <LanguageToggleButton
              lang={lang}
              css="mt-4 hidden h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border border-grey1 text-[10px] font-normal text-grey1 lg:mt-0 lg:ml-8 lg:flex"
            />
          </div>
          <button
            className="ml-8 h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg text-[10px] font-normal lg:hidden"
            onClick={toggleNav}
          >
            <Image src={menu} alt="" width={32} height={32} />
          </button>
        </div>
      </div>
      <Collapse open={navbarOpen}>
        <div className="lg:hidden">
          <NavList
            dictionary={dictionary}
            // language={"ge"}
          />
        </div>
      </Collapse>
    </header>
  );
};

export default Header;
