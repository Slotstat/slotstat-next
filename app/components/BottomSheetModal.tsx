import { BottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";

import Image from "next/image";
import Table from "./table/Table";
import { back, close } from "../assets";
import { useEffect, useState } from "react";
import getGameListClientSide from "@/lib/clientSide/getGameListClientSide";
import getCasinosClientSide from "@/lib/clientSide/getCasinosClientSide";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useTranslations } from "next-intl";

type BottomSheetModalProps = {
  open: boolean;
  setOpen: (trueFalse: boolean) => void;
  onAddToCompare: (gameId: GameData) => void;
};

export default function BottomSheetModal({
  open,
  setOpen,
  onAddToCompare,
}: BottomSheetModalProps) {
  const t = useTranslations("bottomSheetModal");

  const [casinos, setCasinos] = useState<CasinoData[]>();
  const [casino, setCasino] = useState<GetGamesFromChosenCasinoProps>();
  const [games, setGames] = useState<gamesList>();
  const [loading, setLoading] = useState(false);

  const getGamesFromChosenCasino = async (
    casino: GetGamesFromChosenCasinoProps
  ) => {
    setLoading(true);

    const gamesListData: Promise<gamesList> = getGameListClientSide(
      casino.casinoId,
      {}
    );
    const games = await gamesListData;
    setGames(games);
    setCasino(casino);
    setLoading(false);
  };

  const getAllCasinos = async () => {
    setLoading(true);
    const casinosData: Promise<CasinoData[]> = getCasinosClientSide({
      //   orderBy,
      //   keyWord,
      //   direction,
    });
    const casinos = await casinosData;
    setCasinos(casinos);
    setLoading(false);
  };

  const onAddToCompareAndClearBottomSheet = (GameData: GameData) => {
    onAddToCompare(GameData);
    setGames(undefined);
    setCasino(undefined);
  };

  useEffect(() => {
    getAllCasinos();
  }, []);

  return (
    <BottomSheet
      snapPoints={({ minHeight, maxHeight }) => [minHeight, maxHeight / 0.6]}
      open={open}
      onDismiss={() => {
        setOpen(false);
        setCasino(undefined);
        setGames(undefined);
      }}
    >
      <div className="bg-dark1 py-8 px-4 flex justify-center">
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
                //   orderBy={orderBy || ""}
                //   keyWord={keyWord || ""}
                tableBodyData={casinos}
                showFilter={false}
                getGamesFromChosenCasino={getGamesFromChosenCasino}
                isGame={false}
              />
            ) : games && !loading ? (
              <Table
                isGame={true}
                tableBodyData={games.results}
                showFilter={false}
                onAddToCompare={onAddToCompareAndClearBottomSheet}
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
