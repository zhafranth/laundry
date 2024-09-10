"use client";

import React, { useState } from "react";
import { Select, SelectItem } from "@nextui-org/react";
import dayjs from "dayjs";
import { MONTH_OPTIONS, YEAR_OPTIONS } from "@/constant/date";
import OutcomeList from "./_components/OutcomeList";

const Performance = () => {
  const currentMonth = dayjs().month() + 1; // dayjs().month() dimulai dari 0 untuk Januari, jadi tambahkan 1
  const currentYear = dayjs().year();

  const [month, setMonth] = useState<number>(currentMonth);
  const [year, setYear] = useState<number>(currentYear);

  return (
    <>
      <div className="flex gap-x-4 items-center mb-5">
        <Select
          label="Bulan"
          placeholder="Bulan"
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
          selectedKeys={[String(year)]}
          onChange={(e) => setYear(Number(e.target.value))}
        >
          {YEAR_OPTIONS.map((item) => (
            <SelectItem key={item.value}>{item.label}</SelectItem>
          ))}
        </Select>
      </div>
      <OutcomeList month={month} year={year} />
    </>
  );
};

export default Performance;
