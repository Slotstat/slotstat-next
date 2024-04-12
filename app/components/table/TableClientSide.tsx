"use client";
import React, { useCallback, useEffect, useState } from "react";
import Table from "./Table";
import getGameListClientSide from "@/lib/clientSide/getGameListClientSide";
import { useQueryState } from "nuqs";

export default function TableClientSide({
  showFilter = false,
  onAddToCompare,
  setSearchKeyInBottomSheet,
  setOrderByKeyInBottomSheet,
  showCryptoFiatSwitcher,
  setIsFiatState,
  gameId,
}: TableWrapperProps) {
  const [scrollY, setScrollY] = useState<number | null>(null);
  const [games, setGames] = useState<gamesList>();
  const [loading, setLoading] = useState(false);
  const [keyWord] = useQueryState("keyWord");
  const [orderBy] = useQueryState("orderBy");
  const [direction] = useQueryState("direction");
  const [isFiat] = useQueryState("isFiat");

  const getGames = useCallback(
    async (page?: string) => {
      !keyWord && setLoading(true);
      const gamesListData: Promise<gamesList> = getGameListClientSide({
        orderBy,
        keyWord: !!keyWord ? keyWord : undefined,
        page,
        isFiat,
        // direction,
      });

      let games = await gamesListData;

      const test = [
        { sps: 2, te: "r" },
        { sps: -2, te: "r" },
        { sps: 4, te: "r" },
        { sps: 0, te: "r" },
      ];

      if (orderBy === "spsH") {
        const filteredGames = games.results.filter((item) => item.sps > 0);
        games.results = filteredGames;
      }
      if (orderBy === "spsL") {
        const filteredGames = games.results.filter((item) => item.sps < 0);
        games.results = filteredGames;
      }

      if (gameId) {
        const removeIndex = games.results
          .map((item) => item.gameId)
          .indexOf(gameId);
        ~removeIndex && games.results.splice(removeIndex, 1);
      }

      setGames(games);
      setLoading(false);
    },
    [keyWord, orderBy, gameId, isFiat]
  );

  useEffect(() => {
    getGames();
    const persistentScroll = scrollY;
    if (persistentScroll === null) return;

    window.scrollTo({ top: Number(scrollY) });
  }, [keyWord, orderBy, direction, isFiat, scrollY, getGames]);

  return (
    <>
      <Table
        keyWord={!!keyWord ? keyWord : undefined}
        orderBy={orderBy}
        direction={direction}
        showFilter={showFilter}
        isFiat={isFiat || "false"}
        showCryptoFiatSwitcher={showCryptoFiatSwitcher}
        setIsFiatState={setIsFiatState}
        gamesList={games}
        setScrollY={setScrollY}
        getGames={getGames}
        onAddToCompare={onAddToCompare}
        setSearchKeyInBottomSheet={setSearchKeyInBottomSheet}
        setOrderByKeyInBottomSheet={setOrderByKeyInBottomSheet}
        loading={loading}
      />
    </>
  );
}
