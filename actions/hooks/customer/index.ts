import { ServicePayload } from "@/actions/actions/service/Service.interface";
import { Params } from "@/actions/interface";
import { createService, getServices } from "@/actions/networks/service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useGetServices = (params?: Params) => {
  return useQuery({
    queryKey: ["services", params],
    queryFn: () => getServices(params),
  });
};

export const useService = () => {
  const queryClient = useQueryClient();

  const { mutate: mutateCreateService, isPending: pendingCreate } = useMutation(
    {
      mutationFn: (data: ServicePayload) => createService(data),
      onSuccess: ({ message }) => {
        toast.success(message);
        queryClient.invalidateQueries({ queryKey: ["services"] });
      },
      onError: ({ message }) => {
        toast.error(message);
      },
    }
  );

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
    mutateCreateService,
    pendingCreate,
  };
};
