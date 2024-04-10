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
}: TableProps) => {
  const t = useTranslations("table");
  const f = useTranslations();
  const { setQueryParams } = useQueryParams();

  const columns = useMemo(() => casinoOrGameColumns(t), [t]);
  const data = useMemo(() => [...gamesList.results], [gamesList.results]);
  const { pageCount, rowCount, currentPage, pageSize } = gamesList;

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

  const tableInstance = useReactTable({
    // @ts-ignore
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
  });

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

      {data?.length > 0 ? (
        <div className="w-full overflow-x-scroll no-scroll">
          <table className="relative w-[857px] md:w-[1013px] text-xs xl:w-full md:text-base">
            <thead>
              {tableInstance.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <th
                        style={{
                          maxWidth: header.column.columnDef.maxSize,
                          minWidth: header.column.columnDef.minSize,
                          width: header.column.columnDef.size,
                        }}
                        key={header.id}
                      >
                        <div className="flex items-center text-base">
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}

                          {/* @ts-ignore  */}
                          {header.column.columnDef.hint && (
                            <TooltipComponent
                              // @ts-ignore
                              text={header.column.columnDef.hint}
                              classN="ml-2"
                            />
                          )}
                        </div>
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>

            <tbody className="xl:w-full">
              {tableInstance.getRowModel().rows.map((row) => {
                return (
                  <tr
                    onClick={() => {
                      if (onAddToCompare || getGamesFromChosenCasino) {
                        bottomSheetRowClick(row);
                      }
                    }}
                    key={row.id}
                    className="hover:bg-dark2 cursor-pointer"
                  >
                    {row.getVisibleCells().map((cell, i) => {
                      return (
                        <td
                          style={{
                            maxWidth: cell.column.columnDef.maxSize,
                            minWidth: cell.column.columnDef.minSize,
                            width: cell.column.columnDef.size,
                            height: 97,
                            paddingTop: 0,
                            paddingBottom: 0,
                          }}
                          key={cell.id}
                        >
                          {onAddToCompare || getGamesFromChosenCasino ? (
                            <div className=" h-full flex items-center ">
                              <RenderRowCells cell={cell} row={row} index={i} />
                            </div>
                          ) : (
                            <Link
                              href={`${row.original.gameId}?casId=${row.original.casinoId}&isFiat=${isFiat}`}
                              className=" h-full flex items-center "
                            >
                              <RenderRowCells cell={cell} row={row} index={i} />
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

      {pageCount > 0 && (!orderBy || orderBy === "fixedRtp") && (
        <div className=" mt-4 flex items-center flex-col md:flex-row  md:justify-between md:my-8">
          <div className="text-grey1 text-sm hidden md:flex">
            Showing
            <span className="text-white mx-1">
              {/* {currentPage} - {currentPage * pageSize} */}
              {currentPage === 1 ? 1 : (currentPage - 1) * pageSize} -
              {(currentPage - 1) * pageSize + data.length}
            </span>
            out of {rowCount}
          </div>
          <ReactPaginate
            forcePage={currentPage - 1}
            pageCount={pageCount}
            onPageChange={({ selected }) => {
              getGames((selected + 1).toString());
              // setPageQuery(selected.toString());
            }}
            // pageRangeDisplayed={1}
            // marginPagesDisplayed={3}
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
              {currentPage} - {currentPage * pageSize}
            </span>{" "}
            out of {rowCount}
          </div>
        </div>
      )}
    </>
  );
};

export default Table;
