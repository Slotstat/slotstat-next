"use client";
import { useMemo } from "react";
import ReactPaginate from "react-paginate";
import {
  Row,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { back } from "../../assets";
import Dropdown from "./Dropdown";
import { SearchInput } from "./SearchInput";
import Image from "next/image";
import RenderRowCells from "./RenderRowCells";
import useQueryParams from "@/app/utils/useQueryParams";
import _ from "lodash";
// import { Ascending, Descending } from "@/app/assets/svg/AscDesc";
import TooltipComponent from "../TooltipComponent";
import { useTranslations } from "next-intl";
import { casinoOrGameColumns } from "./columns";

import { usePathname } from "next-intl/client";
import FiatCryptoButton from "./FiatCryptoButton";
import Link from "next/link";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import TableIn from "./TableIn";

const Table = ({
  gamesList,
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
  setScrollY,
  getGames,
  loading,
}: TableProps) => {
  const f = useTranslations();
  const { setQueryParams } = useQueryParams();

  const pathName = usePathname();

  const bottomSheetRowClick = (row: Row<GameData>) => {
    if (onAddToCompare) {
      return onAddToCompare(row.original);
    } else if (getGamesFromChosenCasino && row.original.casinoId) {
      return getGamesFromChosenCasino({
        casinoId: row.original.casinoId,
        name: row.original.name,
      });
    } else if (row.original.type === "AllGames") {
      const segments = pathName.split("/");
      let PathNameForAllGames: string;
      if (segments.length === 3) {
        PathNameForAllGames = segments[1];
        setQueryParams({ type: row.original.type }, `${PathNameForAllGames}`);
      } else {
        PathNameForAllGames = pathName;
        setQueryParams(
          { type: row.original.type },
          `${PathNameForAllGames}/${row.original.casinoId}`
        );
      }
    }
  };

  return (
    <>
      <div className="my-8 flex flex-col items-center justify-between space-y-6 md:flex-row md:space-y-0 lg:my-6">
        {showFilter && (
          <>
            <div className="flex w-full md:w-auto">
              <SearchInput
                keyWord={keyWord || ""}
                setCasinoFilter={(keyWord) => {
                  setScrollY(window.scrollY);
                  if (setSearchKeyInBottomSheet) {
                    setSearchKeyInBottomSheet(keyWord);
                  } else {
                    setQueryParams({ keyWord });
                  }
                }}
              />
            </div>
            <div className="flex w-full  justify-between">
              {showCryptoFiatSwitcher && (
                <div className="flex flex-row">
                  <FiatCryptoButton
                    title={f("cryptoCasinos")}
                    active={isFiat === "false"}
                    click={() => {
                      setScrollY(window.scrollY);
                      setQueryParams({ isFiat: "false" });
                      if (setIsFiatState) {
                        setIsFiatState("false");
                      }
                    }}
                    className={"py-2 text-xs  md:ml-3 md:text-base"}
                  />
                  <FiatCryptoButton
                    title={f("fiatCasinos")}
                    active={isFiat === "true"}
                    click={() => {
                      setScrollY(window.scrollY);
                      setQueryParams({ isFiat: "true" });
                      if (setIsFiatState) {
                        setIsFiatState("true");
                      }
                    }}
                    className={"py-2 ml-2 text-xs mr-3 md:mr-0 md:text-base"}
                  />
                </div>
              )}
              <Dropdown
                orderBy={orderBy}
                onChange={(orderBy) => {
                  setScrollY(window.scrollY);
                  if (setOrderByKeyInBottomSheet) {
                    setOrderByKeyInBottomSheet(orderBy);
                  } else {
                    setQueryParams({ orderBy });
                  }
                }}
              />
            </div>
          </>
        )}
      </div>

      {!loading && gamesList ? (
        <TableIn
          gamesList={gamesList}
          onAddToCompare={onAddToCompare}
          orderBy={orderBy}
          isFiat={isFiat}
          getGamesFromChosenCasino={getGamesFromChosenCasino}
          getGames={getGames}
          bottomSheetRowClick={bottomSheetRowClick}
        />
      ) : (
        <SkeletonTheme baseColor="#24262C" highlightColor="#444">
          <section>
            <Skeleton count={1} className="h-20 mb-5" />
            <Skeleton count={1} className="h-20 mb-5" />
            <Skeleton count={1} className="h-20 mb-5" />
            <Skeleton count={1} className="h-20 mb-5" />
            <Skeleton count={1} className="h-20 mb-5" />
          </section>
        </SkeletonTheme>
      )}
    </>
  );
};

export default Table;
