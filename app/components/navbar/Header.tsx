"use client";
import { useEffect, useState } from "react";
import { logoSmall, menu, slotLogo } from "@/app/assets";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { Link } from "@/navigation";
// import { Collapse } from "@material-tailwind/react";
// import LanguageToggleButton from "./LanguageToggleButton";
// import { useRouter } from "next-intl/client";

const NavList = () => {
  const t = useTranslations("navbar");

  const pathName = usePathname();

  const checkIsActive = (path: string) => {
    if (!pathName) return "text-grey1";
    const segments = pathName.split("/");
    return segments[1] === path ? "text-white" : "text-grey1 hover:text-white";
  };

  return (
    <nav className="my-2 flex flex-row lg:my-0 ml-auto lg:items-center">
      <span className="mt-4 text-xs font-normal ml-3  md:ml-8 hover:text-white lg:mt-0 md:text-sm">
        <Link href={`/howItWorks`} className={checkIsActive("howItWorks")}>
          {t("howItWorks")}
        </Link>
      </span>
      <span className="mt-4 text-xs  font-normal ml-3  lg:mt-0 md:ml-8 md:text-sm ">
        <Link href={`/faq`} className={checkIsActive("faq")}>
          {t("faq")}
        </Link>
      </span>
    </nav>
  );
};

const smallHeaderHeight = "h-[0px]";
const bigHeaderHeight = "h-[87px]";
const bgTransparent0 = "bg-transparent";
const bgTransparent90 = "bg-dark1/90";

const Header = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [navSize, setNavSize] = useState<string>(bigHeaderHeight);
  const [navColor, setNavColor] = useState<string>(bgTransparent0);
  const [hasBorder, setHasBorder] = useState<boolean>(true);
  const router = useRouter();

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

  // const toggleNav = () => {
  //   setNavbarOpen(!navbarOpen);
  // };
  const handleReload = () => {
    // router.push("/");
    router.refresh();
  };

  return (
    <header
      className={`${navColor} ${navSize} ${
        hasBorder ? " lg:border-b-dark3" : " lg:border-b-dark1/90"
      } overflow-hidden transition-all duration-300  flex justify-center items-center	fixed top-0 left-0 right-0 z-10 lg:border-b`}
    >
      <div className="flex w-[100%] justify-center">
        <div className="flex items-center justify-between w-[100%] max-w-screen-xl lg:px-0 px-4">
          <Link href="/" className="flex items-center" onClick={handleReload}>
            {/* <div
              className=" cursor-pointer flex items-center"
              onClick={() => handleReload()}
            > */}
            <Image
              className="hidden md:flex"
              src={slotLogo}
              alt="logo of slotstat"
              width={140}
              height={40}
            />
            <Image
              className="flex md:hidden"
              src={logoSmall}
              alt="logo of slotstat"
              width={36}
              height={36}
            />
            {/* </div> */}
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
