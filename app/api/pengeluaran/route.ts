"use server";

import { prisma } from "@/lib/prisma";
import dayjs from "dayjs";

export const dynamic = "force-dynamic";

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url); // Langsung akses searchParams dari request.nextUrl
  const year = Number(searchParams.get("year") || 1);
  const month = Number(searchParams.get("month") || 1);

  const startDate = dayjs(new Date(year, month - 1, 1))
    .startOf("month")
    .toDate();
  const endDate = dayjs(new Date(year, month - 1, 1))
    .endOf("month")
    .toDate();

  try {
    const pangeluaran = await prisma.pengeluaran.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lt: endDate,
        },
      },
      include: {
        kategori: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    const pangeluaranTotal = await prisma.pengeluaran.count();

    return Response.json({
      status: 200,
      data: pangeluaran,
      total: pangeluaranTotal,
      message: "Success fetch pengeluaran",
    });
  } catch (error) {
    console.log("error:", error);
    return Response.json({
      message: "error",
    });
  }
};
