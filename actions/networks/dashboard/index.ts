import apiRequest, { ApiResponse } from "@/config/axios";
import { Income } from "./interface";
import { Params } from "@/actions/interface";

export const getTransactionIncome = async (params?: Params) => {
  const response: ApiResponse<Income[]> = await apiRequest({
    method: "GET",
    url: "/dashboard/transaction",
    params,
  });

  return response.data.data?.map((item, index) => ({ ...item, id: index }));
};
