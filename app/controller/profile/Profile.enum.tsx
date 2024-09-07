import { formatToCurrency } from "@/utils/format";
import { Absensi, Transaction } from "@prisma/client";
import dayjs from "dayjs";
import ColumnAbsen from "./components/ColumnAbsen";

export const ABSEN_COLUMNS = [
  {
    key: "tanggal",
    label: "Tanggal",
    render: (data: Absensi) => dayjs(data.tanggal).format("DD MMM YYYY"),
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
    key: "total",
    label: "Total Transaksi",
    render: (data: Absensi & { transactions: Transaction[] }) =>
      data.transactions.length || 0,
  },
];
