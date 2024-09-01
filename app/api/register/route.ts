"use server";

import { prisma } from "@/lib/prisma";

export const POST = async (req: Request) => {
  try {
    const data = await req.json();
    const { name, username, password, role } = data ?? {};

    await prisma.user.create({
      data: {
        name,
        username,
        password,
        role,
      },
    });

    return Response.json({
      message: "success create user",
    });
  } catch (error) {
    console.log("error:", error);
    return Response.json({
      message: "error",
    });
  }
};
