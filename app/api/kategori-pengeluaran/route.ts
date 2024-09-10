"use server";

import { prisma } from "@/lib/prisma";

export const GET = async () => {
  try {
    const kategori = await prisma.kategoriPengeluaran.findMany();
    const kategoriTotal = await prisma.kategoriPengeluaran.count();

    return Response.json({
      status: 200,
      data: kategori,
      total: kategoriTotal,
      message: "Success fetch kategori pengeluaran",
    });
  } catch (error) {
    console.log("error:", error);
    return Response.json({
      message: "error",
    });
  }
};
