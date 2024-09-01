"use server";

import { prisma } from "@/lib/prisma";
import { CustomerPayload } from "./Customer.interface";
import { Params } from "@/actions/interface";

export const actionCreateCustomer = async (data: CustomerPayload) => {
  try {
    await prisma.customer.create({
      data,
    });
    return {
      status: 200,
      message: "Success create customer",
    };
  } catch (error) {
    console.log("error:", error);
    throw new Error("Failed to create customer");
  }
};

export const actionGetCustomers = async (params: Params) => {
  try {
    const { limit = 20, page = 1, search } = params;
    const customers = await prisma.customer.findMany({
      where: {
        nama: {
          contains: search as string,
        },
      },
      take: +limit,
      skip: +limit * (+page - 1),
      include: {
        _count: {
          select: {
            transaction: true,
          },
        },
      },
    });

    const total = await prisma.customer.count({
      where: {
        nama: {
          contains: search as string,
        },
      },
      take: +limit,
      skip: +limit * (+page - 1),
    });
    return {
      status: 200,
      data: customers,
      total,
      message: "Success fetch customer",
    };
  } catch (error) {
    console.log("error:", error);
    throw new Error("Failed to fetch customer");
  }
};
