"use server";

import {
  actionAbsenKeluar,
  actionAbsenMasuk,
  actionGetAbsen,
} from "@/actions/actions/absensi";
import { ApiResponse } from "@/actions/interface";
import { Absensi } from "@prisma/client";

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
  const response: ApiResponse<Absensi[]> = await actionGetAbsen(
    userId,
    month,
    year
  );
  return response.data;
};
