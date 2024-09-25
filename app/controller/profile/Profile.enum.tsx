import { formatToCurrency } from "@/utils/format";
import { Absensi, Transaction } from "@prisma/client";
import dayjs from "dayjs";
import ColumnAbsen from "./components/ColumnAbsen";
import "dayjs/locale/id";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

dayjs.locale("id");

export const ABSEN_COLUMNS = [
  {
    key: "tanggal",
    label: "Tanggal",
    render: (data: Absensi) => dayjs(data.tanggal).format("dddd, DD MMM YYYY"),
  },
  {
    key: "jam_masuk",
    label: "Jam Masuk",
    render: (data: Absensi) => (
      <ColumnAbsen jam={data?.jam_masuk} type="masuk" />
    ),
  },
  {
    key: "jam_keluar",
    label: "Jam Keluar",
    render: (data: Absensi) => (
      <ColumnAbsen jam={data?.jam_keluar} type="keluar" />
    ),
  },
  {
    key: "insentif",
    label: "Insentif",
    render: (data: Absensi & { transactions: Transaction[] }) =>
      formatToCurrency(data?.insentif),
  },
  {
    key: "berat",
    label: "Berat",
    render: (data: Absensi & { transactions: Transaction[] }) => {
      const value = data?.berat || 0;
      const meetTarget = value >= 30;
      return (
        <p
          className={`${
            meetTarget ? "text-green-500" : "text-red-500"
          } flex items-center gap-x-2`}
        >
          {meetTarget ? <FaArrowUp /> : <FaArrowDown />}
          {value} Kg
        </p>
      );
    },
  },
  {
    key: "total",
    label: "Total Transaksi",
    render: (data: Absensi & { transactions: Transaction[] }) =>
      data.transactions.length || 0,
  },
  {
    key: "action",
    label: "Detail",
    render: (data: Absensi & { transactions: Transaction[] }) => (
      <Link href={`/controller/profile/${data?.id}`}>
        <Button size="sm" color="primary" variant="flat">
          Detail
        </Button>
      </Link>
    ),
  },
];
