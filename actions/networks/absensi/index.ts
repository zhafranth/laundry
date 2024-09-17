import {
  actionAbsenKeluar,
  actionAbsenMasuk,
  actionGetAbsen,
} from "@/actions/actions/absensi";
import { ITransaction } from "@/actions/actions/transaction/Transaction.interface";
import { ApiResponse as ApiResponseAction } from "@/actions/interface";
import apiRequest, { ApiResponse } from "@/config/axios";
import { Absensi, Customer, Transaction } from "@prisma/client";

export const postAbsenMasuk = async (userId: string) => {
  const response = await actionAbsenMasuk(userId);
  return response;
};
export const postAbsenKeluar = async (userId: string) => {
  const response = await actionAbsenKeluar(userId);
  return response;
};

export const getAbsenUser = async (
  userId: string,
  month: number,
  year: number
) => {
  const response: ApiResponseAction<Absensi[]> = await actionGetAbsen(
    userId,
    month,
    year
  );
  return response.data;
};

export const getAbsenDetail = async (id: string) => {
  const response: ApiResponse<Absensi & { transactions: ITransaction[] }> =
    await apiRequest({
      method: "GET",
      url: `/absen/${id}`,
    });

  return response.data.data;
};
