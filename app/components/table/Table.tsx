"use client";
import { Row } from "@tanstack/react-table";
import Dropdown from "./Dropdown";
import { SearchAndCryptoSwitch } from "./SearchAndCryptoSwitch";
import _ from "lodash";
import { useTranslations } from "next-intl";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import TableIn from "./TableIn";
import { useQueryState } from "nuqs";

const Table = ({
  gamesList,
  showFilter = false,
  onAddToCompare,
  setSearchKeyInBottomSheet,
  setOrderByKeyInBottomSheet,
  showCryptoFiatSwitcher,
  setIsFiatState,
  setScrollY,
  getGames,
  loading,
}: TableProps) => {
  const f = useTranslations();

  const [keyWord, setKeyWord] = useQueryState("keyWord");
  const [orderBy, setOrderBy] = useQueryState("orderBy");
  // const [direction, setDirection] = useQueryState("direction");
  const [isFiat, setIsFiat] = useQueryState("isFiat");

  const bottomSheetRowClick = (row: Row<GameData>) => {
    if (onAddToCompare) {
      return onAddToCompare(row.original);
    }
  };
  const cryptoFiatSwitcher = (state: string) => {
    setScrollY(window.scrollY);
    setIsFiat(state);
    if (setIsFiatState) {
      setIsFiatState(state);
    }
  };

  return (
    <>
      <div className="my-8 flex flex-col items-center justify-between space-y-6 md:flex-row md:space-y-0 lg:my-6">
        {showFilter && (
          <>
            <div className="flex w-full  justify-between">
              <div className="flex w-full md:w-auto">
                <SearchAndCryptoSwitch
                  keyWord={keyWord || ""}
                  isFiat={isFiat || ""}
                  cryptoFiatSwitcher={cryptoFiatSwitcher}
                  setCasinoFilter={(keyWord) => {
                    setScrollY(window.scrollY);
                    if (setSearchKeyInBottomSheet) {
                      setSearchKeyInBottomSheet(keyWord);
                    } else {
                      setKeyWord(keyWord);
                    }
                  }}
                />
              </div>

              <Dropdown
                orderBy={orderBy}
                onChange={(orderBy) => {
                  setScrollY(window.scrollY);
                  if (setOrderByKeyInBottomSheet) {
                    setOrderByKeyInBottomSheet(orderBy);
                  } else {
                    setOrderBy(orderBy || "");
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
