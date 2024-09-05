"use client";

import { useGetAbsensiUser } from "@/actions/hooks/absensi";
import dayjs from "dayjs";
import React, { useMemo, useState } from "react";
import ButtonAbsen from "./ButtonAbsen";
import Table from "@/components/atoms/table";
import { Select, SelectItem } from "@nextui-org/react";
import { MONTH_OPTIONS, YEAR_OPTIONS } from "@/constant/date";
import { ABSEN_COLUMNS } from "../Profile.enum";
import { formatToCurrency } from "@/utils/format";

const SectionUser = ({ id }: { id: string }) => {
  const currentMonth = dayjs().month() + 1; // dayjs().month() dimulai dari 0 untuk Januari, jadi tambahkan 1
  const currentYear = dayjs().year();

  const [month, setMonth] = useState<number>(currentMonth);
  const [year, setYear] = useState<number>(currentYear);

  const { data: listAbsen = [] } = useGetAbsensiUser({
    id: id as string,
    year,
    month,
  });

  const totalInsentif = useMemo(
    () => listAbsen?.reduce((a, b) => a + (b?.insentif || 0), 0),
    [listAbsen]
  );

  return (
    <>
      <div className="flex gap-x-4 items-center mt-8 mb-6">
        <ButtonAbsen id={id} type="masuk" />
        <ButtonAbsen id={id} type="keluar" />
      </div>

      <Table
        data={listAbsen}
        columns={ABSEN_COLUMNS}
        isLoading={false}
        topContent={
          <div className="flex items-center gap-x-2">
            <Select
              label="Bulan"
              placeholder="Bulan"
              className="max-w-32"
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
              className="max-w-36"
              selectedKeys={[String(year)]}
              onChange={(e) => setYear(Number(e.target.value))}
            >
              {YEAR_OPTIONS.map((item) => (
                <SelectItem key={item.value}>{item.label}</SelectItem>
              ))}
            </Select>

            <div>
              <p className="text-sm text-slate-400">Total Kehadiran</p>
              <p>{listAbsen.length}</p>
            </div>
            <div>
              <p className="text-sm text-slate-400">Total Insentif</p>
              <p>{formatToCurrency(totalInsentif)}</p>
            </div>
          </div>
        }
      />
    </>
  );
};

export default SectionUser;
