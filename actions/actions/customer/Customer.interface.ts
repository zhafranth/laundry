import type { Customer } from "@prisma/client";

export type CustomerPayload = Omit<
  Customer,
  "point_setrika" | "point_lipat" | "id"
>;
