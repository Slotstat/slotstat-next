import { useMemo } from "react";
import ReactPaginate from "react-paginate";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { back } from "../../assets";
import Image from "next/image";
import RenderRowCells from "./RenderRowCells";

import _ from "lodash";
// import { Ascending, Descending } from "@/app/assets/svg/AscDesc";
import TooltipComponent from "../TooltipComponent";
import { useTranslations } from "next-intl";
import { casinoOrGameColumns } from "./columns";

import Link from "next/link";

export default function TableIn({
  gamesList,
  onAddToCompare,
  orderBy,
  isFiat,
  getGames,
  bottomSheetRowClick,
}: TableIn) {
  const t = useTranslations("table");
  const f = useTranslations();

  const data = useMemo(() => [...gamesList.results], [gamesList.results]);
  const { pageCount, rowCount, currentPage, pageSize } = gamesList;
  const columns = useMemo(() => casinoOrGameColumns(t), [t]);

  const tableInstance = useReactTable({
    // @ts-ignore
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
  });
  return (
    <>
      <>
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
                        if (onAddToCompare) {
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
                            {onAddToCompare ? (
                              <div className=" h-full flex items-center ">
                                <RenderRowCells
                                  cell={cell}
                                  row={row}
                                  index={i}
                                />
                              </div>
                            ) : (
                              <Link
                                href={`${row.original.gameId}?casId=${
                                  row.original.casinoId
                                }&isFiat=${isFiat || "false"}`}
                                className=" h-full flex items-center "
                              >
                                <RenderRowCells
                                  cell={cell}
                                  row={row}
                                  index={i}
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

        {pageCount > 0 && (
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
            {!orderBy || orderBy === "fixedRtp" ? (
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
            ) : (
              <span className=" text-sm text-grey1 font-light">
                SPS (Slot Profit Status) is updated every 5 minutes. Refresh the
                website to see the new listing of Slots in lose.
              </span>
            )}
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
    </>
  );
}
