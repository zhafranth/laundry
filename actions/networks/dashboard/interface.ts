export interface Transaction {
  id: number;
  bulan: number;
  tahun: number;
  tanggal: string;
  jumlah_transaksi: number;
  total_transaksi: number;
}

export interface DataTransaction {
  transaction: Transaction[];
  pemasukan: number;
  berat: number;
  pengeluaran: number;
  total_transaction: number;
}
