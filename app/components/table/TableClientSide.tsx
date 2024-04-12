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
        //   todo
        // isFiat: isFiatState,
        // direction,
      });

      const games = await gamesListData;
      if (gameId) {
        const removeIndex = games.results
          .map((item) => item.gameId)
          .indexOf(gameId);
        ~removeIndex && games.results.splice(removeIndex, 1);
      }

      setGames(games);
      setLoading(false);
    },
    [keyWord, orderBy, gameId]
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
