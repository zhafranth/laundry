import {
  actionCreateKategoriPengeluaran,
  actionCreatePengeluaran,
  actionDeletePengeluaran,
} from "@/actions/actions/pengeluaran";
import {
  IPengeluaran,
  PengeluaranPayload,
} from "@/actions/actions/pengeluaran/Pengeluaran.interface";
import { Params } from "@/actions/interface";
import apiRequest, { ApiResponse } from "@/config/axios";
import { KategoriPengeluaran, Pengeluaran } from "@prisma/client";

export const createKategoriPengeluaran = async (data: { nama: string }) => {
  const response = await actionCreateKategoriPengeluaran(data);
  return response;
};

export const createPengeluaran = async (data: PengeluaranPayload) => {
  const response = await actionCreatePengeluaran(data);
  return response;
};

export const getKategoriPengeluaran = async () => {
  const response: ApiResponse<KategoriPengeluaran[]> = await apiRequest({
    method: "GET",
    url: "/kategori-pengeluaran",
  });

  return response.data.data;
};

export const getPengeluaran = async (params?: Params) => {
  const response: ApiResponse<IPengeluaran[]> = await apiRequest({
    method: "GET",
    url: "/pengeluaran",
    params,
  });

  return response.data.data;
};

export const deletePengeluaran = async (id: number) => {
  const response = await actionDeletePengeluaran(id);
  return response;
};
