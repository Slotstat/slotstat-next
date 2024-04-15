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
  const [firstPageIds, setFirstPageIds] = useState<string>("");
  const [keyWord] = useQueryState("keyWord");
  const [orderBy] = useQueryState("orderBy");
  const [direction] = useQueryState("direction");
  const [isFiat] = useQueryState("isFiat");

  const getGames = async (page?: string) => {
    !keyWord && setLoading(true);

    const gamesListData: Promise<gamesList> = getGameListClientSide({
      orderBy,
      keyWord: !!keyWord ? keyWord : undefined,
      page,
      isFiat,
      ids: orderBy || keyWord ? "" : firstPageIds,
      // direction,
    });

    let games = await gamesListData;

    // saves first page games ids in a state
    if (games.currentPage === 1 && firstPageIds === "") {
      let firstPageGameIds: string = "";
      games.results.map(
        (game) => (firstPageGameIds = firstPageGameIds + `&ids=${game.gameId}`)
      );
      setFirstPageIds(firstPageGameIds);
    }

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
  };

  useEffect(() => {
    getGames();
    const persistentScroll = scrollY;
    if (persistentScroll === null) return;

    window.scrollTo({ top: Number(scrollY) });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyWord, orderBy, direction, isFiat, scrollY]);

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
