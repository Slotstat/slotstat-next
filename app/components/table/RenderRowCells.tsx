import DownIconBlue from "@/app/assets/svg/DownIconBlue";
import LinkIcon from "@/app/assets/svg/LinkIcon";
import {
  SmallChart1,
  SmallChart2,
  SmallChart3,
} from "@/app/assets/svg/SmallCharts";
import UpIconBlue from "@/app/assets/svg/UpIconBlue";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import { Cell, Row } from "react-table";
import MenuComponent from "../MenuComponent";

// import MoreIcon from "@/app/assets/svg/MoreIcon";
import MinusBlue from "@/app/assets/svg/MinusBlue";
import CountUp from "react-countup";
import { useTranslations } from "next-intl";
import useStore from "@/app/(store)/store";
import RTPListing from "./RTPListing";

const CountUpForJackpots = ({
  jackpot,
  jackpotCurrency,
  casinoCurrency,
  casinoId,
}: any) => {
  const { newJackpot } = useStore();
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(Number(jackpot));

  const increaseJackpot = () => {
    setStart(Number(end));

    if (jackpot !== 0) {
      if (
        newJackpot?.casinoId &&
        newJackpot?.ccy &&
        newJackpot?.casinoId + newJackpot?.ccy === casinoId &&
        end !== Number(newJackpot.amount)
      ) {
        setEnd(Number(newJackpot.amount));
      } else {
        setEnd(end + 0.2);
      }
    }
  };

  useEffect(() => {
    console.log("object", jackpot);
    setEnd(Number(jackpot));

    return () => {
      setStart(0);
      setEnd(0);
    };
  }, [jackpot]);

  return (
    <div className=" text-green1">
      {end === 0 ? (
        <div>
          {jackpotCurrency
            ? jackpotCurrency + " "
            : casinoCurrency
            ? casinoCurrency + " "
            : ""}
          {end}
        </div>
      ) : (
        <CountUp
          start={start}
          end={end}
          duration={2}
          separator=" "
          decimals={2}
          decimal="."
          prefix={
            jackpotCurrency
              ? jackpotCurrency + " "
              : casinoCurrency
              ? casinoCurrency + " "
              : ""
          }
          onEnd={() => {
            jackpot !== 0 && increaseJackpot();
          }}
          delay={0}
        >
          {({ countUpRef }) => (
            <div>
              <span ref={countUpRef} />
            </div>
          )}
        </CountUp>
      )}
    </div>
  );
};

export default function RenderRowCells({
  row,
  cell,
  index,
  onRowPress,
  isGame,
}: {
  cell: Cell<GameData, any> | Cell<CasinoData, any>;
  row: Row<GameData> | Row<CasinoData>;
  index: number;
  onRowPress: () => void;
  isGame: boolean;
}) {
  const t = useTranslations("table");

  const {
    redirectUrl,
    imageUrl,
    name,
    t1H,
    t24h,
    jackpot,
    jackpotCurrency,
    casinoCurrency,
    casinoId,
    provider,
    rtp,
  } = row.original;

  const onGoToWebSiteClick = (event: { stopPropagation: () => void }) => {
    event.stopPropagation();
    window.open(redirectUrl, "_blank", "noreferrer");
  };

  const goToStatistics = (event: { stopPropagation: () => void }) => {
    event.stopPropagation();
    onRowPress();
  };

  const GoToStatistic = (
    <div
      onClick={goToStatistics}
      className=" text-white text-xs font-bold hover:bg-dark1 block w-full pt-[9px] pb-2 px-3 rounded-md text-start leading-tight cursor-pointer select-none transition-all hover:text-blue2  outline-none "
    >
      {t("GoToStatistic")}
    </div>
  );
  const goToCasino = (
    <div
      onClick={onGoToWebSiteClick}
      className="text-xs  flex flex-row items-center justify-between text-white font-bold hover:bg-dark1 w-full pt-[9px] pb-2 px-3 rounded-md text-start leading-tight cursor-pointer select-none transition-all hover:text-blue2  outline-none "
    >
      {isGame ? t("GoToGame") : t("GoToCasino")} <LinkIcon className="ml-2" />
    </div>
  );

  // const RenderGoTo = () => {
  //   return (
  //     <MenuComponent
  //       listItems={[GoToStatistic, goToCasino]}
  //       className="-right-18"
  //     >
  //       <MoreIcon className="cursor-pointer" />
  //     </MenuComponent>
  //   );
  // };

  const isImgUrl = (url: string) => {
    return /\.(jpg|jpeg|png|webp|avif|gif)$/.test(url);
  };

  const CasinoGameName = () => {
    return (
      <MenuComponent listItems={[GoToStatistic, goToCasino]}>
        <div className="flex flex-row items-center">
          <div className="h-6 w-6 md:w-12 md:h-12 bg-dark2 flex justify-center items-center rounded-full mr-3 overflow-hidden">
            <div className="relative h-6 w-6 md:w-12 md:h-12 ">
              {!!isImgUrl(imageUrl) && (
                <Image
                  src={imageUrl}
                  alt={name}
                  fill
                  sizes="(max-width: 24px) 100vw,
                (max-width: 24px) 50vw,
              33vw"
                />
              )}
            </div>
          </div>

          <p
            title={name}
            className=" text-white font-bold truncate max-w-[110px] text-xs md:text-base"
          >
            {cell.render("Cell")}
          </p>
          <LinkIcon className="ml-2" />
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
      return <UpIconBlue className="mr-2" />;
    } else if (indicator === -1) {
      return <DownIconBlue className="mr-2" />;
    } else {
      return <MinusBlue className=" " />;
    }
  };

  if (isGame) {
    switch (index) {
      case 0:
        return <CasinoGameName />;
      case 2:
        return (
          <div className="flex flex-row items-center">
            {showUpOrDownIcon(t1H)}
            {cell.render("Cell")}%
          </div>
        );
      case 3:
        return (
          <div className="flex flex-row items-center">
            {showUpOrDownIcon(t24h)}
            {cell.render("Cell")}%
          </div>
        );
      case 5:
        return (
          <CountUpForJackpots
            jackpot={jackpot}
            jackpotCurrency={jackpotCurrency}
            casinoCurrency={casinoCurrency}
            casinoId={casinoId}
          />
        );
      case 6:
        return name !== "All Games" && rtp ? (
          <RTPListing rtp={rtp} provider={provider} />
        ) : (
          <>--</>
        );
      default:
        return renderEmptyValue();
    }
  } else {
    switch (index) {
      case 0:
        return <CasinoGameName />;
      case 3:
        return (
          <div className="flex flex-row items-center">
            {showUpOrDownIcon(t1H)}
            {cell.render("Cell")}%
          </div>
        );
      case 4:
        return (
          <div className="flex flex-row items-center">
            {showUpOrDownIcon(t24h)}
            {cell.render("Cell")}%
          </div>
        );
      case 6:
        // console.log("test", jackpot, jackpotCurrency, casinoCurrency, casinoId);

        return (
          <CountUpForJackpots
            jackpot={jackpot}
            jackpotCurrency={jackpotCurrency}
            casinoCurrency={casinoCurrency}
            casinoId={casinoId}
          />
        );
      case 7:
        return generateSmallCharts();
      default:
        return renderEmptyValue();
    }
  }
}
