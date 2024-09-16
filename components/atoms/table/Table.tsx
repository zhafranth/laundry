"use client";

import React, { useCallback, useState } from "react";
import {
  Pagination,
  Spinner,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  Table as TableNext,
  TableRow,
  TableColumnProps,
} from "@nextui-org/react";
import { BsDatabaseAdd } from "react-icons/bs";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type dataType = {
  id?: string | number;
  [x: string]: any;
};

const Table = ({
  data,
  columns,
  isLoading,
  isPagination = false,
  total = 0,
  topContent,
}: {
  isLoading: boolean;
  data?: dataType[];
  columns: {
    key: string;
    label: string;
    width?: number;
    render?: (data?: any) => React.ReactNode | React.JSX.Element;
  }[];
  isPagination?: boolean;
  total?: number;
  topContent?: React.ReactNode;
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleChangePage = useCallback(
    (value: number) => {
      setCurrentPage(value);
      const params = new URLSearchParams(searchParams);
      if (value) {
        params.set("page", value as unknown as string);
      } else {
        params.delete("page");
      }

      replace(`${pathname}?${params.toString()}`);
    },
    [pathname, replace, searchParams]
  );

  const renderCell = useCallback(
    (data: dataType, columnKey: React.Key) => {
      const column = columns.find((item) => item.key === columnKey)?.render;
      const value =
        typeof data[columnKey as keyof dataType] === "object"
          ? "-"
          : data[columnKey as keyof dataType];

      if (column) {
        return column(data);
      }
      return <p className=" text-xs">{value}</p>;
    },
    [columns]
  );

  return (
    <>
      <TableNext
        aria-label="Example table with dynamic content"
        isStriped
        classNames={{
          wrapper: "min-h-[70vh] justify-normal",
        }}
        topContent={topContent}
        topContentPlacement="inside"
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              width={column.width}
              key={column.key}
              className="bg-blue-500 text-white"
            >
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={data || []}
          isLoading={isLoading}
          loadingContent={<Spinner label="Loading..." />}
          emptyContent={
            <div className="flex justify-center items-center flex-col">
              <BsDatabaseAdd size={32} />
              <h1>No Data</h1>
            </div>
          }
        >
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell className="text-slate-700">
                  {renderCell(item, columnKey)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </TableNext>

      {isPagination && (
        <Pagination
          total={Math.ceil(total / 20)}
          size={"sm"}
          onChange={handleChangePage}
          page={currentPage}
          classNames={{
            wrapper: "mt-4",
          }}
        />
      )}
    </>
  );
};

export default Table;
