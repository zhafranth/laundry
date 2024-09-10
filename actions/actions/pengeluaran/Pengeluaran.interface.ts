import { KategoriPengeluaran, Pengeluaran } from "@prisma/client";

export type PengeluaranPayload = Omit<
  Pengeluaran,
  "id" | "createdAt" | "updatedAt"
>;

export type IPengeluaran = Pengeluaran & {
  kategori?: KategoriPengeluaran;
};
