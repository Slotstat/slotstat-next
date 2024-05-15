import Image from "next/image";
import React, { useEffect, useState } from "react";
import { slot } from "../../assets";
import FiatCryptoButton from "../table/FiatCryptoButton";
// import useQueryParams from "@/app/utils/useQueryParams";
import { useTranslations } from "next-intl";
import { useQueryState } from "nuqs";

export default function ChartComponentHeader({
  gameObj,
  ActiveTab,
  casinoURL,
  changeScreen,
  screen,
}: {
  screen: string;
  changeScreen: (GameScreenState: string) => void;
  gameObj: GameData;
  ActiveTab?: string;
  casinoURL: string;
}) {
  const [_, setIsGameQuery] = useQueryState("ActiveTab");
  const t = useTranslations("table");

  const [scrollY, setScrollY] = useState<number | null>(null);
  const [showSmallHeader, setShowSmallHeader] = useState<boolean>(false);
  const [headerSize, setHeaderSize] = useState<string>("h-24");

  const { casinoName, name, imageUrl, casinoImageUrl, redirectUrl } = gameObj;

  const listenScrollEvent = () => {
    window.scrollY > 247 ? setShowSmallHeader(true) : setShowSmallHeader(false);
    window.scrollY > 220 ? setHeaderSize("h-16") : setHeaderSize("h-24");
  };

  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);

    listenScrollEvent();
    return () => {
      window.removeEventListener("scroll", listenScrollEvent);
    };
  }, []);

  useEffect(() => {
    const persistentScroll = scrollY;
    if (persistentScroll === null) return;

    window.scrollTo({ top: Number(scrollY) });
  }, [scrollY, ActiveTab]);

  const buttons = () => (
    <div className="flex w-full justify-between md:w-auto">
      {/* {!showSmallHeader && ( */}
      <div>
        <FiatCryptoButton
          title={"Slot"}
          active={screen === "slot"}
          click={() => {
            setScrollY(window.scrollY);
            changeScreen("slot");
            setIsGameQuery("slot");
          }}
          className={"py-2 text-xs md:ml-3 md:py-3 md:text-base"}
        />
        <FiatCryptoButton
          title={"Casino"}
          active={screen === "casino"}
          click={() => {
            setScrollY(window.scrollY);
            changeScreen("casino");
            setIsGameQuery("casino");
          }}
          className={"py-2 text-xs ml-3 md:py-3 md:text-base"}
        />
        <FiatCryptoButton
          title={"Bonus"}
          active={screen === "bonus"}
          click={() => {
            setScrollY(window.scrollY);
            changeScreen("bonus");
            setIsGameQuery("bonus");
          }}
          className={"py-2 text-xs ml-3 md:py-3 md:text-base"}
        />
      </div>
      {/* )} */}
      <a
        href={redirectUrl}
        target="_blank"
        rel="nofollow"
        className="h-10 text-white bg-blue1 hover:bg-blue4 ml-6 items-center
         justify-center flex px-6 py-2 rounded-lg text-xs md:text-base md:py-3 md:h-12"
      >
        <p>{t("play")}</p>
      </a>
    </div>
  );

  return (
    <>
      <div
        className={`${
          showSmallHeader ? " hidden md:flex" : "hidden"
        } transition-all duration-300 top-0  right-0 left-0 ${headerSize} w-full  flex-col justify-end fixed z-[2] `}
      >
        <div
          className={`transition-all duration-300 ${headerSize} w-full  flex items-center justify-center bg-dark1/90 px-4 md:px-0`}
        >
          <div className="w-[100%] max-w-screen-xl flex font-bold justify-between h-12">
            <h1 className="text-white text-3xl mb-4 h-[48px]  hidden md:flex">
              {casinoName} - {name}
            </h1>
            {buttons()}
          </div>
        </div>
      </div>
      <div
        className={`${
          showSmallHeader ? "flex md:hidden" : "flex"
        } absolute top-0 right-0 left-0 h-60 md:h-[328px]`}
      >
        <Image src={slot} alt="cover" className="h-60 md:h-[328px]" />
        <div className="absolute top-0 right-0 left-0 h-60 md:h-[328px] flex justify-center bg-dark1/90">
          <div className="w-[100%] max-w-screen-xl mt-[63px] px-4 pt-0 pb-2 md:pb-6 md:pt-12 md:px-0">
            <h1 className="text-white md:h-[48px] text-xl font-bold mb-2 md:mb-4 md:text-3xl ">
              {casinoName} - {name}
            </h1>
            <p className="text-grey1 mb-3 leading-6 text-xs md:mb-8  md:text-base">
              Explore comprehensive statistics for the slot game, along with
              details about the hosting casino and its bonuses and promotions.
              Everything you need to make informed gaming decisions is right
              here on this page.
            </p>
            {/* <div onClick={() => setGameScreen("false")}>dsfcswfdvcwe</div> */}

            <div className="flex items-center justify-between text-white  font-bold">
              <div className="hidden md:flex items-center">
                <a
                  href={casinoURL}
                  target="_blank"
                  rel="nofollow"
                  className=" flex items-center"
                >
                  <div className="relative h-12 w-12 rounded-full overflow-hidden mr-3">
                    <Image
                      src={casinoImageUrl}
                      alt={casinoName}
                      fill
                      className="h-12 w-12"
                      sizes="(max-width: 24px) 100vw,
                (max-width: 24px) 50vw,
                33vw"
                    />
                  </div>
                  <p>{casinoName}</p>
                </a>
                <a
                  href={redirectUrl}
                  target="_blank"
                  rel="nofollow"
                  className=" flex items-center"
                >
                  <div className="relative h-12 w-12 rounded-full overflow-hidden mr-3 ml-6">
                    <Image
                      src={imageUrl}
                      alt={name}
                      fill
                      sizes="(max-width: 24px) 100vw,
                (max-width: 24px) 50vw,
                33vw"
                    />
                  </div>
                  <p>{name}</p>
                </a>
              </div>
              {buttons()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
