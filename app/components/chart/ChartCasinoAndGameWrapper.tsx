"use client";
import React, { useCallback, useEffect, useState } from "react";
import ChartComponentHeader from "./ChartComponentHeader";
import LiveCards from "../LiveCards";
import ChartComponent from "./ChartComponent";
import { useQueryState } from "nuqs";
import getSingleGameClientSide from "@/lib/clientSide/getSingleGameClientSide";
import BonusCards from "./BonusCards";
import LoadingSkeleton from "../LoadingSkeleton";
import { client } from "@/lib/sanity";
// import { getDataByTitle } from "@/lib/sanity/sanityRequests";
// import Breadcrumbs from "@/app/components/Breadcrumbs";

async function getDataByTitle(category: string, title: string) {
  const query = `
      *[_type == "${category}" && slug.current == 'lucky-streak-x'] {
        title,
        content,
        titleImage,
        smallDescription,
        "currentSlug": slug.current,
        }[0]`;

  const data = await client.fetch(query);

  return data;
}

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
  const [blogArticle, setBlogArticle] = useState();

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

  const getArticleFromSanity = async () => {
    let article;
    if (screen === "slot") {
      const gameName = mainGameObj.name;
      article = await getDataByTitle("slots", gameName);
    } else if (screen === "casino") {
      const casinoName = mainGameObj.casinoName;
      article = await getDataByTitle("casinos", casinoName);
    }
    console.log("article", article);
    setBlogArticle(article);
  };

  useEffect(() => {
    getCompareCasino();
  }, [compareGameIdQuery, getCompareCasino]);

  useEffect(() => {
    getArticleFromSanity();
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
          {/* {mainGameObj.additionalInfo && (
            <div className="text-white text-2xl font-bold mb-3 lg:mt-12">
              info
            </div>
          )} */}
          {/* <div className="text-grey1 text-base mb-8 lg:mb-18">
            <div
              dangerouslySetInnerHTML={{
                __html: mainGameObj.additionalInfo,
              }}
            />
          </div> */}
          <div className="h-6 w-40 bg-red"></div>
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
