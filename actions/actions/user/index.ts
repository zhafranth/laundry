"use server";

import { Params } from "@/actions/interface";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

import mime from "mime";
import { join } from "path";
import { stat, mkdir, writeFile, rm } from "fs/promises";
import { UserPayload } from "./User.interface";
import { authOptions } from "@/config/authOptions";

export const actionCreateUser = async (data: UserPayload) => {
  try {
    await prisma.user.create({
      data,
    });

    return {
      status: 200,
      message: "Success create user",
    };
  } catch (error) {
    console.log("error:", error);
    throw new Error("Failed to create user");
  }
};

export const actionUpdateUser = async (id: string, data: UserPayload) => {
  try {
    await prisma.user.update({
      where: {
        id,
      },
      data,
    });

    return {
      status: 200,
      message: "Success update user",
    };
  } catch (error) {
    console.log("error:", error);
    throw new Error("Failed to update user");
  }
};

export const actionDeleteUser = async (id: string) => {
  try {
    await prisma.user.delete({
      where: {
        id,
      },
    });

    return {
      status: 200,
      message: "Success delete user",
    };
  } catch (error) {
    console.log("error:", error);
    throw new Error("Failed to delete user");
  }
};

export const actionGetProfile = async () => {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.username) {
      throw new Error("Invalid credentials");
    }

    const user = await prisma?.user.findUnique({
      omit: {
        password: true,
      },
      where: {
        username: session.user.username,
      },
    });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    return { user };
  } catch (error) {
    throw new Error("Failed to get profile");
  }
};

export const actionGetUser = async (id?: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    return {
      status: 200,
      data: user,
      message: "Success fetch user",
    };
  } catch (error) {
    console.log("error:", error);
    throw new Error("Failed to fetch user");
  }
};

export const actionGetUsers = async (params?: Params) => {
  try {
    const { limit = 20, page = 1, search } = params ?? {};
    const users = await prisma.user.findMany({
      where: {
        name: {
          contains: search as string,
        },
      },
      take: +limit,
      skip: +limit * (+page - 1),
    });

    return {
      status: 200,
      data: users,
      message: "Success fetch users",
    };
  } catch (error) {
    console.log("error:", error);
    throw new Error("Failed to fetch users");
  }
};

export const uploadPhotoProfile = async (formData: FormData) => {
  const file = (formData.get("file") as File) || "";
  const path = (formData.get("path") as string) || "";

  const buffer = Buffer.from(await file.arrayBuffer());
  const relativeUploadDir = `/uploads/${path}`;

  const uploadDir = join(process.cwd(), "public", relativeUploadDir);

  try {
    await stat(uploadDir);
  } catch (e: any) {
    if (e.code === "ENOENT") {
      // This is for checking the directory is exist (ENOENT : Error No Entry)
      await mkdir(uploadDir, { recursive: true });
    } else {
      console.error(
        "Error while trying to create directory when uploading a file\n",
        e
      );
      return { status: 500 };
    }
  }

  try {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const filename = `${uniqueSuffix}.${mime.getExtension(file.type)}`;
    await writeFile(`${uploadDir}/${filename}`, buffer);
    const fileUrl = `${relativeUploadDir}/${filename}`;

    return {
      data: fileUrl,
      status: 200,
      message: "successfully upload profile",
    };
  } catch (e) {
    console.error("Error while trying to upload a file\n", e);
    return { status: 500, message: "Failed Upload file" };
  }
};

export const removePhotoProfile = async (url: string) => {
  const filePath = join(process.cwd(), "public", url as string);

  try {
    await rm(filePath as string);
  } catch (e) {
    console.log("Error remove file", e);
  }
};
