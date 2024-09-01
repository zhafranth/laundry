import {
  actionCreateService,
  actionGetServices,
} from "@/actions/actions/service";
import { ServicePayload } from "@/actions/actions/service/Service.interface";
import { ApiResponse, Params } from "@/actions/interface";
import { Service } from "@prisma/client";

export const createService = async (data: ServicePayload) => {
  const response = await actionCreateService(data);
  return response;
};

export const getServices = async (params?: Params) => {
  const response: ApiResponse<Service[]> = await actionGetServices(params);
  return response.data;
};
