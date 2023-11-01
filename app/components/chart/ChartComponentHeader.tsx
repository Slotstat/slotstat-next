"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { slot } from "../../assets";
import FiatCryptoButton from "../table/FiatCryptoButton";
import useQueryParams from "@/app/utils/useQueryParams";
import { useTranslations } from "next-intl";

export default function ChartComponentHeader({
  gameObj,
  isGame,
}: {
  gameObj: GameData;
  isGame?: string;
}) {
  const t = useTranslations("table");
  const { setQueryParams } = useQueryParams();
  const [scrollY, setScrollY] = useState<number | null>(null);
  const [showSmallHeader, setShowSmallHeader] = useState<boolean>(false);
  const [headerSize, setHeaderSize] = useState<string>("h-24");

  const { casinoName, name, imageUrl, redirectUrl } = gameObj;

  const listenScrollEvent = () => {
    window.scrollY > 170 ? setShowSmallHeader(true) : setShowSmallHeader(false);
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
  }, [scrollY]);

  const buttons = () => (
    <div className="flex">
      <FiatCryptoButton
        title={"Game"}
        active={isGame === "true"}
        click={() => {
          setScrollY(window.scrollY);
          setQueryParams({ isGame: "true" });
        }}
        paddingY={"py-3"}
      />
      <FiatCryptoButton
        title={"Casino"}
        active={isGame === "false"}
        click={() => {
          setScrollY(window.scrollY);
          setQueryParams({ isGame: "false" });
        }}
        paddingY={"py-3"}
      />
      <a
        href={redirectUrl}
        target="_blank"
        className={
          "text-white bg-blue1 ml-6  items-center justify-center flex px-6 py-3 rounded-lg"
        }
      >
        {isGame === "true" ? <p>{t("play")}</p> : <p>{t("GoToCasino")}</p>}
      </a>
    </div>
  );

  return (
    <>
      <div
        className={`${
          showSmallHeader ? "flex" : "hidden"
        } transition-all duration-300 top-0  right-0 left-0 ${headerSize} w-full mt-15 flex-col justify-end fixed z-50`}
      >
        <div
          className={`transition-all duration-300 ${headerSize} w-full  flex items-center justify-center bg-dark1/90`}
        >
          <div className="w-[100%] max-w-screen-xl flex justify-between h-12 ">
            <h1 className="text-white text-3xl font-bold mb-4 leading-[48px] ">
              {casinoName} - {name}
            </h1>
            {buttons()}
          </div>
        </div>
      </div>
      <div
        className={`${
          showSmallHeader ? "hidden" : "flex"
        } absolute top-0 right-0 left-0 h-[328px]`}
      >
        <Image src={slot} alt="cover" className="h-[328px]" />
        <div className="absolute top-0 right-0 left-0 h-[328px] flex justify-center bg-dark1/90  ">
          <div className="w-[100%] max-w-screen-xl mt-[87px] px-4 pt-12 pb-6 lg:px-0">
            <h1 className="text-white text-3xl font-bold mb-4 leading-[48px]">
              {casinoName} - {name}
            </h1>
            <p className="text-grey1 mb-8 leading-6">
              We publish information about slot games, payout percentage, number
              of winning spins and jackpots... Read more
            </p>

            <div className=" flex items-center justify-between text-white  font-bold">
              <div className=" flex items-center">
                <a
                  href={redirectUrl}
                  target="_blank"
                  className=" flex items-center"
                >
                  <div className="relative h-12 w-12 rounded-full overflow-hidden mr-3">
                    <Image
                      src={imageUrl}
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
