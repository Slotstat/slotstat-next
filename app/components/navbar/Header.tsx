"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next-intl/client";
import Link from "next-intl/link";
// import { Collapse } from "@material-tailwind/react";

import { menu, slotLogo } from "@/app/assets";
import Image from "next/image";
// import LanguageToggleButton from "./LanguageToggleButton";
import { useTranslations } from "next-intl";

const NavList = () => {
  const t = useTranslations("navbar");

  const pathName = usePathname();

  const checkIsActive = (path: string) => {
    if (!pathName) return "text-grey1";
    const segments = pathName.split("/");
    return segments[1] === path ? "text-white" : "text-grey1 hover:text-white";
  };

  return (
    <nav className="my-2 flex flex-col lg:my-0 lg:ml-auto lg:flex-row lg:items-center">
      <span className="mt-4 text-sm font-normal hover:text-white lg:mt-0 lg:ml-8">
        <Link href={`/howItWorks`} className={checkIsActive("howItWorks")}>
          {t("howItWorks")}
        </Link>
      </span>
      <span className="mt-4 text-sm font-normal lg:mt-0 lg:ml-8">
        <Link href={`/faq`} className={checkIsActive("faq")}>
          {t("faq")}
        </Link>
      </span>
    </nav>
  );
};

const smallHeaderHeight = "h-[60px]";
const bigHeaderHeight = "h-[87px]";
const bgTransparent0 = "bg-transparent";
const bgTransparent90 = "bg-dark1/90";

const Header = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [navSize, setNavSize] = useState<string>(bigHeaderHeight);
  const [navColor, setNavColor] = useState<string>(bgTransparent0);
  const [hasBorder, setHasBorder] = useState<boolean>(true);

  const listenScrollEvent = () => {
    window.scrollY > 15
      ? setNavColor(bgTransparent90)
      : setNavColor(bgTransparent0);
    window.scrollY > 15
      ? setNavSize(smallHeaderHeight)
      : setNavSize(bigHeaderHeight);
    window.scrollY > 15 ? setHasBorder(false) : setHasBorder(true);
  };

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 1024 && setNavbarOpen(false)
    );
    window.addEventListener("scroll", listenScrollEvent);

    listenScrollEvent();
    return () => {
      window.removeEventListener("scroll", listenScrollEvent);
    };
  }, []);

  const toggleNav = () => {
    setNavbarOpen(!navbarOpen);
  };
  return (
    <header
      className={`${navColor} ${navSize} ${
        hasBorder ? " lg:border-b-dark3" : " lg:border-b-dark1/90"
      } transition-all duration-300  flex justify-center items-center	fixed top-0 left-0 right-0 z-10 lg:border-b`}
    >
      <div className="flex w-[100%] justify-center">
        <div className="flex items-center justify-between w-[100%] max-w-screen-xl lg:px-0 px-4">
          <Link href="/" className="flex items-center">
            <Image
              src={slotLogo}
              alt="logo of slotstat"
              width={140}
              height={40}
            />
          </Link>
          <div className="flex items-center">
            <NavList />
            {/* <LanguageToggleButton /> */}
          </div>
          {/* <button
            className="ml-8 h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg text-[10px] font-normal lg:hidden"
            onClick={toggleNav}
          >
            <Image src={menu} alt="" width={32} height={32} />
          </button> */}
        </div>
      </div>
      {/* <Collapse open={navbarOpen}>
        <div className="lg:hidden">
          <NavList />
        </div>
      </Collapse> */}
    </header>
  );
};

export default Header;
