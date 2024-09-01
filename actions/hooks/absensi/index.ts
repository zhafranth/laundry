import {
  getAbsenUser,
  postAbsenKeluar,
  postAbsenMasuk,
} from "@/actions/networks/absensi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useGetAbsensiUser = ({
  id,
  month,
  year,
}: {
  id: string;
  month: number;
  year: number;
}) => {
  return useQuery({
    queryKey: ["absen", id, month, year],
    queryFn: () => getAbsenUser(id, month, year),
    enabled: !!id,
  });
};

export const useAbsen = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      userId,
      type,
    }: {
      userId: string;
      type: "masuk" | "keluar";
    }) => (type === "masuk" ? postAbsenMasuk(userId) : postAbsenKeluar(userId)),
    onSuccess: ({ message }) => {
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["absen"] });
    },
    onError: ({ message }) => {
      toast.error(message);
    },
  });
};
