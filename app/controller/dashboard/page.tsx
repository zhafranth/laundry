"use client";

import { formatToCurrency } from "@/utils/format";
import React from "react";
import { MdOutlineArrowOutward } from "react-icons/md";
import IncomeChart from "./_components/IncomeChart";
import dynamic from "next/dynamic";
import { DateRangePicker } from "@nextui-org/react";

const TableService = dynamic(() => import("./_components/TableService"));

const Dashboard = () => {
  const info = [
    {
      label: "Uang Masuk",
      value: 1000,
      icon: <MdOutlineArrowOutward />,
    },
    {
      label: "Uang Keluar",
      value: 1000,
      icon: <MdOutlineArrowOutward />,
    },
  ];

  return (
    <main className="mb-20">
      <DateRangePicker
        label="Tanggal Transaksi"
        classNames={{
          inputWrapper: "bg-white",
        }}
        className="mb-4"
      />
      <div className="flex gap-x-6">
        {info.map((item, index) => (
          <div
            className="rounded-xl p-6 flex-1 bg-[#e5effee3] border border-blue-200 flex items-center gap-x-4"
            key={index}
          >
            <div
              className={`w-12 h-12 text-2xl rounded-full ${
                item.label === "Uang Keluar" && "rotate-180"
              } bg-blue-500 flex justify-center items-center text-white`}
            >
              {item.icon}
            </div>
            <div>
              <p className="text-sm text-slate-400">{item.label}</p>
              <p className="text-xl font-semibold">
                {formatToCurrency(item.value)}
              </p>
            </div>
          </div>
        ))}
      </div>
      <IncomeChart />
      <TableService />
    </main>
  );
};

export default Dashboard;
