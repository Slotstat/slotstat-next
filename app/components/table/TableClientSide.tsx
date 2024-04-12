"use client";
import React, { useCallback, useEffect, useState } from "react";
import Table from "./Table";
import getGameListClientSide from "@/lib/clientSide/getGameListClientSide";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function TableClientSide({
  showFilter = false,
  onAddToCompare,
  orderBy,
  keyWord,
  direction,
  isFiat,
  getGamesFromChosenCasino,
  setSearchKeyInBottomSheet,
  setOrderByKeyInBottomSheet,
  showCryptoFiatSwitcher,
  setIsFiatState,
}: TableWrapperProps) {
  const [lastPage, setLastPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(1);
  const [rowCount, setRowCount] = useState(1);
  const [scrollY, setScrollY] = useState<number | null>(null);
  const [games, setGames] = useState<gamesList>();
  const [loading, setLoading] = useState(false);

  const getGames = useCallback(
    async (page?: string) => {
      !keyWord && setLoading(true);
      const gamesListData: Promise<gamesList> = getGameListClientSide({
        orderBy,
        keyWord,
        page,
        //   todo
        // isFiat: isFiatState,
        // direction,
      });

      const games = await gamesListData;
      setGames(games);
      setLoading(false);
    },
    [keyWord, orderBy]
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
        keyWord={keyWord}
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
        getGamesFromChosenCasino={getGamesFromChosenCasino}
        setSearchKeyInBottomSheet={setSearchKeyInBottomSheet}
        setOrderByKeyInBottomSheet={setOrderByKeyInBottomSheet}
        loading={loading}
      />
    </>
  );
}
