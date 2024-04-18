"use client";
import React, { useEffect, useState } from "react";
import Table from "./Table";
import getGameListClientSide from "@/lib/clientSide/getGameListClientSide";
import { useQueryState } from "nuqs";
import { useGamesListStore } from "@/app/(store)/store";

export default function TableClientSide({
  showFilter = false,
  onAddToCompare,
  setSearchKeyInBottomSheet,
  setOrderByKeyInBottomSheet,
  showCryptoFiatSwitcher,
  setIsFiatState,
  gameId,
  orderByBottomsheet,
  keyWordBottomsheet,
  directionBottomsheet,
  isFiatBottomsheet,
}: TableWrapperProps) {
  const { gamesList, setGames, handleRecall, setHandleRecall } =
    useGamesListStore();
  const [scrollY, setScrollY] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [firstPageIds, setFirstPageIds] = useState<string>("");
  const [keyWord] = useQueryState("keyWord");
  const [orderBy] = useQueryState("orderBy");
  const [direction] = useQueryState("direction");
  const [isFiat] = useQueryState("isFiat");
  const [hasComponentMounted, setHasComponentMounted] = useState(false);
  const getGames = async (page?: string) => {
    setLoading(true);
    const checkedKeyword = keyWord || keyWordBottomsheet;
    const checkedOrderBy = orderBy || orderByBottomsheet;

    const gamesListData: Promise<gamesList> = getGameListClientSide({
      orderBy: checkedOrderBy,
      keyWord: checkedKeyword,
      page,
      isFiat,
      ids: checkedKeyword || checkedOrderBy ? "" : firstPageIds,
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

    if (checkedOrderBy === "spsH") {
      const filteredGames = games.results.filter((item) => item.sps > 0);

      games.results = filteredGames;
    }
    if (checkedOrderBy === "spsL") {
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
    if (hasComponentMounted) {
      const fetchData = () => {
        getGames();
      };

      fetchData();
    } else {
      setHasComponentMounted(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    keyWord,
    orderBy,
    direction,
    isFiat,
    orderByBottomsheet,
    keyWordBottomsheet,
    directionBottomsheet,
    isFiatBottomsheet,
  ]);

  useEffect(() => {
    if (!handleRecall) {
      setHandleRecall(true);
      getGames();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const persistentScroll = scrollY;
    if (persistentScroll === null) return;

    window.scrollTo({ top: Number(scrollY) });
  }, [scrollY]);

  return (
    <>
      <Table
        showFilter={showFilter}
        showCryptoFiatSwitcher={showCryptoFiatSwitcher}
        setIsFiatState={setIsFiatState}
        gamesList={gamesList}
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
