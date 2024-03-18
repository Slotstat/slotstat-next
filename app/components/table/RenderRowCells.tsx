import DownIconBlue from "@/app/assets/svg/DownIconBlue";
import UpIconBlue from "@/app/assets/svg/UpIconBlue";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Cell, Row } from "react-table";
import MinusBlue from "@/app/assets/svg/MinusBlue";
import CountUp from "react-countup";
import { useTranslations } from "next-intl";
import useStore from "@/app/(store)/store";
import RTPListing from "./RTPListing";
import { Verified } from "@/app/assets/svg/Verified";
import SPS from "./SPS";

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
    setEnd(Number(jackpot));

    return () => {
      setStart(0);
      setEnd(0);
    };
  }, [jackpot]);

  return (
    <div className=" text-green1 text-xs md:text-base ">
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
}: {
  cell: Cell<GameData, any>;
  row: Row<GameData>;
  index: number;
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
    casinoName,
    bounties,
    jackpotInfo,
    // currencyCode,
    // fixedRtp,
    // isCrypto,
    // dataSource,
    // gameId,
    // p1h,
    // p24h,
    // s24h,
    // type,
    verificationStatus,
  } = row.original;

  const onGoToWebSiteClick = (event: {
    defaultPrevented: any;
    preventDefault: () => void;
  }) => {
    if (event.defaultPrevented) return;
    event.preventDefault();
    window.open(redirectUrl, "_blank", "noreferrer");
  };

  const isImgUrl = (url: string) => {
    return /\.(jpg|jpeg|png|webp|avif|gif)$/.test(url);
  };

  const GameNameProvider = () => {
    return (
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
        <div>
          <p
            title={name}
            className=" text-white font-bold truncate max-w-[124px]  text-xs md:max-w-[160px] md:text-base"
          >
            {cell.render("Cell")}
          </p>
          <p className="text-grey1   truncate max-w-[124px] text-xs md:text-base md:max-w-[160px]">
            {provider}
          </p>
        </div>
      </div>
    );
  };

  const CasinoBonus = () => {
    return (
      <div className="text-xs truncate md:text-base max-w-[124px] md:max-w-[206px]">
        <div className=" flex flex-row">
          <p className="mr-1">{casinoName}</p>
          {verificationStatus == 1 && <Verified />}
        </div>
        <p className="text-grey1 truncate  text-xs max-w-[124px] md:max-w-[206px] md:text-base">
          {bounties}
        </p>
      </div>
    );
  };

  const Play = () => {
    const [isHovered, setIsHovered] = useState(false);
    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
    };
    return (
      <div
        onClick={onGoToWebSiteClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`${
          isHovered ? "text-white bg-blue1" : "text-grey1 bg-grey3"
        }  w-32 items-center justify-center flex py-2 rounded-lg  text-xs md:text-base `}
      >
        <p>{t("play")}</p>
      </div>
    );
  };

  const renderEmptyValue = () =>
    cell.value ? <>{cell.render("Cell")}</> : <>--</>;

  const showUpOrDownIcon = (
    indicator: number,
    Cell:
      | string
      | number
      | boolean
      | React.ReactElement<any, string | React.JSXElementConstructor<any>>
      | Iterable<React.ReactNode>
      | React.PromiseLikeOfReactNode
      | null
      | undefined
  ) => {
    if (indicator === 1) {
      return (
        <div className="flex flex-row items-center text-xs md:text-base text-green1 ">
          <UpIconBlue className="mr-1 md:mr-2" />
          {Cell}%
        </div>
      );
    } else if (indicator === -1) {
      return (
        <div className="flex flex-row items-center text-xs md:text-base text-red">
          <DownIconBlue className="mr-1 md:mr-2" />
          {Cell}%
        </div>
      );
    } else {
      return (
        <div className="flex flex-row items-center text-xs md:text-base ">
          <MinusBlue className="mr-1 md:mr-2" />
          {Cell}%
        </div>
      );
    }
  };

  switch (index) {
    case 0:
      return <GameNameProvider />;
    case 1:
      return <CasinoBonus />;
    case 2:
      return <>{showUpOrDownIcon(t1H, cell.render("Cell"))}</>;
    case 3:
      return <>{showUpOrDownIcon(t24h, cell.render("Cell"))}</>;
    case 4:
      if (jackpotInfo) {
        return (
          <div
            className={`text-xs text-grey1  md:text-base ${
              // @ts-ignore
              jackpotInfo != "No jackpot" && "text-white"
            }`}
          >
            {jackpotInfo}
          </div>
        );
      } else {
        return jackpot === 0 ? (
          renderEmptyValue()
        ) : (
          <CountUpForJackpots
            jackpot={jackpot}
            jackpotCurrency={jackpotCurrency}
            casinoCurrency={casinoCurrency}
            casinoId={casinoId}
          />
        );
      }

    case 5:
      return name !== "All Games" && rtp ? <RTPListing rtp={rtp} /> : <>--</>;
    case 6:
      return rtp ? <SPS rtp={rtp} /> : <>--</>;
    default:
      return renderEmptyValue();
  }
}
