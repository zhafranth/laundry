import {
  actionCreateCustomer,
  actionGetCustomers,
} from "@/actions/actions/customer";
import { CustomerPayload } from "@/actions/actions/customer/Customer.interface";
import { ApiResponse, Params } from "@/actions/interface";
import { Customer } from "@prisma/client";

export const createCustomer = async (data: CustomerPayload) => {
  const response = await actionCreateCustomer(data);
  return response;
};

type ICustomer = Customer & { _count: { transaction: number } };

export const getCustomers = async (params: Params) => {
  const response: ApiResponse<ICustomer[]> = await actionGetCustomers(params);
  return response.data;
};
