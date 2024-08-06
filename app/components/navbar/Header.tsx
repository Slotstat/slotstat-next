"use client";
import { useEffect, useState } from "react";
import { logoSmall, menu, slotLogo } from "@/app/assets";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Link } from "@/navigation";
import MobileMenu from "./MobileMenu";
import NavList from "./NavList";
import BetaModeHeader from "./BetaModeHeader";
import ReusableHeaderLogo from "./ReusableHeaderLogo";
// import LanguageToggleButton from "./LanguageToggleButton";

const bigHeaderHeight = "h-[87px]";
const bgTransparent0 = "bg-transparent";
const bgTransparent90 = "bg-dark1/90";
const blueNavSize = "h-14";
const blueNavSize0 = "h-[0px]";

const MenuButton = ({ toggleNav }: { toggleNav: () => void }) => (
  <button
    className="ml-8 h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg text-[10px] font-normal lg:hidden"
    onClick={toggleNav}
  >
    <Image src={menu} alt="" width={32} height={32} />
  </button>
);

const MainPageHeader = ({ isMainPage }: { isMainPage: boolean }) => {
  const smallHeaderHeight = isMainPage ? "h-[60px]" : "h-[0px]";
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [navSize, setNavSize] = useState<string>(bigHeaderHeight);
  const [navColor, setNavColor] = useState<string>(bgTransparent0);
  const [hasBorder, setHasBorder] = useState<boolean>(true);
  const [blueNav, setBlueNav] = useState<string>(blueNavSize);
  const [navbarTopDistance, setNavbarTopDistance] = useState<string>("top-14");

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

  const listenScrollEventCollapsible = () => {
    window.scrollY > 15
      ? setNavColor(bgTransparent90)
      : setNavColor(bgTransparent0);
    window.scrollY > 15
      ? setNavSize(smallHeaderHeight)
      : setNavSize(bigHeaderHeight);
    window.scrollY > 15 ? setHasBorder(false) : setHasBorder(true);
  };

  useEffect(() => {
    if (isMainPage) {
      window.addEventListener("scroll", listenScrollEvent);
    } else {
      window.addEventListener("scroll", listenScrollEventCollapsible);
    }

    return () => {
      isMainPage
        ? window.removeEventListener("scroll", listenScrollEvent)
        : window.removeEventListener("scroll", listenScrollEventCollapsible);
    };
  }, [isMainPage]);

  // useEffect(() => {
  //   if (navbarOpen) {
  //     // Disable scrolling on the body when menu is open
  //     document.body.style.overflow = "hidden";
  //     document.body.style.height = "100vh";
  //   } else {
  //     // Re-enable scrolling when menu is closed
  //     document.body.style.overflow = "unset";
  //     document.body.style.height = "auto";
  //   }

  //   // Cleanup function to re-enable scrolling when component unmounts
  //   return () => {
  //     document.body.style.overflow = "unset";
  //     document.body.style.height = "auto";
  //   };
  // }, [navbarOpen]);

  return (
    <header>
      {navbarOpen && <MobileMenu closeMenu={setNavbarOpen} />}
      {isMainPage && (
        <>
          {" "}
          <div className="h-14" />
          <BetaModeHeader blueNav={blueNav} />
        </>
      )}
      <div
        className={
          isMainPage
            ? `${navColor} ${navSize} ${navbarTopDistance} ${
                hasBorder ? " lg:border-b-dark3" : "lg:border-b-dark1/90"
              }  overflow-hidden transition-all duration-300  flex justify-center items-center fixed left-0 right-0 z-10 lg:border-b`
            : `${navColor} ${navSize} ${
                hasBorder ? " lg:border-b-dark3" : " lg:border-b-dark1/90"
              } overflow-hidden transition-all duration-300  flex justify-center items-center	fixed top-0 left-0 right-0 z-10 lg:border-b`
        }
      >
        <div className="flex w-[100%] justify-center">
          <div className="flex items-center justify-between w-[100%] max-w-screen-xl lg:px-0 px-4">
            <ReusableHeaderLogo />
            <div className="flex items-center">
              <NavList />
              {/* <LanguageToggleButton /> */}
            </div>
            <MenuButton toggleNav={() => setNavbarOpen(true)} />
          </div>
        </div>
      </div>
    </header>
  );
};

const Header = () => {
  const pathName = usePathname();
  const isMainPage = pathName === "/en";
  return <MainPageHeader isMainPage={isMainPage} />;
};

export default Header;
