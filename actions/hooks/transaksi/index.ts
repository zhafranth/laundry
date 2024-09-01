import { actionUpdateStatusTransaction } from "@/actions/actions/transaction";
import {
  TransactionPayload,
  TransactionUpdateStatusPayload,
} from "@/actions/actions/transaction/Transaction.interface";
import { Params } from "@/actions/interface";
import {
  createTransaction,
  getTransactions,
} from "@/actions/networks/transaction";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useGetTransactions = (
  params?: Params,
  options?: { enabled?: boolean }
) => {
  return useQuery({
    queryKey: ["transactions", params],
    queryFn: () => getTransactions(params),
    ...options,
  });
};

export const useTransaction = () => {
  const queryClient = useQueryClient();

  const { mutate: mutateCreateTransaction, isPending: pendingCreate } =
    useMutation({
      mutationFn: (data: TransactionPayload) => createTransaction(data),
      onSuccess: ({ message }) => {
        toast.success(message);
        queryClient.invalidateQueries({ queryKey: ["transactions"] });
      },
      onError: ({ message }) => {
        toast.error(message);
      },
    });

  // const { mutate: mutateUpdatePost, isPending: pendingUpdate } = useMutation({
  //   mutationFn: ({ data, id }: { data: PostPayload; id: string }) =>
  //     updatePost(data, id),
  //   onSuccess: ({ message }) => {
  //     toast.success(message);
  //   },
  //   onError: ({ message }) => {
  //     toast.error(message);
  //   },
  // });

  // const { mutate: mutateDeletePost, isPending: pendingDelete } = useMutation({
  //   mutationFn: (id: string) => delPost(id),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["table-list"] });
  //   },
  //   onError: ({ message }) => {
  //     toast.error(message);
  //   },
  // });

  return {
    mutateCreateTransaction,
    pendingCreate,
  };
};

export const useUpdateStatusTransaction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: TransactionUpdateStatusPayload;
    }) => actionUpdateStatusTransaction(id, data),
    onSuccess: ({ message }) => {
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
    onError: ({ message }) => {
      toast.error(message);
    },
  });
};
