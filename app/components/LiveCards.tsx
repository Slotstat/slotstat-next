/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useState } from "react";
import { currency, eyes, joystick, linkIcon, live, satellite, slotIcon } from "../assets";
import Image from "next/image";
import TooltipComponent from "./TooltipComponent";
import useStore from "@/app/(store)/store";
import _ from "lodash";
import CountUp from "react-countup";
import { getLandingCardsClientSide } from "@/lib/clientSide/getLAndingClient";
import { useCallback, useEffect } from "react";

type PagesAndStyleDiff = {
  landing?: boolean;
  casino?: boolean;
  game?: boolean;
  casinoId?: string;
};
type StatCardProp = Card & PagesAndStyleDiff;

const AnimatedCounterComponent = ({
  value,
  style,
  additionalProps,
  casinoId,
}: {
  value: string;
  style: string;
  additionalProps: string[];
  casinoId?: string;
}) => {
  const { newJackpot } = useStore();
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(Number(value));

  const increaseJackpot = () => {
    if (
      newJackpot?.casinoId &&
      newJackpot?.ccy &&
      newJackpot?.casinoId + newJackpot?.ccy === casinoId &&
      end !== Number(newJackpot.amount)
    ) {
      setEnd(Number(newJackpot.amount));
    } else {
      Number(value) !== 0 && setEnd(end + 0.2);
    }
  };

  return (
    <CountUp
      start={start}
      end={end}
      duration={2}
      separator=" "
      decimals={2}
      decimal="."
      prefix={`${additionalProps[0]}  `}
      onEnd={() => {
        setStart(Number(end));
        increaseJackpot();
      }}
      delay={0}
    >
      {({ countUpRef }) => (
        <div>
          <span className={style} ref={countUpRef} />
        </div>
      )}
    </CountUp>
  );
};

const StatCard = ({
  imageUrl,
  name,
  value,
  isLive,
  additionalInfo,
  casino,
  game,
  redirectUrl,
  additionalProps,
  valueType,
  casinoId,
}: StatCardProp) => {
  // const isImgUrl = (url: string) => {
  //   return /\.(jpg|jpeg|png|webp|avif|gif)$/.test(url);
  // };

  const renderNameColor = () => {
    if (casino || game) return "text-grey1";

    return "text-white";
  };

  const renderValueColor = () => {
    if (valueType === "Jackpot") return "text-green1";
    if (casino || game) return "text-white";

    return "text-blue1";
  };

  const getImageToRender = (name: string) => {
    switch (name) {
      case "Casino":
        return slotIcon;
      case "Provider":
        return satellite;
      case "Game" || "Slots":
        return joystick;
      case "User":
        return eyes;
      case "Currency":
        return currency;
      default:
        return imageUrl;
    }
  };

  return (
    <div
      className={`flex flex-col justify-between rounded-2xl bg-dark2 p-4 lg:p-6 md:w-full grow max-sm:p-3 max-sm:h-[68px] ${
        redirectUrl && "hover:bg-dark3 cursor-pointer"
      } `}
      onClick={() => redirectUrl && window.open(redirectUrl, "_blank", "noreferrer")}
    >
      <div className="flex items-center justify-between">
        <div>
          {!!getImageToRender(name) && (
            <Image
              // unoptimized
              src={getImageToRender(name)}
              alt=""
              className="h-4 w-4 lg:h-6 lg:w-6 "
              width={24}
              height={24}
            />
          )}
        </div>
        {isLive && <Image src={live} alt="" className="ml-3" width="0" height="0" sizes="100vw" />}
      </div>
      <div className="mt-4 flex items-center justify-between max-sm:mt-[12px]">
        <span
          className={`whitespace-nowrap text-xs flex flex-row  md:text-base text-grey1 items-center`}
        >
          <span className="max-sm:text-[10px] max-sm:leading-[16px] mr-3 max-sm:mr-[4px] cursor-default">
            {name}:
          </span>
          {isLive && additionalProps ? (
            <AnimatedCounterComponent
              additionalProps={additionalProps}
              value={value}
              style={renderValueColor()}
              casinoId={casinoId}
            />
          ) : (
            <span
              className={`text-white cursor-default truncate max-w-[100px] lg:max-w-[140px] font-bold max-sm:text-[10px] max-sm:leading-[16px]`}
              title={value}
            >
              {value}
            </span>
          )}
          {redirectUrl && (
            <img
              src={linkIcon.src}
              alt="link"
              className="ml-2 cursor-pointer max-sm:ml-[2px] max-sm:w-[16px]"
            />
            // <LinkIcon
            //   onClick={() => window.open(redirectUrl, "_blank", "noreferrer")}
            //   className=" ml-2 cursor-pointer max-sm:ml-[2px]"
            // />
          )}
        </span>
        {additionalInfo && (
          <>
            <TooltipComponent big text={additionalInfo} classN="max-sm:w-[16px] max-sm:h-[16px]" />
          </>
        )}
      </div>
    </div>
  );
};

const LiveCards = ({
  casino = false,
  game = false,
  cardsData,
  casinoId,
  casinoCardsData,
  gamesCardsData,
}: {
  cardsData: Array<Card>;
  rows?: number;
  casinoId?: string;
  casinoCardsData?: Promise<Card[]>;
  gamesCardsData?: Promise<Card[]>;
} & PagesAndStyleDiff) => {
  const { newJackpot } = useStore();
  const [cardsDataState, setCardsDataState] = useState(cardsData);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getUpdatedLandingCardsData = useCallback(
    _.debounce(async () => {
      const landingCardsData = await getLandingCardsClientSide();
      if (landingCardsData) {
        setCardsDataState(landingCardsData);
      }
    }, 1000),
    []
  );

  const getUpdatedCasinoCardsData = useCallback(
    _.debounce(async () => {
      if (casinoCardsData) {
        const updatedCasinoCardsData = await casinoCardsData;
        setCardsDataState(updatedCasinoCardsData);
      }
    }, 2000),
    []
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getUpdatedGameCardsData = useCallback(
    _.debounce(async () => {
      if (gamesCardsData) {
        const updatedGamesCardsData = await gamesCardsData;
        setCardsDataState(updatedGamesCardsData);
      }
    }, 2000),
    []
  );

  useEffect(() => {
    // Determine which update function to call based on props
    if (casino) {
      if (newJackpot?.casinoId === casinoId && casinoId !== undefined) {
        getUpdatedCasinoCardsData();
      }
    } else if (game) {
      if (newJackpot?.casinoId === casinoId && casinoId !== undefined) {
        getUpdatedGameCardsData();
      }
    } else {
      // Landing page: always try to fetch fresh data (for location customization)
      getUpdatedLandingCardsData();
    }
  }, [casino, game, casinoId, newJackpot]);

  return (
    <div className="my-3 md:my-4 overflow-x-scroll whitespace-nowrap lg:my-6 md:overflow-auto md:whitespace-normal no-scroll">
      <div className="slot_page_card_container grid grid-cols-4 w-[250%] md:w-full gap-3 md:gap-6">
        {cardsDataState &&
          cardsDataState.map((card, i) => (
            <StatCard key={i} {...card} casinoId={casinoId} casino={casino} game={game} />
          ))}
      </div>
    </div>
  );
};

export default LiveCards;
