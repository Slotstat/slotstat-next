import { BottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";

import Image from "next/image";
import Table from "./table/Table";
import { back, close } from "../assets";
import { useCallback, useEffect, useState } from "react";
import getGameListClientSide from "@/lib/clientSide/getGameListClientSide";
import getCasinosClientSide from "@/lib/clientSide/getCasinosClientSide";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useTranslations } from "next-intl";
import _ from "lodash";

type BottomSheetModalProps = {
  open: boolean;
  setOpen: (trueFalse: boolean) => void;
  onAddToCompare: (gameId: GameData) => void;
  gameId: string;
  isAllGames: boolean;
};

export default function BottomSheetModal({
  open,
  setOpen,
  onAddToCompare,
  gameId,
  isAllGames,
}: BottomSheetModalProps) {
  const t = useTranslations("bottomSheetModal");

  const [casinos, setCasinos] = useState<CasinoData[]>();
  const [casino, setCasino] = useState<GetGamesFromChosenCasinoProps>();
  const [games, setGames] = useState<gamesList>();
  const [loading, setLoading] = useState(false);
  const [keyWord, setKeyWord] = useState<string>("");
  const [orderBy, setOrderBy] = useState<string>("");

  const getGamesFromChosenCasino = async (
    casino: GetGamesFromChosenCasinoProps
  ) => {
    !keyWord && setLoading(true);

    const gamesListData: Promise<gamesList> = getGameListClientSide(
      casino.casinoId,
      {
        orderBy,
        keyWord,
        // direction,
      }
    );
    const games = await gamesListData;
    const removeIndex = games.results
      .map((item) => item.gameId)
      .indexOf(gameId);
    ~removeIndex && games.results.splice(removeIndex, 1);

    if (isAllGames) {
      games.results.splice(1);
    } else {
      games.results.shift();
    }

    setGames(games);
    setCasino(casino);
    setLoading(false);
  };

  const getAllCasinos = async () => {
    !keyWord && setLoading(true);
    const casinosData: Promise<CasinoData[]> = getCasinosClientSide({
      orderBy,
      keyWord: keyWord,
      // direction,
    });
    const casinos = await casinosData;
    var removeIndex = casinos.map((item) => item.casinoId).indexOf(gameId);
    ~removeIndex && casinos.splice(removeIndex, 1);

    setCasinos(casinos);
    setLoading(false);
  };

  const onAddToCompareAndClearBottomSheet = (GameData: GameData) => {
    onAddToCompare(GameData);
    setGames(undefined);
    setCasino(undefined);
  };

  const setSearchKeyInBottomSheet = useCallback(
    _.debounce((key) => {
      setKeyWord(key);
    }, 500),
    []
  );

  useEffect(() => {
    if (games && casino) {
      getGamesFromChosenCasino(casino);
    } else {
      getAllCasinos();
    }
  }, [keyWord, orderBy]);

  return (
    <BottomSheet
      blocking={false}
      snapPoints={({ minHeight, maxHeight }) => [minHeight, maxHeight / 0.6]}
      open={open}
      onDismiss={() => {
        setOpen(false);
        setCasino(undefined);
        setGames(undefined);
      }}
    >
      <div className="bg-dark1 py-8 px-4 flex justify-center  ">
        <div className=" w-[100%] max-w-screen-xl">
          <div className="flex items-center justify-between">
            {games ? (
              <button
                className="flex items-center justify-center rounded-xl bg-dark2 p-2 hover:bg-dark3"
                onClick={() => {
                  setGames(undefined);
                  setCasino(undefined);
                }}
              >
                <Image
                  src={back}
                  alt=""
                  className="h-6 w-6"
                  width={24}
                  height={24}
                />
              </button>
            ) : (
              <div></div>
            )}
            {casino ? (
              <span className=" text-2xl leading-4  text-white">
                {t("choose-game-from")} {casino.name}
              </span>
            ) : (
              <span className=" text-2xl leading-4  text-white">
                {t("choose-casino")}
              </span>
            )}

            <button
              className="flex items-center justify-center rounded-xl bg-dark2 p-2 hover:bg-dark3"
              onClick={() => {
                setOpen(false);
                setCasino(undefined);
                setGames(undefined);
              }}
            >
              <Image
                src={close}
                alt=""
                className="h-6 w-6"
                width={24}
                height={24}
              />
            </button>
          </div>

          <div className="py-8">
            {casinos && !games && !loading ? (
              <Table
                keyWord={keyWord}
                orderBy={orderBy}
                // direction={direction}
                tableBodyData={casinos}
                showFilter={true}
                getGamesFromChosenCasino={getGamesFromChosenCasino}
                isGame={false}
                setSearchKeyInBottomSheet={setSearchKeyInBottomSheet}
                setOrderByKeyInBottomSheet={(order) =>
                  order && setOrderBy(order)
                }
              />
            ) : games && !loading ? (
              <Table
                keyWord={keyWord}
                orderBy={orderBy}
                // direction={direction}
                isGame={true}
                tableBodyData={games.results}
                showFilter={true}
                onAddToCompare={onAddToCompareAndClearBottomSheet}
                setSearchKeyInBottomSheet={setSearchKeyInBottomSheet}
                setOrderByKeyInBottomSheet={(order) =>
                  order && setOrderBy(order)
                }
              />
            ) : (
              <SkeletonTheme baseColor="#24262C" highlightColor="#444">
                <section>
                  <Skeleton count={1} className="h-20 mb-5" />
                  <Skeleton count={1} className="h-20 mb-5" />
                  <Skeleton count={1} className="h-20 mb-5" />
                </section>
              </SkeletonTheme>
            )}
          </div>
        </div>
      </div>
    </BottomSheet>
  );
}
