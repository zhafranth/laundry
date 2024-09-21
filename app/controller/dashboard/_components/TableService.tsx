"use client";

import dynamic from "next/dynamic";
import React, { useMemo, useState } from "react";
import { Select, SelectItem } from "@nextui-org/react";
import dayjs from "dayjs";
import { MONTH_OPTIONS, YEAR_OPTIONS } from "@/constant/date";
import { useGetIncomeTransaction } from "@/actions/hooks/dashboard";
import { Transaction } from "@/actions/networks/dashboard/interface";
import "dayjs/locale/id";
import { formatToCurrency } from "@/utils/format";
import { MdOutlineArrowOutward, MdScale } from "react-icons/md";
import { FaChartLine, FaCheck, FaDollarSign } from "react-icons/fa";
import { IoScaleSharp } from "react-icons/io5";

dayjs.locale("id");

const Table = dynamic(() => import("@/components/atoms/table"));

const TableService = () => {
  const currentMonth = dayjs().month() + 1; // dayjs().month() dimulai dari 0 untuk Januari, jadi tambahkan 1
  const currentYear = dayjs().year();

  const [month, setMonth] = useState<number>(currentMonth);
  const [year, setYear] = useState<number>(currentYear);
  const { data, isLoading } = useGetIncomeTransaction({ month, year });
  const { transaction = [] } = data ?? {};

  const transactionList = useMemo(
    () => transaction?.map((item, index) => ({ ...item, id: index })),
    [transaction]
  );

  const info = useMemo(() => {
    const {
      pemasukan = 0,
      berat = 0,
      pengeluaran = 0,
      total_transaction = 0,
      transaction = [],
    } = data ?? {};

    return [
      {
        key: "uang-masuk-bersih",
        label: "Pemasukan Bersih",
        value: formatToCurrency(pemasukan - pengeluaran),
        icon: <FaDollarSign size={14} />,
      },
      {
        key: "uang-masuk",
        label: "Pemasukan",
        value: formatToCurrency(pemasukan),
        icon: <MdOutlineArrowOutward size={16} />,
      },
      {
        key: "uang-keluar",
        label: "Pengeluaran",
        value: formatToCurrency(pengeluaran),
        icon: <MdOutlineArrowOutward size={16} />,
      },
      {
        key: "total",
        label: "Total Transaksi",
        value: total_transaction,
        icon: <FaCheck size={12} />,
      },
      {
        key: "barat",
        label: "Berat",
        value: `${berat} Kg`,
        icon: <IoScaleSharp size={12} />,
      },
      {
        key: "average",
        label: "Rata-rata/Hari",
        value: total_transaction / transaction?.length || 0,
        icon: <FaChartLine size={14} />,
      },
    ];
  }, [data]);

  return (
    <>
      <div className="flex gap-x-4">
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
      <div className="bg-blue-50 border border-blue-300 rounded-md p-4 my-5 flex justify-between flex-wrap">
        {info.map((item) => (
          <div className="" key={item.key}>
            <p className="text-sm text-slate-400 mb-2">{item.label}</p>
            <div className="flex gap-x-2 items-center">
              <div
                className={`w-6 h-6 text-2xl rounded-full ${
                  item.key === "uang-keluar" && "rotate-180"
                } bg-blue-500 flex justify-center items-center text-white`}
              >
                {item.icon}
              </div>
              <p className="font-semibold text-slate-600">{item.value}</p>
            </div>
          </div>
        ))}
      </div>
      <Table
        columns={[
          {
            key: "service_name",
            label: "Tanggal",
            render: (data: Transaction) =>
              dayjs(data.tanggal).format("dddd, DD MMM YYYY"),
          },
          {
            key: "total_transaksi",
            label: "Total Transaksi",
            render: (data: Transaction) =>
              formatToCurrency(data?.total_transaksi || 0),
          },
          {
            key: "jumlah_transaksi",
            label: "Jumlah Transaksi",
          },
        ]}
        isLoading={isLoading}
        data={transactionList}
      />
    </>
  );
};

export default TableService;
