import { Customer, Service, Transaction } from "@prisma/client";

export type TransactionPayload = Omit<
  Transaction,
  "id" | "createdAt" | "updatedAt"
>;

export interface TransactionUpdateStatusPayload {
  tanggal_estimasi: string;
  status: string;
  status_pembayaran?: boolean | null;
}

export type ITransaction = Transaction & {
  customer?: Customer;
  layanan?: Service;
};
