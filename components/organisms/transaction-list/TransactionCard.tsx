"use client";

import React from "react";
import LabelValue from "./LabelValue";
import { ITransaction } from "@/actions/actions/transaction/Transaction.interface";
import Chips from "@/components/atoms/chips";
import { STATUS_ENUM } from "@/app/controller/transaksi/constant/status";
import { OptionProps } from "@/components/atoms/chips/Chips";
import ActionTransaction from "./ActionTransaction";

const TransactionCard = ({
  data,
  isOld,
}: {
  data: ITransaction;
  isOld: string;
}) => {
  const { point_lipat, point_setrika, berat = 0, layanan, status } = data ?? {};
  const { nama: namaLayanan = "-" } = layanan ?? {};
  const COLOR_TYPE = {
    off_antrian: "bg-red-50",
    off_selesai: "bg-orange-50",
    passed: "bg-slate-100",
  };
  return (
    <div
      className={`flex flex-wrap sm:flex-nowrap gap-4 items-center rounded-md p-3 ${
        COLOR_TYPE[isOld as keyof typeof COLOR_TYPE]
      }`}
    >
      <LabelValue label="status">
        <Chips
          variant="flat"
          size="sm"
          value={status}
          options={STATUS_ENUM as OptionProps[]}
        />
      </LabelValue>

      <LabelValue label="point setrika">
        <p className="font-bold text-slate-700">{point_setrika}</p>
      </LabelValue>
      <LabelValue label="point lipat">
        <p className="font-bold text-slate-700">{point_lipat}</p>
      </LabelValue>
      <LabelValue label="Berat">{berat} Kg</LabelValue>
      <ActionTransaction data={data} />
    </div>
  );
};

export default TransactionCard;
