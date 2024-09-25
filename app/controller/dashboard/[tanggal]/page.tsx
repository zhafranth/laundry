"use client";

import { useGetIncomeTransaction } from "@/actions/hooks/dashboard";
import { useGetTransactions } from "@/actions/hooks/transaksi";
import Loading from "@/components/atoms/loading";
import BackButton from "@/components/organisms/back/BackButton";
import { formatToCurrency } from "@/utils/format";
import { Divider } from "@nextui-org/react";
import { useParams } from "next/navigation";
import React from "react";
import { LuDot } from "react-icons/lu";

const DetailTransaksi = () => {
  const { tanggal } = useParams();

  const { data = [], isLoading } = useGetTransactions({
    startDate: tanggal as string,
    endDate: tanggal as string,
  });

  return (
    <div>
      <BackButton title="Detail" />
      <Divider className="my-5" />
      {isLoading && <Loading />}
      {data?.map((item, index) => (
        <div
          className="px-4 py-2 rounded-md bg-blue-100 bg-opacity-50 mb-3 flex items-center gap-x-2"
          key={index}
        >
          <p className="font-semibold">
            {item.customer?.nama || "-"}{" "}
            <span className="block font-normal">{item.layanan?.nama}</span>
          </p>
          <p className="ml-auto">{formatToCurrency(item.harga || 0)}</p>
          <LuDot />
          <p className="">{item.berat} Kg</p>
        </div>
      ))}
    </div>
  );
};

export default DetailTransaksi;
