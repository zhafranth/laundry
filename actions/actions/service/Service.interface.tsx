import { Service } from "@prisma/client";

export type ServicePayload = Omit<Service, "id">;
