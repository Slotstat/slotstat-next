"use client";
import { useCallback, useMemo, useState } from "react";
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
import { useRouter, usePathname } from "next/navigation";
import useQueryParams from "@/app/utils/useQueryParams";
import _ from "lodash";
import { Ascending, Descending } from "@/app/assets/svg/AscDesc";
import TooltipComponent from "../TooltipComponent";

type Props = {
  columns: Array<CasinoCols>;
  showFilter: boolean;
  tableBodyData: CasinoData[] | GameData[];
  onAddToCompare?: (gameId: GameData) => void;
  orderBy?: string;
  keyWord?: string;
  getGamesFromChosenCasino?: ({
    casinoId,
    name,
  }: GetGamesFromChosenCasinoProps) => void;
};

const Table = ({
  columns: _columns,
  tableBodyData,
  showFilter = false,
  onAddToCompare,
  orderBy,
  keyWord,
  getGamesFromChosenCasino,
}: Props) => {
  const { setQueryParams } = useQueryParams();
  const columns = useMemo(() => _columns, [_columns]);
  const data = useMemo(() => [...tableBodyData], [tableBodyData]);

  const router = useRouter();
  const pathName = usePathname();
  const [ascDesc, setAscDesc] = useState<number>(0);

  // const getPath = () => {
  //   const secondParameterInPath = 2;
  //   if (!pathName) return "/";
  //   const segments = pathName.split("/");
  //   return segments[secondParameterInPath];
  // };

  const onRowPress = (row: Row<CasinoData | GameData>) => {
    if (onAddToCompare) {
      return onAddToCompare(row.original);
    } else if (getGamesFromChosenCasino && row.original.casinoId) {
      return getGamesFromChosenCasino({
        casinoId: row.original.casinoId,
        name: row.original.name,
      });
    } else {
      const path = row.original.gameId
        ? `${pathName}/${row.original.gameId}`
        : `${pathName}/${row.original.casinoId}`;
      return router.push(path);
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
    state: { pageIndex, pageSize },
  } = useTable(
    // @ts-ignore
    { columns, data },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const ascendDescend = useCallback(
    (direction: string, status: number) => {
      if (ascDesc === status) {
        setAscDesc(0);
        setQueryParams({ direction: "" });
      } else {
        setAscDesc(status);
        setQueryParams({ direction });
      }
    },
    [ascDesc, setQueryParams]
  );

  return (
    <>
      <div className="my-8 flex flex-col items-center justify-between space-y-6 md:flex-row md:space-y-0 lg:my-6">
        {showFilter && (
          <>
            <SearchInput
              keyWord={keyWord || ""}
              setCasinoFilter={(keyWord) => setQueryParams({ keyWord })}
            />
            <div className="flex">
              <Dropdown
                orderBy={orderBy}
                onChange={(orderBy) => setQueryParams({ orderBy })}
              />

              <div className="flex items-center h-10 ml-3 px-2 rounded-lg border border-grey1">
                <Ascending
                  onClick={() => ascendDescend("asc", 1)}
                  active={ascDesc}
                />
                <Descending
                  onClick={() => ascendDescend("desc", -1)}
                  active={ascDesc}
                />
              </div>
            </div>
          </>
        )}
      </div>

      {data?.length > 0 ? (
        <table {...getTableProps()} className="w-full relative">
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
                        {col.hint && <TooltipComponent text={col.hint} />}
                      </div>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps()}>
            {page.map((row, index) => {
              prepareRow(row);

              return (
                <tr
                  {...row.getRowProps()}
                  onClick={() => {
                    onRowPress(row);
                  }}
                  key={index}
                  className=" hover:bg-dark2 cursor-pointer"
                >
                  {row.cells.map((cell, index) => {
                    return (
                      <td
                        {...cell.getCellProps({
                          style: {
                            maxWidth: cell.column.maxWidth,
                            minWidth: cell.column.minWidth,
                            width: cell.column.width,
                          },
                        })}
                        key={index}
                      >
                        <RenderRowCells
                          cell={cell}
                          row={row}
                          index={index}
                          onRowPress={() => onRowPress(row)}
                        />
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div className=" flex w-full bg-dark2 justify-center items-center p-28 text-white">{`Oops, item with the name "${keyWord}" not found`}</div>
      )}

      {pageCount > 1 && (
        <div className="my-8 flex justify-center">
          <ReactPaginate
            forcePage={pageIndex}
            pageCount={pageCount}
            onPageChange={({ selected }) => gotoPage(selected)}
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
        </div>
      )}
    </>
  );
};

export default Table;
