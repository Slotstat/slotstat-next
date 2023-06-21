/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import { live } from "../assets";
import { breakpoints } from "../utils";
import Image from "next/image";
import LinkIcon from "../assets/svg/LinkIcon";
import TooltipComponent from "./TooltipComponent";
import useStore from "@/app/(store)/store";
import getCasinoCards from "@/lib/getCasinoCards";
import _ from "lodash";
import getGameCards from "@/lib/getGameCards";

type PagesAndStyleDiff = {
  landing?: boolean;
  casino?: boolean;
  game?: boolean;
};
type StatCardProp = Card & PagesAndStyleDiff;

const AnimatedCounterComponent = ({
  value,
  style,
}: {
  value: string;
  style: string;
}) => {
  const [test, setTest] = useState(0);
  useEffect(() => {
    const counter = (minimum: any, maximum: number) => {
      for (let count = minimum; count <= maximum; count++) {
        setTimeout(() => {
          setTest(count);
        }, 1000);
      }
    };
    counter(test, Number(value));
  }, [value]);
  return <div className={style}>{test}</div>;
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
}: StatCardProp) => {
  const isImgUrl = (url: string) => {
    return /\.(jpg|jpeg|png|webp|avif|gif)$/.test(url);
  };

  const renderNameColor = () => {
    if (casino || game) return "text-grey1";

    return "text-white";
  };

  const renderValueColor = () => {
    if (game && name.toLocaleLowerCase() === "jackpot") return "text-green1";
    if (casino || game) return "text-white";

    return "text-blue1";
  };

  return (
    <div className="flex flex-col rounded-2xl bg-dark2 p-4 lg:p-6">
      <div className="flex items-center justify-between">
        {!!isImgUrl(imageUrl) && (
          <Image
            src={imageUrl}
            alt=""
            className="h-4 w-4 lg:h-6 lg:w-6 "
            width={24}
            height={24}
          />
        )}
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
          <TooltipComponent
            text={additionalInfo + "Information about casino gift offers"}
          />
        )}
      </div>
    </div>
  );
};

const to2d = (arr: Card[], size = 2): Card[][] => {
  const reshaped = [];
  const copy = [...arr];
  while (copy.length) {
    reshaped.push(copy.splice(0, size));
  }
  return reshaped;
};

const LiveCards = ({
  casino = false,
  game = false,
  cardsData,
  rows = 1,
  casinoId,
  gameId,
}: {
  cardsData: Array<Card>;
  rows?: number;
  casinoId?: string;
  gameId?: string;
} & PagesAndStyleDiff) => {
  const { isOn, newJackpot } = useStore();
  const [cardsDataState, setCardsDataState] = useState(cardsData);

  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slides: { perView: 1.8, spacing: 16 },
    breakpoints: {
      [breakpoints.sm]: { slides: { perView: 2, spacing: 16 } },
      [breakpoints.md]: { slides: { perView: 3, spacing: 24 } },
      [breakpoints.xl]: { slides: { perView: 4, spacing: 24 } },
    },
  });

  const data = useMemo(
    () => to2d(cardsDataState, rows),
    [cardsDataState, rows]
  );

  const getUpdatedCasinoCardsData = useCallback(
    _.debounce(async () => {
      if (casinoId) {
        const casinoCardsData: Promise<Card[]> = getCasinoCards(casinoId);
        const updatedCasinoCardsData = await casinoCardsData;
        console.log("casino newJackpot from casino page", newJackpot);

        setCardsDataState(updatedCasinoCardsData);
      }
    }, 2000),
    []
  );

  const getUpdatedGameCardsData = useCallback(
    _.debounce(async () => {
      if (gameId) {
        const gamesCardsData: Promise<Card[]> = getGameCards(gameId);

        const updatedGamesCardsData = await gamesCardsData;
        console.log("games newJackpot from games page", newJackpot);

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
    isOn,
    newJackpot,
    game,
  ]);

  return (
    <div className="my-4 px-4 lg:my-6">
      <div ref={sliderRef} className="keen-slider zoom-out">
        {data.map((stats, i) => (
          <div
            key={i}
            className="keen-slider__slide zoom-out__slide space-y-4 md:space-y-6"
          >
            {stats.map((stat, index) => (
              <StatCard key={index} {...stat} casino={casino} game={game} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveCards;
