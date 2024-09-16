import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url); // Langsung akses searchParams dari request.nextUrl
  const year = Number(searchParams.get("year") || 2024);
  const month = Number(searchParams.get("month") || 1);

  try {
    const transaction = await prisma.$queryRaw`
        SELECT 
    MONTH(createdAt) as bulan, 
    YEAR(createdAt) as tahun, 
    DATE(createdAt) as tanggal, 
    CAST(COUNT(id) AS FLOAT) as jumlah_transaksi, 
    CAST(SUM(harga) as FLOAT) as total_transaksi 
  FROM Transaction 
  WHERE MONTH(createdAt) = ${month} 
    AND YEAR(createdAt) = ${year} 
  GROUP BY bulan, tahun, tanggal;
      `;

    return Response.json({
      status: 200,
      data: transaction,
      message: "Success fetch transaction",
    });
  } catch (error) {
    console.log("error:", error);
    return Response.json({
      message: error,
    });
  }
};
