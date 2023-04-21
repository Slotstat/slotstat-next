"use client";
import { useMemo } from "react";
import ReactPaginate from "react-paginate";

import {
  Row,
  useFilters,
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";

import { ascending, back, descending } from "../../assets";
import Dropdown from "./Dropdown";
import { SearchInput } from "./SearchInput";
import Image from "next/image";

import RenderRowCells from "./RenderRowCells";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

type Props = {
  columns: Array<CasinoCols>;
  showFilter: boolean;
  tableBodyData: CasinoData[] | GameData[];
  onAddToCompare?: (gameId: GameData) => void;
};

const Table = ({
  columns: _columns,
  tableBodyData,
  showFilter = false,
  onAddToCompare,
}: Props) => {
  const columns = useMemo(() => _columns, [_columns]);
  const data = useMemo(() => [...tableBodyData], [tableBodyData]);

  const router = useRouter();
  const pathName = usePathname();

  const getPath = () => {
    const secondParameterInPath = 2;
    if (!pathName) return "/";
    const segments = pathName.split("/");
    return segments[secondParameterInPath];
  };

  const onRowPress = (row: Row<CasinoData | GameData>) => {
    if (onAddToCompare) {
      return onAddToCompare(row.original);
    } else {
      const path = row.original.gameId
        ? `/${getPath()}/${row.original.gameId}`
        : `/${row.original.casinoId}`;
      return router.push(path);
    }
  };

  const {
    page,
    gotoPage,
    pageCount,
    setFilter,
    prepareRow,
    headerGroups,
    getTableProps,
    setGlobalFilter,
    getTableBodyProps,
    state: { pageIndex, pageSize, globalFilter },
  } = useTable(
    // @ts-ignore
    { columns, data },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  return (
    <>
      <div className="my-8 flex flex-col items-center justify-between space-y-6 md:flex-row md:space-y-0 lg:my-6">
        <SearchInput
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
        {showFilter && (
          <Dropdown
            label="Provider"
            onChange={(v?: string) => {
              return setFilter("name", v);
            }}
          />
        )}
      </div>
      <table {...getTableProps()} className="w-full">
        <thead>
          {headerGroups.map((headerGroup, index) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={index}>
              {headerGroup.headers.map((col, i) => (
                <th {...col.getHeaderProps(col.getSortByToggleProps())} key={i}>
                  <div className="flex items-center">
                    {col.render("Header")}
                    {col.isSorted && (
                      <span>
                        <Image
                          src={col.isSortedDesc ? descending : ascending}
                          alt=""
                          className="ml-3"
                        />
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, index) => {
            prepareRow(row);

            return (
              <tr
                {...row.getRowProps()}
                onClick={() => onRowPress(row)}
                key={index}
                className=" hover:bg-dark2 cursor-pointer"
              >
                {row.cells.map((cell, index) => {
                  return (
                    <td {...cell.getCellProps()} key={index}>
                      <RenderRowCells cell={cell} row={row} index={index} />
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
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
