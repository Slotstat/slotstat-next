"use client";
import { useCallback, useEffect, useState } from "react";
import { live } from "../assets";
import Image from "next/image";
import LinkIcon from "../assets/svg/LinkIcon";
import TooltipComponent from "./TooltipComponent";
import useStore from "@/app/(store)/store";
import _ from "lodash";
import CountUp from "react-countup";

type PagesAndStyleDiff = {
  landing?: boolean;
  casino?: boolean;
  game?: boolean;
};
type StatCardProp = Card & PagesAndStyleDiff;

const AnimatedCounterComponent = ({
  value,
  style,
  additionalProps,
}: {
  value: string;
  style: string;
  additionalProps: string[];
}) => {
  const [start, setStart] = useState(0);
  useEffect(() => {}, [value]);

  return (
    <CountUp
      start={start}
      end={Number(value)}
      duration={2.75}
      separator=" "
      decimals={additionalProps ? 2 : 0}
      decimal="."
      prefix={additionalProps ? `${additionalProps[0]}  ` : " "}
      onEnd={() => {
        setStart(Number(value));

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
}: StatCardProp) => {
  const isImgUrl = (url: string) => {
    return /\.(jpg|jpeg|png|webp|avif|gif)$/.test(url);
  };

  const renderNameColor = () => {
    if (casino || game) return "text-grey1";

    return "text-white";
  };

  const renderValueColor = () => {
    if (valueType === "Jackpot") return "text-green1";
    if (casino || game) return "text-white";

    return "text-blue1";
  };

  return (
    <div className="flex flex-col justify-between rounded-2xl bg-dark2 p-4 lg:p-6  grow ">
      <div className="flex items-center justify-between">
        <div>
          {!!isImgUrl(imageUrl) && (
            <Image
              src={imageUrl}
              alt=""
              className="h-4 w-4 lg:h-6 lg:w-6 "
              width={24}
              height={24}
            />
          )}
        </div>
        {isLive && (
          <Image
            src={live}
            alt=""
            className="ml-3"
            width="0"
            height="0"
            sizes="100vw"
          />
        )}
      </div>
      <div className="mt-4 flex items-center justify-between">
        <span
          className={`whitespace-nowrap text-sm leading-5 flex flex-row  lg:text-base ${renderNameColor()}`}
        >
          <span className=" mr-1">{name}:</span>
          {isLive ? (
            <AnimatedCounterComponent
              additionalProps={additionalProps}
              value={value}
              style={renderValueColor()}
            />
          ) : (
            <span className={renderValueColor()}>{value}</span>
          )}
          {redirectUrl && (
            <LinkIcon
              onClick={() => window.open(redirectUrl, "_blank", "noreferrer")}
              className=" ml-2 cursor-pointer"
            />
          )}
        </span>
        {additionalInfo && (
          <>
            <TooltipComponent text={additionalInfo} />
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
    // if we are on a casino page and we have new jackpot data from this casino,  we Update Casino Cards Data.
    if (newJackpot?.casinoId === casinoId && casinoId !== undefined && casino) {
      getUpdatedCasinoCardsData();
    }
    // if we are on a Game page and we have new jackpot data from this game owner casino,  we Update game Cards Data.
    if (newJackpot?.casinoId === casinoId && casinoId !== undefined && game) {
      getUpdatedGameCardsData();
    }
  }, [
    casino,
    casinoId,
    getUpdatedCasinoCardsData,
    getUpdatedGameCardsData,
    newJackpot,
    game,
  ]);

  return (
    <div className="my-4 px-4 lg:my-6">
      <div className=" grid lg:gap-4 lg:grid-cols-4 sm:gap-2 sm:grid-cols-2 ">
        {cardsDataState &&
          cardsDataState.map((card, i) => (
            <StatCard key={i} {...card} casino={casino} game={game} />
          ))}
      </div>
    </div>
  );
};

export default LiveCards;
