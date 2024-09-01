"use server";

import {
  actionCreateTransaction,
  actionGetTransactions,
  actionUpdateStatusTransaction,
} from "@/actions/actions/transaction";
import {
  ITransaction,
  TransactionPayload,
  TransactionUpdateStatusPayload,
} from "@/actions/actions/transaction/Transaction.interface";
import { ApiResponse, Params } from "@/actions/interface";

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

export const updateStatusTransaction = async (
  id: string,
  data: TransactionUpdateStatusPayload
) => {
  const response = await actionUpdateStatusTransaction(id, data);
  return response;
};
