"use client";
import DownIconBlue from "@/app/assets/svg/DownIconBlue";
import LinkIcon from "@/app/assets/svg/LinkIcon";
import {
  SmallChart1,
  SmallChart2,
  SmallChart3,
} from "@/app/assets/svg/SmallCharts";
import UpIconBlue from "@/app/assets/svg/UpIconBlue";
import Image from "next/image";
import React from "react";
import { Cell, Row } from "react-table";
import { useRouter } from "next/navigation";

import { Menu, MenuHandler, MenuList } from "../ThemeProviderClientSide";
import MoreIcon from "@/app/assets/svg/MoreIcon";

export default function RenderRowCells({
  row,
  cell,
  index,
  onRowPress,
}: {
  cell: Cell<GameData, any> | Cell<CasinoData, any>;
  row: Row<GameData> | Row<CasinoData>;
  index: number;
  onRowPress: () => void;
}) {
  const router = useRouter();

  const onGoToWebSiteClick = (event: { stopPropagation: () => void }) => {
    event.stopPropagation();
    window.open(row.original.redirectUrl, "_blank", "noreferrer");
  };

  const goToStatistics = (event: { stopPropagation: () => void }) => {
    event.stopPropagation();
    onRowPress();
  };

  const RenderGoTo = () => {
    return (
      <Menu>
        <MenuHandler>
          <button>
            <MoreIcon className="cursor-pointer" />
          </button>
        </MenuHandler>
        <MenuList className=" bg-dark2 border-dark3">
          <div
            onClick={goToStatistics}
            className=" text-white font-bold hover:bg-dark1 block w-full pt-[9px] pb-2 px-3 rounded-md text-start leading-tight cursor-pointer select-none transition-all hover:text-blue2  outline-none "
          >
            Go to statistic
          </div>
          <div
            onClick={onGoToWebSiteClick}
            className=" flex flex-row items-center justify-between text-white font-bold hover:bg-dark1 w-full pt-[9px] pb-2 px-3 rounded-md text-start leading-tight cursor-pointer select-none transition-all hover:text-blue2  outline-none "
          >
            Go to casino <LinkIcon className="ml-2" />
          </div>
        </MenuList>
      </Menu>
    );
  };

  const isImgUrl = (url: string) => {
    return /\.(jpg|jpeg|png|webp|avif|gif)$/.test(url);
  };
  const CasinoGameName = () => {
    const isCasino = !!row.original.casinoId;

    return (
      <Menu>
        <MenuHandler>
          <button>
            <div className="flex flex-row items-center">
              <div className="w-12 h-12 bg-dark2 flex justify-center items-center rounded-full mr-3">
                <div className=" relative w-6 h-6">
                  {!!isImgUrl(row.original.imageUrl) && (
                    <Image
                      src={row.original.imageUrl}
                      alt={row.original.name}
                      fill
                      sizes="(max-width: 24px) 100vw,
                (max-width: 24px) 50vw,
              33vw"
                    />
                  )}
                </div>
              </div>

              <h3 className="text-white font-bold ">{cell.render("Cell")}</h3>
              <LinkIcon className=" ml-2" />
            </div>
          </button>
        </MenuHandler>
        <MenuList className=" bg-dark2 border-dark3">
          <div
            onClick={goToStatistics}
            className=" text-white font-bold hover:bg-dark1 block w-full pt-[9px] pb-2 px-3 rounded-md text-start leading-tight cursor-pointer select-none transition-all hover:text-blue2  outline-none "
          >
            Go to statistic
          </div>
          <div
            onClick={onGoToWebSiteClick}
            className=" flex flex-row items-center justify-between text-white font-bold hover:bg-dark1 w-full pt-[9px] pb-2 px-3 rounded-md text-start leading-tight cursor-pointer select-none transition-all hover:text-blue2  outline-none "
          >
            Go to {isCasino ? "Casino" : "Game"} <LinkIcon className="ml-2" />
          </div>
        </MenuList>
      </Menu>
    );
  };

  const generateSmallCharts = () => {
    const randomize = (myArray: JSX.Element[]) => {
      return myArray[Math.floor(Math.random() * myArray.length)];
    };
    const chartsComponentsArray = [
      <SmallChart1 key={1} />,
      <SmallChart2 key={2} />,
      <SmallChart3 key={3} />,
    ];
    return (
      <div className="flex flex-row justify-between">
        {randomize(chartsComponentsArray)}
        <RenderGoTo />
      </div>
    );
  };

  const renderEmptyValue = () =>
    cell.value ? <>{cell.render("Cell")}</> : <>--</>;

  const showUpOrDownIcon = (indicator: number) => {
    if (indicator === 1) {
      return <UpIconBlue className=" mr-2" />;
    } else if (indicator === -1) {
      return <DownIconBlue className=" mr-2" />;
    } else {
      return;
    }
  };

  if (index === 0) {
    return <CasinoGameName />;
  } else if (index === 3) {
    return (
      <div className="flex flex-row items-center">
        {showUpOrDownIcon(row.original.t1H)}
        {cell.render("Cell")}%
      </div>
    );
  } else if (index === 4) {
    return (
      <div className="flex flex-row items-center">
        {showUpOrDownIcon(row.original.t24h)}
        {cell.render("Cell")}%
      </div>
    );
  } else if (index === 6) {
    return (
      <div className=" text-green1">
        {row.original.jackpotCurrency}{" "}
        {cell.value ? row.original.jackpot.toFixed(2) : renderEmptyValue()}
      </div>
    );
  } else if (index === 7) {
    return generateSmallCharts();
  } else {
    return renderEmptyValue();
  }
}
