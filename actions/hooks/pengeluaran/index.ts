import { PengeluaranPayload } from "@/actions/actions/pengeluaran/Pengeluaran.interface";
import { Params } from "@/actions/interface";
import {
  createKategoriPengeluaran,
  createPengeluaran,
  deletePengeluaran,
  getKategoriPengeluaran,
  getPengeluaran,
} from "@/actions/networks/pengeluaran";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useGetKategoriPengeluaran = () => {
  return useQuery({
    queryKey: ["kategori-pengeluaran"],
    queryFn: () => getKategoriPengeluaran(),
  });
};

export const useKategoriPengeluaran = () => {
  const queryClient = useQueryClient();

  const { mutate: mutateCreateKategoriPengeluaran, isPending: pendingCreate } =
    useMutation({
      mutationFn: (data: { nama: string }) => createKategoriPengeluaran(data),
      onSuccess: ({ message }) => {
        toast.success(message);
        queryClient.invalidateQueries({ queryKey: ["kategori-pengeluaran"] });
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
    mutateCreateKategoriPengeluaran,
    pendingCreate,
  };
};

export const useGetPengeluaran = (params?: Params) => {
  return useQuery({
    queryKey: ["pengeluaran", params],
    queryFn: () => getPengeluaran(params),
  });
};

export const usePengeluaran = () => {
  const queryClient = useQueryClient();

  const { mutate: mutateCreatePengeluaran, isPending: pendingCreate } =
    useMutation({
      mutationFn: (data: PengeluaranPayload) => createPengeluaran(data),
      onSuccess: ({ message }) => {
        toast.success(message);
        // queryClient.invalidateQueries({ queryKey: ["services"] });
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

  const { mutate: mutateDeletePengeluaran, isPending: pendingDelete } =
    useMutation({
      mutationFn: (id: number) => deletePengeluaran(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["pengeluaran"] });
      },
      onError: ({ message }) => {
        toast.error(message);
      },
    });

  return {
    mutateCreatePengeluaran,
    mutateDeletePengeluaran,
    pendingCreate,
    pendingDelete,
  };
};
