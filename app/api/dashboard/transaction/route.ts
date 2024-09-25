import { prisma } from "@/lib/prisma";
import dayjs from "dayjs";

export const dynamic = "force-dynamic";

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url); // Langsung akses searchParams dari request.nextUrl
  const year = Number(searchParams.get("year") || 2024);
  const month = Number(searchParams.get("month") || 1);

  const startDate = dayjs(new Date(year, month - 1, 1))
    .startOf("month")
    .toDate();
  const endDate = dayjs(new Date(year, month - 1, 1))
    .endOf("month")
    .toDate();

  try {
    const transaction = await prisma.$queryRaw`
    SELECT 
      MONTH(createdAt) as bulan, 
      YEAR(createdAt) as tahun, 
    DATE(createdAt) as tanggal, 
      CAST(COUNT(id) AS FLOAT) as jumlah_transaksi, 
      CAST(SUM(harga) as FLOAT) as total_transaksi,
      CAST(SUM(berat) as FLOAT) as berat
    FROM Transaction 
    WHERE MONTH(createdAt) = ${month} 
      AND YEAR(createdAt) = ${year} 
    GROUP BY bulan, tahun, tanggal;
      `;

    const incomeTotal = (await prisma.$queryRaw`
    SELECT
      CAST(SUM(harga) as FLOAT) as total,
      CAST(SUM(berat) as FLOAT) as berat
    FROM Transaction
    WHERE MONTH(createdAt) = ${month}
      AND YEAR(createdAt) = ${year}
    `) as { total: number; berat: number }[];

    const outcomeTotal = (await prisma.$queryRaw`
    SELECT CAST(SUM(harga) as FLOAT) as total
    FROM Pengeluaran
    WHERE MONTH(createdAt) = ${month}
      AND YEAR(createdAt) = ${year}
    `) as { total: number }[];

    const totalTransaction = await prisma.transaction.count({
      where: {
        createdAt: {
          gte: startDate,
          lt: endDate,
        },
      },
    });

    return Response.json({
      status: 200,
      data: {
        transaction,
        pemasukan: incomeTotal[0]?.total || 0,
        berat: incomeTotal[0]?.berat || 0,
        pengeluaran: outcomeTotal[0].total || 0,
        total_transaction: totalTransaction,
      },
      message: "Success fetch transaction",
    });
  } catch (error) {
    console.log("error:", error);
    return Response.json({
      message: error,
    });
  }
};
