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
    // currencyCode,
    // fixedRtp,
    // isCrypto,
    // dataSource,
    // gameId,
    // p1h,
    // p24h,
    // s24h,
    // type,
  } = row.original;

  const onGoToWebSiteClick = (event: { stopPropagation: () => void }) => {
    event.stopPropagation();
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
            className=" text-white font-bold truncate max-w-[160px] text-xs md:text-base"
          >
            {cell.render("Cell")} {provider}
          </p>
          <p className="text-grey1 text-base">{provider}</p>
        </div>
      </div>
    );
  };

  const CasinoBonus = () => {
    return (
      <div className="text-base">
        <p>{casinoName}</p>
        <p className="text-grey1 text-base truncate max-w-[206px]">{bounties}</p>
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
        }  w-32 items-center justify-center flex py-2 rounded-lg `}
      >
        <p>{t("play")}</p>
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

  switch (index) {
    case 0:
      return <GameNameProvider />;
    case 1:
      return <CasinoBonus />;
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
    case 4:
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
    case 5:
      return name !== "All Games" && rtp ? (
        <RTPListing rtp={rtp} provider={provider} />
      ) : (
        <>--</>
      );
    case 6:
      return <Play />;
    default:
      return renderEmptyValue();
  }
}
