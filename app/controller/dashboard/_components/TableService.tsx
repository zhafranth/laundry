"use client";

import dynamic from "next/dynamic";
import React, { useState } from "react";
import { Select, SelectItem } from "@nextui-org/react";
import dayjs from "dayjs";
import { MONTH_OPTIONS, YEAR_OPTIONS } from "@/constant/date";
import { useGetIncomeTransaction } from "@/actions/hooks/dashboard";
import { Income } from "@/actions/networks/dashboard/interface";
import "dayjs/locale/id";
import { formatToCurrency } from "@/utils/format";

dayjs.locale("id");

const Table = dynamic(() => import("@/components/atoms/table"));

const TableService = () => {
  const currentMonth = dayjs().month() + 1; // dayjs().month() dimulai dari 0 untuk Januari, jadi tambahkan 1
  const currentYear = dayjs().year();

  const [month, setMonth] = useState<number>(currentMonth);
  const [year, setYear] = useState<number>(currentYear);
  const { data = [], isLoading } = useGetIncomeTransaction({ month, year });

  return (
    <>
      <div className="flex gap-x-4 mb-4">
        <Select
          label="Bulan"
          placeholder="Bulan"
          className="max-w-32"
          classNames={{
            trigger: "bg-white",
          }}
          selectedKeys={[String(month)]}
          onChange={(e) => setMonth(Number(e.target.value))}
        >
          {MONTH_OPTIONS.map((item) => (
            <SelectItem key={item.value}>{item.label}</SelectItem>
          ))}
        </Select>
        <Select
          label="Tahun"
          placeholder="Tahun"
          classNames={{
            trigger: "bg-white",
          }}
          className="max-w-36"
          selectedKeys={[String(year)]}
          onChange={(e) => setYear(Number(e.target.value))}
        >
          {YEAR_OPTIONS.map((item) => (
            <SelectItem key={item.value}>{item.label}</SelectItem>
          ))}
        </Select>
      </div>
      <Table
        columns={[
          {
            key: "service_name",
            label: "Tanggal",
            render: (data: Income) =>
              dayjs(data.tanggal).format("dddd, DD MMM YYYY"),
          },
          {
            key: "total_transaksi",
            label: "Total Transaksi",
            render: (data: Income) =>
              formatToCurrency(data?.total_transaksi || 0),
          },
          {
            key: "jumlah_transaksi",
            label: "Jumlah Transaksi",
          },
        ]}
        isLoading={isLoading}
        data={data}
      />
    </>
  );
};

export default TableService;
