"use server";

import { prisma } from "@/lib/prisma";
import { PengeluaranPayload } from "./Pengeluaran.interface";

export const actionCreateKategoriPengeluaran = async (data: {
  nama: string;
}) => {
  try {
    await prisma.kategoriPengeluaran.create({
      data,
    });
    return {
      status: 200,
      message: "Success create kategori pengeluaran",
    };
  } catch (error) {
    console.log("error:", error);
    throw new Error("Failed to create kategori pengeluaran");
  }
};

export const actionCreatePengeluaran = async (data: PengeluaranPayload) => {
  try {
    await prisma.pengeluaran.create({
      data,
    });
    return {
      status: 200,
      message: "Success create pengeluaran",
    };
  } catch (error) {
    console.log("error:", error);
    throw new Error("Failed to create pengeluaran");
  }
};

export const actionDeletePengeluaran = async (id: number) => {
  try {
    await prisma.pengeluaran.delete({
      where: {
        id,
      },
    });
    return {
      status: 200,
      message: "Success delete pengeluaran",
    };
  } catch (error) {
    console.log("error:", error);
    throw new Error("Failed to delete pengeluaran");
  }
};
