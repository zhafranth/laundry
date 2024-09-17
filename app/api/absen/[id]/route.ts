import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const GET = async (
  _req: Request,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  try {
    const absen = await prisma.absensi.findUnique({
      where: {
        id: Number(id) || 16,
      },
      include: {
        transactions: {
          include: {
            customer: true,
            layanan: true,
          },
        },
      },
    });

    return Response.json({
      status: 200,
      data: absen,
      message: "Success fetch detail absen",
    });
  } catch (error) {
    console.log("error:", error);
    return Response.json({
      message: "error",
    });
  }
};
