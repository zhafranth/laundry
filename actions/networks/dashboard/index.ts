import apiRequest, { ApiResponse } from "@/config/axios";
import { DataTransaction } from "./interface";
import { Params } from "@/actions/interface";

export const getTransactionIncome = async (params?: Params) => {
  const response: ApiResponse<DataTransaction> = await apiRequest({
    method: "GET",
    url: "/dashboard/transaction",
    params,
  });

  return response.data.data;
};
