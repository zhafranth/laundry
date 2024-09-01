"use server";

import { prisma } from "@/lib/prisma";
import {
  TransactionPayload,
  TransactionUpdateStatusPayload,
} from "./Transaction.interface";
import { generateUniqueID } from "@/utils/format";
import { Params } from "@/actions/interface";

export const actionCreateTransaction = async (data: TransactionPayload) => {
  try {
    const { serviceId, customerId, berat } = data;
    const service = await prisma.service.findUnique({
      where: {
        id: serviceId,
      },
    });

    const { type_point, harga = 0 } = service ?? {};

    const customer = await prisma.customer.findUnique({
      where: {
        id: customerId,
      },
    });

    const point_type = type_point === "lipat" ? "point_lipat" : "point_setrika";
    const point = (customer && customer[point_type]) || 0;

    const point_lipat = customer?.point_lipat || 0;
    const point_setrika = customer?.point_setrika || 0;

    if (type_point !== "kosong") {
      await prisma.customer.update({
        where: {
          id: customerId,
        },
        data: {
          [point_type]: point === 11 ? 0 : point + 1,
        },
      });
    }

    const payload = {
      ...data,
      id: generateUniqueID(8),
      point_lipat: type_point === "lipat" ? point_lipat + 1 : point_lipat,
      point_setrika:
        type_point === "setrika" ? point_setrika + 1 : point_setrika,
      harga: point === 11 ? 0 : berat * harga,
    };
    await prisma.transaction.create({
      data: payload,
    });
    return {
      status: 200,
      message: "Success create transaction",
    };
  } catch (error) {
    console.log("error:", error);
    throw new Error("Failed to create transaction");
  }
};
export const actionUpdateStatusTransaction = async (
  id: string,
  data: TransactionUpdateStatusPayload
) => {
  try {
    await prisma.transaction.update({
      where: {
        id,
      },
      data,
    });

    return {
      status: 200,
      message: "Success update transaction",
    };
  } catch (error) {
    console.log("error:", error);
    throw new Error("Failed to update transaction");
  }
};

export const actionGetTransactions = async (params?: Params) => {
  try {
    const { limit = 20, page = 1, search, status } = params ?? {};
    const transactions = await prisma.transaction.findMany({
      where: {
        status: status as string,
        customer: {
          nama: {
            contains: search as string,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: +limit,
      skip: +limit * (+page - 1),
      include: {
        customer: true,
        layanan: true,
      },
    });

    const total = await prisma.transaction.count({
      where: {
        status: status as string,
        customer: {
          nama: {
            contains: search as string,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: +limit,
      skip: +limit * (+page - 1),
    });

    return {
      status: 200,
      data: transactions,
      total,
      message: "Success fetch transaction",
    };
  } catch (error) {
    console.log("error:", error);
    throw new Error("Failed to fetch transaction");
  }
};
