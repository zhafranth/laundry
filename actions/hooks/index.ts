import { useMutation, useQuery } from "@tanstack/react-query";
import { createCustomer, getCustomers } from "../networks/customer";
import { CustomerPayload } from "../actions/customer/Customer.interface";
import { toast } from "react-toastify";
import { Params } from "../interface";

export const useGetCustomers = (
  params: Params,
  options?: { enabled?: boolean }
) => {
  return useQuery({
    queryKey: ["customers", params],
    queryFn: () => getCustomers(params),
    ...options,
  });
};

export const useCustomer = () => {
  // const queryClient = useQueryClient();

  const { mutate: mutateCreateCustomer, isPending: pendingCreate } =
    useMutation({
      mutationFn: (data: CustomerPayload) => createCustomer(data),
      onSuccess: ({ message }) => {
        toast.success(message);
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
    mutateCreateCustomer,
    pendingCreate,
  };
};
