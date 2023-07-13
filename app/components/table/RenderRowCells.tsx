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
import MenuComponent from "../MenuComponent";

import MoreIcon from "@/app/assets/svg/MoreIcon";
import MinusBlue from "@/app/assets/svg/MinusBlue";
import CountUp from "react-countup";

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
  const onGoToWebSiteClick = (event: { stopPropagation: () => void }) => {
    event.stopPropagation();
    window.open(row.original.redirectUrl, "_blank", "noreferrer");
  };

  const goToStatistics = (event: { stopPropagation: () => void }) => {
    event.stopPropagation();
    onRowPress();
  };

  const GoToStatistic = (
    <div
      onClick={goToStatistics}
      className=" text-white font-bold hover:bg-dark1 block w-full pt-[9px] pb-2 px-3 rounded-md text-start leading-tight cursor-pointer select-none transition-all hover:text-blue2  outline-none "
    >
      Go to statistic
    </div>
  );
  const goToCasino = (
    <div
      onClick={onGoToWebSiteClick}
      className=" flex flex-row items-center justify-between text-white font-bold hover:bg-dark1 w-full pt-[9px] pb-2 px-3 rounded-md text-start leading-tight cursor-pointer select-none transition-all hover:text-blue2  outline-none "
    >
      Go to casino <LinkIcon className="ml-2" />
    </div>
  );
  const RenderGoTo = () => {
    return (
      <MenuComponent
        listItems={[GoToStatistic, goToCasino]}
        className="-right-18"
      >
        <MoreIcon className="cursor-pointer" />
      </MenuComponent>
    );
  };

  const isImgUrl = (url: string) => {
    return /\.(jpg|jpeg|png|webp|avif|gif)$/.test(url);
  };
  const CasinoGameName = () => {
    const isCasino = !!row.original.casinoId;

    return (
      <MenuComponent listItems={[GoToStatistic, goToCasino]}>
        <div className="flex flex-row items-center">
          <div className="w-12 h-12 bg-dark2 flex justify-center items-center rounded-full mr-3 overflow-hidden">
            <div className=" relative w-12 h-12 ">
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
      </MenuComponent>
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
        {/* <RenderGoTo /> */}
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
      return <MinusBlue className=" " />;
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
        <CountUp
          start={0}
          end={Number(row.original.jackpot)}
          duration={1.5}
          separator=" "
          decimals={2}
          decimal="."
          prefix={row.original.jackpotCurrency || ""}
          // suffix=" left"
          // onEnd={}
          delay={0}
        >
          {({ countUpRef }) => (
            <div>
              <span ref={countUpRef} />
            </div>
          )}
        </CountUp>
      </div>
    );
  } else if (index === 7) {
    return generateSmallCharts();
  } else {
    return renderEmptyValue();
  }
}
