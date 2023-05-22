"use client";

import { BottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";

import Image from "next/image";
import Table from "./table/Table";
import { back, close } from "../assets";
import { useEffect, useState } from "react";
import { Spinner } from "@material-tailwind/react";
import getGamesList from "@/lib/getGamesList";
import getCasinos from "@/lib/getCasinos";

type BottomSheetModalProps = {
  open: boolean;
  setOpen: (trueFalse: boolean) => void;
  onAddToCompare: (gameId: GameData) => void;
  casinoColumnHeaders: CasinoCols[];
  gameColumnHeaders: CasinoCols[];
};

export default function BottomSheetModal({
  open,
  setOpen,
  onAddToCompare,
  casinoColumnHeaders,
  gameColumnHeaders,
}: BottomSheetModalProps) {
  const [casinos, setCasinos] = useState<CasinoData[]>();
  const [casino, setCasino] = useState<GetGamesFromChosenCasinoProps>();
  const [games, setGames] = useState<gamesList>();

  const getGamesFromChosenCasino = async (
    casino: GetGamesFromChosenCasinoProps
  ) => {
    const gamesListData: Promise<gamesList> = getGamesList(casino.casinoId, {});
    const games = await gamesListData;
    setGames(games);
    setCasino(casino);
  };

  const getAllCasinos = async () => {
    const casinosData: Promise<CasinoData[]> = getCasinos({
      //   orderBy,
      //   keyWord,
      //   direction,
    });
    const casinos = await casinosData;
    setCasinos(casinos);
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
      }}
    >
      <div className="bg-dark1 py-8 px-4 flex justify-center">
        <div className=" w-[100%] max-w-screen-xl">
          <div className="flex items-center justify-between">
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
            {casino ? (
              <span className=" text-2xl leading-4  text-white">
                Choose Game from {casino.name}
              </span>
            ) : (
              <span className=" text-2xl leading-4  text-white">
                Choose Casino
              </span>
            )}

            <button
              className="flex items-center justify-center rounded-xl bg-dark2 p-2 hover:bg-dark3"
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

          <div className="py-8">
            {casinos && !games ? (
              <Table
                //   orderBy={orderBy || ""}
                //   keyWord={keyWord || ""}
                columns={casinoColumnHeaders}
                tableBodyData={casinos}
                showFilter={false}
                getGamesFromChosenCasino={getGamesFromChosenCasino}
              />
            ) : games ? (
              <Table
                columns={gameColumnHeaders}
                tableBodyData={games.results}
                showFilter={false}
                onAddToCompare={onAddToCompare}
              />
            ) : (
              <div className="flex items-center justify-center">
                <Spinner className="h-12 w-12" color="pink" />
              </div>
            )}
          </div>
        </div>
      </div>
    </BottomSheet>
  );
}
