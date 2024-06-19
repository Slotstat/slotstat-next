"use client";
import { useEffect, useLayoutEffect, useState } from "react";
import { logoSmall, menu, slotLogo } from "@/app/assets";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { Link } from "@/navigation";
import { ArrowLinkBig, ArrowLinkSmall } from "@/app/assets/svg/ArrowLink";
// import { Collapse } from "@material-tailwind/react";
// import LanguageToggleButton from "./LanguageToggleButton";

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
        <Link href={`/howitworks`} className={checkIsActive("howItWorks")}>
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

const bigHeaderHeight = "h-[87px]";
const bgTransparent0 = "bg-transparent";
const bgTransparent90 = "bg-dark1/90";
const blueNavSize = "h-14";
const blueNavSize0 = "h-[0px]";

const MainPageHeader = () => {
  const smallHeaderHeight = "h-[60px]";
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [navSize, setNavSize] = useState<string>(bigHeaderHeight);
  const [navColor, setNavColor] = useState<string>(bgTransparent0);
  const [hasBorder, setHasBorder] = useState<boolean>(true);
  const [blueNav, setBlueNav] = useState<string>(blueNavSize);
  const [navbarTopDistance, setNavbarTopDistance] = useState<string>("top-14");
  const router = useRouter();

  const listenScrollEvent = () => {
    window.scrollY > 15 ? setBlueNav(blueNavSize0) : setBlueNav(blueNavSize);
    window.scrollY > 15
      ? setNavbarTopDistance("top-0")
      : setNavbarTopDistance("top-14");
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

  // const isSmallerThan768 = () => {
  //   if (window?.innerWidth) {
  //     return window?.innerWidth > 768;
  //   }
  // };
  // const isSmallerThan768 = window?.innerWidth > 768;
  return (
    <header className={` 	`}>
      <div className="h-14"></div>

      <div
        className={`${blueNav}  overflow-hidden transition-all duration-300  flex justify-center items-center text-white bg-blue-500 fixed  top-0 left-0 right-0 z-10`}
      >
        <div className="w-[100%] md:max-w-screen-xl text-xs mx-2 md:mx-0 md:text-base flex justify-between">
          <div className="flex">The site is in test mode</div>
          {/* <div className="flex md:hidden">Test mode</div> */}
          <div className="hidden md:flex">
            <a className="font-bold" href={`mailto:info@slotstat.net`}>
              Report any issues
            </a>
            <ArrowLinkBig />
          </div>
          <div className="flex md:hidden">
            <a className="font-bold" href={`mailto:info@slotstat.net`}>
              Report issues
            </a>
            <ArrowLinkSmall />
          </div>
        </div>
      </div>

      <div
        className={`${navColor} ${navSize} ${navbarTopDistance} ${
          hasBorder ? " lg:border-b-dark3" : " lg:border-b-dark1/90"
        }  overflow-hidden transition-all duration-300  flex justify-center items-center fixed left-0 right-0 z-10 lg:border-b`}
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
      </div>
    </header>
  );
};

const CollapsibleHEader = () => {
  const smallHeaderHeight = "h-[0px]";
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

const Header = () => {
  const pathName = usePathname();
  const isMainPage = pathName === "/en";
  return isMainPage ? <MainPageHeader /> : <CollapsibleHEader />;
};

export default Header;
