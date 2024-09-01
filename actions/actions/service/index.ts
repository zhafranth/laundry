"use server";

import { prisma } from "@/lib/prisma";
import { ServicePayload } from "./Service.interface";
import { Params } from "@/actions/interface";

export const actionCreateService = async (data: ServicePayload) => {
  try {
    await prisma.service.create({
      data,
    });
    return {
      status: 200,
      message: "Success create service",
    };
  } catch (error) {
    console.log("error:", error);
    throw new Error("Failed to create service");
  }
};

export const actionGetServices = async (params?: Params) => {
  try {
    const { limit = 20, page = 1, search } = params ?? {};
    const services = await prisma.service.findMany({
      where: {
        nama: {
          contains: search as string,
        },
      },
      take: +limit,
      skip: +limit * (+page - 1),
    });

    const total = await prisma.service.count({
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
      data: services,
      total,
      message: "Success fetch service",
    };
  } catch (error) {
    console.log("error:", error);
    throw new Error("Failed to fetch service");
  }
};
