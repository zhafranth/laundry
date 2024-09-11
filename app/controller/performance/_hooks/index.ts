import { useGetKategoriPengeluaran } from "@/actions/hooks/pengeluaran";

export const useGetOptionsKategori = () => {
  const { data = [] } = useGetKategoriPengeluaran();
  return data?.map(({ nama, id }) => ({
    label: nama,
    value: id,
  }));
};
