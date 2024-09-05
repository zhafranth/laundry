import { formatToCurrency } from "@/utils/format";
import { Absensi, Transaction } from "@prisma/client";
import dayjs from "dayjs";

export const ABSEN_COLUMNS = [
  {
    key: "tanggal",
    label: "Tanggal",
    render: (data: Absensi) => dayjs(data.tanggal).format("DD MMM YYYY"),
  },
  {
    key: "jam_masuk",
    label: "Jam Masuk",
    render: (data: Absensi) =>
      data.jam_masuk ? dayjs(data.jam_masuk).format("HH:mm:ss") : "-",
  },
  {
    key: "jam_keluar",
    label: "Jam Keluar",
    render: (data: Absensi) =>
      data.jam_keluar ? dayjs(data.jam_keluar).format("HH:mm:ss") : "-",
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
