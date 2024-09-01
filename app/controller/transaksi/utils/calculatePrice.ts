import { Customer, Service } from "@prisma/client";

export const calculatePrice = (
  berat: number,
  service?: Service,
  customer?: Customer
) => {
  const { harga = 0, type_point } = service ?? {};
  const { point_lipat, point_setrika } = customer ?? {};

  // Cek apakah type_point kosong, atau jika bukan kosong, apakah point terkait berbeda dari 11
  if (
    type_point === "kosong" ||
    (type_point === "setrika" && point_setrika !== 11) ||
    (type_point === "lipat" && point_lipat !== 11)
  ) {
    return berat * harga;
  }

  return 0;
};
