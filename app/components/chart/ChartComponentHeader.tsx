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

  const { casinoName, name, imageUrl, redirectUrl } = gameObj;

  useEffect(() => {
    const persistentScroll = scrollY;
    if (persistentScroll === null) return;

    window.scrollTo({ top: Number(scrollY) });
  }, [scrollY]);
  return (
    <>
      <Image
        src={slot}
        alt="cover"
        className="absolute top-0 right-0 left-0 h-[352px] "
      />

      <div className="absolute top-0 right-0 left-0 h-[352px] flex justify-center backdrop-blur-sm bg-dark2/90  ">
        <div className="w-[100%] max-w-screen-xl mt-[87px] px-4 py-12 lg:px-0">
          <h1 className="text-white text-3xl font-bold mb-4">
            {casinoName} - {name}
          </h1>
          <p className="text-grey1 mb-8">
            We publish information about slot games, payout percentage, number
            of winning spins and jackpots... Read more
          </p>

          <div className=" flex items-center justify-between text-white text-sm font-bold">
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
            <div className=" flex ">
              <FiatCryptoButton
                title={"game"}
                active={isGame === "true"}
                click={() => {
                  setScrollY(window.scrollY);
                  setQueryParams({ isGame: "true" });
                  // if (setIsFiatState) {
                  //   setIsFiatState("false");
                  // }
                }}
              />
              <FiatCryptoButton
                title={"casino"}
                active={isGame === "false"}
                click={() => {
                  setScrollY(window.scrollY);
                  setQueryParams({ isGame: "false" });
                  // if (setIsFiatState) {
                  //   setIsFiatState("false");
                  // }
                }}
              />
              <a
                href={redirectUrl}
                target="_blank"
                className={
                  "text-white bg-blue1 ml-6  items-center justify-center flex px-6 py-2 rounded-md"
                }
              >
                <p>{t("play")}</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
