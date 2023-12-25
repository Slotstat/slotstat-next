import { BottomSheet } from "react-spring-bottom-sheet";
// import "react-spring-bottom-sheet/dist/style.css";

import Image from "next/image";
import Table from "./table/Table";
import { close } from "../assets";
import { memo, useCallback, useEffect, useState } from "react";
import getGameListClientSide from "@/lib/clientSide/getGameListClientSide";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useTranslations } from "next-intl";
import _ from "lodash";

type BottomSheetModalProps = {
  open: boolean;
  setOpen: (trueFalse: boolean) => void;
  onAddToCompare: (gameData: GameData) => void;
  gameId: string;
  isFiat?: string;
};

const BottomSheetModal = ({
  open,
  setOpen,
  onAddToCompare,
  gameId,
  isFiat,
}: BottomSheetModalProps) => {
  const t = useTranslations("bottomSheetModal");

  const [games, setGames] = useState<gamesList>();
  const [loading, setLoading] = useState(false);
  const [keyWord, setKeyWord] = useState<string>("");
  const [orderBy, setOrderBy] = useState<string>("");
  const [isFiatState, setIsFiatState] = useState<string>(isFiat || "false");

  const getGames = async () => {
    !keyWord && setLoading(true);

    const gamesListData: Promise<gamesList> = getGameListClientSide({
      orderBy,
      keyWord,
      isFiat: isFiatState,
      // direction,
    });

    const games = await gamesListData;
    const removeIndex = games.results
      .map((item) => item.gameId)
      .indexOf(gameId);
    ~removeIndex && games.results.splice(removeIndex, 1);

    setGames(games);
    setLoading(false);
  };

  const onAddToCompareAndClearBottomSheet = (GameData: GameData) => {
    onAddToCompare(GameData);
    // setGames(undefined);
    // setLoading(false);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const setSearchKeyInBottomSheet = useCallback(
    _.debounce((key) => {
      setKeyWord(key);
    }, 500),
    []
  );

  useEffect(() => {
    getGames();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyWord, orderBy, isFiatState]);

  return (
    <BottomSheet
      blocking={false}
      snapPoints={({ minHeight, maxHeight }) => [minHeight, maxHeight - 87]}
      open={open}
      onDismiss={() => {
        setOpen(false);
        setGames(undefined);
      }}
      onSpringStart={(event) => {
        if (event.type === "SNAP" && event.source === "dragging") {
        }
      }}
    >
      <div className="bg-dark1 py-8 flex justify-center  ">
        <div className=" w-[100%] max-w-screen-xl lg:px-0 px-4">
          <div className="fixed z-10 bg-dark1 flex top-0 h-20 items-center justify-between w-[100%] max-w-screen-xl pr-4 lg:px-0 ">
            <span className=" text-2xl leading-4  text-white">
              {t("select-game-to-compare")}
            </span>

            <button
              className="flex items-center justify-center rounded-xl bg-dark2 p-2 hover:bg-dark3 mx-4 lg:mx-0 "
              onClick={() => {
                setOpen(false);
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

          <div className="py-4 lg:py-8">
            {games && !loading ? (
              <Table
                keyWord={keyWord}
                orderBy={orderBy}
                // direction={direction}
                tableBodyData={games.results}
                showFilter={true}
                onAddToCompare={onAddToCompareAndClearBottomSheet}
                setSearchKeyInBottomSheet={setSearchKeyInBottomSheet}
                setOrderByKeyInBottomSheet={(order) =>
                  order && setOrderBy(order)
                }
                isFiat={isFiatState}
                setIsFiatState={(isFiatState) => setIsFiatState(isFiatState)}
                showCryptoFiatSwitcher={true}
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
};

const arePropsEqual = (prevProps: any, nextProps: any) => {
  // Add your custom logic here to compare the props.
  // Return true if you want to skip re-render, or false if re-render is needed.

  // For example, if you want to skip re-render when the "count" prop doesn't change:

  return prevProps.open === nextProps.open;
};
export default memo(BottomSheetModal, arePropsEqual);
