"use client";
import { useEffect, useMemo, useState } from "react";
import ReactPaginate from "react-paginate";
import {
  Row,
  useFilters,
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
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

type Props = {
  showFilter: boolean;
  gamesList: gamesList;
  onAddToCompare?: (gameId: GameData) => void;
  orderBy?: string;
  keyWord?: string;
  direction?: string;
  isFiat?: string;
  getGamesFromChosenCasino?: ({
    casinoId,
    name,
  }: GetGamesFromChosenCasinoProps) => void;
  setSearchKeyInBottomSheet?: (text: string) => void;
  setOrderByKeyInBottomSheet?: (text: string | undefined) => void;
  showCryptoFiatSwitcher?: boolean;
  setIsFiatState?: (text: string) => void;
  listPage?: string;
};

const pageSizeConst = 20;

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
  listPage,
}: Props) => {
  const t = useTranslations("table");

  const f = useTranslations();
  const { setQueryParams } = useQueryParams();
  const [scrollY, setScrollY] = useState<number | null>(null);
  // const [ascDesc, setAscDesc] = useState<number>(0);
  const columns = useMemo(() => casinoOrGameColumns(t), [t]);
  const data = useMemo(() => [...gamesList.results], [gamesList.results]);

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

  const {
    page,
    gotoPage,
    pageCount,
    prepareRow,
    headerGroups,
    getTableProps,
    getTableBodyProps,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    // @ts-ignore
    { columns, data },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  // const ascendDescend = useCallback(
  //   (direction: string, status: number) => {
  //     if (ascDesc === status) {
  //       setAscDesc(0);
  //       setQueryParams({ direction: "" });
  //     } else {
  //       setAscDesc(status);
  //       setQueryParams({ direction });
  //     }
  //     setScrollY(window.scrollY);
  //   },
  //   [ascDesc, setQueryParams]
  // );
  // fix next js bug (after changing query it was scrolling to top but now it is fixed)
  useEffect(() => {
    setPageSize(pageSizeConst);
    if (listPage) {
      setTimeout(() => {
        gotoPage(Number(listPage));
      }, 300);
    }
    const persistentScroll = scrollY;
    if (persistentScroll === null) return;

    window.scrollTo({ top: Number(scrollY) });
  }, [
    gotoPage,
    listPage,
    scrollY,
    keyWord,
    orderBy,
    direction,
    isFiat,
    setPageSize,
  ]);

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

              {/* <div className="flex items-center h-10 ml-3 px-2 rounded-lg border border-grey1">
                <Ascending
                  onClick={() => ascendDescend("asc", 1)}
                  active={ascDesc}
                />
                <Descending
                  onClick={() => ascendDescend("desc", -1)}
                  active={ascDesc}
                />
              </div> */}
            </div>
          </>
        )}
      </div>

      {data?.length > 0 ? (
        <div className="w-full overflow-x-scroll no-scroll">
          <table
            {...getTableProps()}
            className="relative w-[857px] md:w-[1013px] text-xs xl:w-full md:text-base"
          >
            <thead>
              {headerGroups.map((headerGroup, index) => (
                <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                  {headerGroup.headers.map((col, i) => {
                    return (
                      <th
                        {...col.getHeaderProps({
                          style: {
                            maxWidth: col.maxWidth,
                            minWidth: col.minWidth,
                            width: col.width,
                          },
                        })}
                        key={i}
                      >
                        <div className="flex items-center">
                          {col.render("Header")}
                          {/*  @ts-ignore: Unreachable code error*/}
                          {col.hint && (
                            //  @ts-ignore: Unreachable code error
                            <TooltipComponent text={col.hint} classN="ml-2" />
                          )}
                        </div>
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>

            <tbody {...getTableBodyProps()} className="xl:w-full">
              {page.map((row, index) => {
                prepareRow(row);

                return (
                  <tr
                    {...row.getRowProps()}
                    onClick={() => {
                      if (onAddToCompare || getGamesFromChosenCasino) {
                        bottomSheetRowClick(row);
                      }
                    }}
                    key={index}
                    className="hover:bg-dark2 cursor-pointer"
                  >
                    {row.cells.map((cell, index) => {
                      return (
                        <td
                          {...cell.getCellProps({
                            style: {
                              maxWidth: cell.column.maxWidth,
                              minWidth: cell.column.minWidth,
                              width: cell.column.width,
                              height: 97,
                              paddingTop: 0,
                              paddingBottom: 0,
                            },
                          })}
                          key={index}
                        >
                          {onAddToCompare || getGamesFromChosenCasino ? (
                            <div className=" h-full flex items-center ">
                              <RenderRowCells
                                cell={cell}
                                row={row}
                                index={index}
                              />
                            </div>
                          ) : (
                            <Link
                              href={`${row.original.gameId}?casId=${row.original.casinoId}&isFiat=${isFiat}`}
                              className=" h-full flex items-center "
                            >
                              <RenderRowCells
                                cell={cell}
                                row={row}
                                index={index}
                              />
                            </Link>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className=" flex w-full bg-dark2 justify-center items-center p-28 text-white">
          {f("itemNotFound")}
        </div>
      )}

      {pageCount > 1 && (
        <div className=" mt-4 flex items-center flex-col md:flex-row  md:justify-between md:my-8">
          <div className="text-grey1 text-sm hidden md:flex">
            Showing
            <span className="text-white mx-1">
              {pageIndex + 1} - {pageSizeConst}
            </span>
            out of {gamesList.rowCount}
          </div>
          <ReactPaginate
            forcePage={pageIndex}
            pageCount={pageCount}
            onPageChange={({ selected }) => {
              setQueryParams({ page: selected.toString() });
              // gotoPage(selected);
            }}
            pageRangeDisplayed={1}
            marginPagesDisplayed={3}
            renderOnZeroPageCount={null}
            previousLabel={
              <Image
                src={back}
                alt=""
                className="h-4 w-4"
                height={96}
                width={96}
              />
            }
            nextLabel={
              <Image
                src={back}
                alt=""
                className="h-4 w-4 rotate-180"
                height={96}
                width={96}
              />
            }
            breakLabel="..."
            containerClassName="pagination"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakClassName="page-item"
            breakLinkClassName="page-link"
            activeClassName="active"
          />
          <div className=" text-xs mt-2 text-grey1 md:text-transparent">
            Showing{" "}
            <span className="text-white md:text-transparent">
              {pageIndex + 1} - {pageSizeConst}
            </span>{" "}
            out of {gamesList.rowCount}
          </div>
        </div>
      )}
    </>
  );
};

export default Table;
