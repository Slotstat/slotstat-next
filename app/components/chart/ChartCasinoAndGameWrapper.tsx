"use client";
import React, { useCallback, useEffect, useState } from "react";
import ChartComponentHeader from "./ChartComponentHeader";
import LiveCards from "../LiveCards";
import ChartComponent from "./ChartComponent";
import { useQueryState } from "nuqs";
import getSingleGameClientSide from "@/lib/clientSide/getSingleGameClientSide";
import BonusCards from "./BonusCards";
import LoadingSkeleton from "../LoadingSkeleton";
// import Breadcrumbs from "@/app/components/Breadcrumbs";

export default function ChartCasinoAndGameWrapper({
  orderBy,
  keyWord,
  direction,
  isFiat,
  ActiveTab,
  casinoCards,
  casino,
  gameCards,
  gameId,
  mainGameObj,
  compareGameId,
  compareGame,
  gamesCardsData,
  casId,
  casinoCardsData,
  casinoBonuses,
}: {
  orderBy?: string | null;
  keyWord?: string | null;
  direction?: string | null;
  isFiat?: string | null;
  ActiveTab: string;
  casinoCards: Card[];
  casino: CasinoData;
  gameCards: Card[];
  gameId: string;
  mainGameObj: GameData;
  compareGameId?: string;
  compareGame?: GameData;
  gamesCardsData?: Promise<Card[]>;
  casId: string;
  casinoCardsData: Promise<Card[]>;
  casinoBonuses: any;
}) {

  const [compareGameIdQuery, setCompareGameIdQuery] =
    useQueryState("compareGameId");

  const [screen, setScreen] = useState("slot");
  const [compareGameClient, setCompareGame] = useState<GameData | undefined>(
    undefined
  );

  const changeScreen = (GameScreenState: string) => {
    setScreen(GameScreenState);
  };
  const getCompareCasino = useCallback(async () => {
    if (compareGameIdQuery) {
      const compareGameData: Promise<GameData> =
        getSingleGameClientSide(compareGameIdQuery);
      const compareGame = await compareGameData;
      setCompareGame(compareGame);
    }
  }, [compareGameIdQuery]);

  useEffect(() => {
    getCompareCasino();
  }, [compareGameIdQuery, getCompareCasino]);

  useEffect(() => {
    setScreen(ActiveTab);
  }, [ActiveTab]);

  return casino && casinoCards && casinoBonuses ? (
    <>
      {/* <Breadcrumbs breadcrumbs={breadcrumbs} /> */}
      {screen === "slot" ? (
        <>
          {mainGameObj && (
            <ChartComponent
              gameId={gameId}
              compareGameId={compareGameIdQuery || undefined}
              mainGame={mainGameObj}
              compareGame={compareGameClient || compareGame}
              isFiat={isFiat || "false"}
            />
          )}
          {gamesCardsData && gameCards && (
            <LiveCards
              cardsData={gameCards}
              rows={2}
              game={true}
              gamesCardsData={gamesCardsData}
            />
          )}
          {mainGameObj.additionalInfo && (
            <div className="text-white text-2xl font-bold mb-3 lg:mt-12">
              info
            </div>
          )}
          <div className="text-grey1 text-base mb-8 lg:mb-18">
            <div
              dangerouslySetInnerHTML={{
                __html: mainGameObj.additionalInfo,
              }}
            />
          </div>
        </>
      ) : screen === "casino" ? (
        <div className=" mt-48 md:mt-72">
          {!!casinoCards && casId && (
            <LiveCards
              cardsData={casinoCards}
              rows={2}
              casino={true}
              casinoId={casId}
              casinoCardsData={casinoCardsData}
            />
          )}
          {casino.additionalInfo && (
            <div className="text-white text-2xl font-bold mb-3 lg:mt-12">
              info
            </div>
          )}
          <div className="text-grey1 text-xs md:text-base mb-8 lg:mb-18">
            <div dangerouslySetInnerHTML={{ __html: casino.additionalInfo }} />
          </div>
        </div>
      ) : (
        <div className="mt-48 md:mt-72">
          {casino.additionalInfo && (
            <div className="text-white text-2xl font-bold mb-3 lg:mt-12">
              Unlock Exclusive Casino Bonuses and Promotions
            </div>
          )}
          <div className="text-grey1 text-xs md:text-base mb-8 lg:mb-12 ">
            Activate bonuses and promotions by clicking either the 'Get Bonus'
            or 'Read More' button on the corresponding card. Explore exclusive
            rewards and enhance your gaming journey now!
            {/* <div dangerouslySetInnerHTML={{ __html: casino.additionalInfo }} /> */}
          </div>
          <BonusCards cardsData={casinoBonuses} />
        </div>
      )}
      <ChartComponentHeader
        changeScreen={changeScreen}
        screen={screen}
        gameObj={mainGameObj}
        ActiveTab={ActiveTab}
        casinoURL={casino.redirectUrl}
      />
    </>
  ) : (
    <div className=" h-80" />
  );
}
