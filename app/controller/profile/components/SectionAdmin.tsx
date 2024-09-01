"use client";

import React, { useMemo, useState } from "react";
import { ABSEN_COLUMNS } from "../Profile.enum";
import Table from "@/components/atoms/table";
import { Button, Select, SelectItem } from "@nextui-org/react";
import { MONTH_OPTIONS, YEAR_OPTIONS } from "@/constant/date";
import dayjs from "dayjs";
import { useGetAbsensiUser } from "@/actions/hooks/absensi";
import { useGetUsers } from "@/actions/hooks/user";
import CardUser from "./CardUser";
import { FaPlus } from "react-icons/fa";
import Link from "next/link";

const SectionAdmin = () => {
  const currentMonth = dayjs().month() + 1; // dayjs().month() dimulai dari 0 untuk Januari, jadi tambahkan 1
  const currentYear = dayjs().year();
  const { data: users } = useGetUsers();

  const USERS_OPTIONS = useMemo(
    () =>
      users
        ?.filter((item) => item.role !== "ADMIN")
        .map((item) => ({ label: item.name, value: item.id })) || [],
    [users]
  );

  const [month, setMonth] = useState<number>(currentMonth);
  const [year, setYear] = useState<number>(currentYear);
  const [user, setUser] = useState<string>(USERS_OPTIONS[0]?.value);

  const { data: listAbsen = [], isLoading } = useGetAbsensiUser({
    id: user,
    year,
    month,
  });

  return (
    <div className="mt-4">
      <div className="my-4">
        <div className="flex justify-between mb-4">
          <p className="text-xl font-semibold">Users</p>
          <Link href={"/controller/profile/create-user"}>
            <Button
              variant="flat"
              color="primary"
              startContent={<FaPlus />}
              radius="full"
              size="sm"
            >
              Tambah User
            </Button>
          </Link>
        </div>
        <div className="flex flex-col gap-4">
          {users?.map((item, index) => (
            <CardUser key={index} data={item} />
          ))}
        </div>
      </div>
      <Table
        data={listAbsen}
        columns={ABSEN_COLUMNS}
        isLoading={isLoading}
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
            <Select
              label="Pegawai"
              placeholder="Pegawai"
              className="max-w-36"
              selectedKeys={[user]}
              onChange={(e) => setUser(e.target.value)}
            >
              {USERS_OPTIONS?.map((item) => (
                <SelectItem key={item.value}>{item.label}</SelectItem>
              ))}
            </Select>

            <div>
              <p className="text-sm text-slate-400">Total Kehadiran</p>
              <p>{listAbsen.length}</p>
            </div>
          </div>
        }
      />
    </div>
  );
};

export default SectionAdmin;
