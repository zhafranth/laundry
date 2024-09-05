"use server";

import { prisma } from "@/lib/prisma";
import dayjs from "dayjs";

export const actionGetAbsen = async (
  userId: string,
  month: number,
  year: number
) => {
  // Mengatur tanggal awal dan akhir bulan menggunakan dayjs
  const startDate = dayjs(new Date(year, month - 1, 1))
    .startOf("month")
    .toDate();
  const endDate = dayjs(new Date(year, month - 1, 1))
    .endOf("month")
    .toDate();
  try {
    const absen = await prisma.absensi.findMany({
      where: {
        userId,
        tanggal: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: {
        transactions: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const total = await prisma.absensi.count({
      where: {
        userId,
        tanggal: {
          gte: startDate,
          lte: endDate,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      status: 200,
      data: absen,
      total,
      message: "Success fetch absensi",
    };
  } catch (error) {
    console.log("error:", error);
    throw new Error("Failed to fetch absensi");
  }
};

export const actionAbsenMasuk = async (userId: string) => {
  const today = dayjs().startOf("day");

  // Cek apakah user sudah melakukan absen masuk untuk hari ini
  const existingAbsensi = await prisma.absensi.findFirst({
    where: {
      userId,
      tanggal: {
        gte: today.toDate(),
        lt: today.add(1, "day").toDate(),
      },
    },
  });

  if (existingAbsensi) {
    return { message: "Anda sudah melakukan absen masuk hari ini." };
  }

  // Catat absen masuk
  const absensi = await prisma.absensi.create({
    data: {
      userId,
      tanggal: new Date(),
      jam_masuk: new Date(),
      lokasi: "Lokasi absensi", // Ganti dengan lokasi yang sesuai
    },
  });

  return { message: "Absen masuk berhasil.", absensi };
};

export const actionAbsenKeluar = async (userId: string) => {
  const today = dayjs().startOf("day");

  // Cek apakah user sudah melakukan absen masuk untuk hari ini
  const absensi = await prisma.absensi.findFirst({
    where: {
      userId,
      tanggal: {
        gte: today.toDate(),
        lt: today.add(1, "day").toDate(),
      },
      jam_keluar: null, // Pastikan jam_keluar belum diisi
    },
  });

  if (!absensi) {
    return {
      message:
        "Anda belum melakukan absen masuk hari ini atau sudah melakukan absen keluar.",
    };
  }

  // Catat absen keluar
  const updatedAbsensi = await prisma.absensi.update({
    where: { id: absensi.id },
    data: { jam_keluar: new Date() },
  });

  return { message: "Absen keluar berhasil.", updatedAbsensi };
};
