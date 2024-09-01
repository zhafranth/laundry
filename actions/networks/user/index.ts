import {
  actionCreateUser,
  actionDeleteUser,
  actionGetProfile,
  actionGetUser,
  actionGetUsers,
  actionUpdateUser,
} from "@/actions/actions/user";
import { UserPayload } from "@/actions/actions/user/User.interface";
import { ApiResponse, Params } from "@/actions/interface";
import { User } from "@prisma/client";

export const getProfile = async () => {
  const response = await actionGetProfile();
  return response.user;
};

export const getUsers = async (params?: Params) => {
  const response: ApiResponse<User[]> = await actionGetUsers(params);
  return response.data;
};
export const getUser = async (id?: string) => {
  const response = await actionGetUser(id);
  return response.data;
};

export const createUser = async (data: UserPayload) => {
  const response = await actionCreateUser(data);
  return response;
};
export const updateUser = async (id: string, data: UserPayload) => {
  const response = await actionUpdateUser(id, data);
  return response;
};
export const deleteUser = async (id: string) => {
  const response = await actionDeleteUser(id);
  return response;
};
