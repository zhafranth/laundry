import { Params } from "@/actions/interface";
import { getTransactionIncome } from "@/actions/networks/dashboard";
import { useQuery } from "@tanstack/react-query";

export const useGetIncomeTransaction = (params?: Params) => {
  return useQuery({
    queryKey: ["dashboard", "income", params],
    queryFn: () => getTransactionIncome(params),
  });
};
