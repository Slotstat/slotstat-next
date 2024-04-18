"use client";
import { Row } from "@tanstack/react-table";
import Dropdown from "./Dropdown";
import { SearchInput } from "./SearchInput";
import _ from "lodash";
import { useTranslations } from "next-intl";
import FiatCryptoButton from "./FiatCryptoButton";
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
                    setKeyWord(keyWord);
                  }
                }}
              />
            </div>
            <div className="flex w-full  justify-between">
              {showCryptoFiatSwitcher && (
                <div className="flex flex-row">
                  <FiatCryptoButton
                    title={f("cryptoCasinos")}
                    active={isFiat === "false" || isFiat === null}
                    click={() => {
                      setScrollY(window.scrollY);
                      setIsFiat("false");
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
                      setIsFiat("true");
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
