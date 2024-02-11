"use client";
import React, { useEffect, useState } from "react";
import ChartComponentHeader from "./ChartComponentHeader";
import LiveCards from "../LiveCards";
import ChartComponent from "./ChartComponent";
// import Breadcrumbs from "@/app/components/Breadcrumbs";

export default function ChartCasinoAndGameWrapper({
  orderBy,
  keyWord,
  direction,
  isFiat,
  isGame,
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
}: any) {
  const [gameScreen, setGameScreen] = useState("true");

  const changeScreen = (GameScreenState: string) => {
    setGameScreen(GameScreenState);
  };
  useEffect(() => {
    console.log('3333');
    setGameScreen(isGame);
  }, [isGame]);

  return (
    <>
      {/* <Breadcrumbs breadcrumbs={breadcrumbs} /> */}
      {gameScreen === "true" ? (
        <>
          {mainGameObj && (
            <ChartComponent
              gameId={gameId}
              mainGame={mainGameObj}
              compareGame={compareGame}
              isFiat={isFiat || "false"}
              compareGameId={compareGameId}
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
      ) : (
        <div className="mt-72">
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
          <div className="text-grey1 text-base mb-8 lg:mb-18">
            <div dangerouslySetInnerHTML={{ __html: casino.additionalInfo }} />
          </div>
        </div>
      )}
      <ChartComponentHeader
        changeScreen={changeScreen}
        gameScreen={gameScreen}
        gameObj={mainGameObj}
        isGame={isGame}
        casinoURL={casino.redirectUrl}
      />
    </>
  );
}
