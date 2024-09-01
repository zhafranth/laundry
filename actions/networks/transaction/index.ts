"use server";

import {
  actionCreateTransaction,
  actionGetTransaction,
  actionGetTransactions,
  actionUpdateStatusTransaction,
} from "@/actions/actions/transaction";
import {
  ITransaction,
  TransactionPayload,
  TransactionUpdateStatusPayload,
} from "@/actions/actions/transaction/Transaction.interface";
import { ApiResponse, Params } from "@/actions/interface";
import { Transaction } from "@prisma/client";

export const createTransaction = async (data: TransactionPayload) => {
  const response = await actionCreateTransaction(data);
  return response;
};

export const getTransactions = async (params?: Params) => {
  const response: ApiResponse<ITransaction[]> = await actionGetTransactions(
    params
  );
  return response.data;
};

export const getTransaction = async (id?: string) => {
  const response = await actionGetTransaction(id);
  return response.data;
};

export const updateStatusTransaction = async (
  id: string,
  data: TransactionUpdateStatusPayload
) => {
  const response = await actionUpdateStatusTransaction(id, data);
  return response;
};
