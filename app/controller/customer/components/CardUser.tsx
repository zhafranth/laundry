import { Customer } from "@prisma/client";
import React from "react";
import { BiPlusMedical } from "react-icons/bi";
import { FaPhone } from "react-icons/fa";
import { TbHexagonPlusFilled } from "react-icons/tb";

const CardUser = ({
  data,
}: {
  data: Customer & { _count: { transaction: number } };
}) => {
  const { nama, point_setrika, point_lipat, no_telp, _count } = data ?? {};
  return (
    <div className="px-3 py-6 flex gap-x-4 items-center border-b border-slate-200">
      <div className="w-14 h-14 rounded-full bg-blue-600 flex justify-center items-center text-white font-semibold">
        A
      </div>
      <div>
        <p className="text-slate-600 font-semibold capitalize mb-1">{nama}</p>
        <div className="flex gap-x-4">
          <p className="text-sm text-slate-400 flex items-center gap-x-1">
            <BiPlusMedical /> {_count.transaction || 0} (Total Transaksi)
          </p>
          <p className="text-sm text-slate-400 flex items-center gap-x-1">
            <TbHexagonPlusFilled /> {point_setrika} (Setrika)
          </p>
          <p className="text-sm text-slate-400 flex items-center gap-x-1">
            <TbHexagonPlusFilled /> {point_lipat} (Lipat)
          </p>
          <p className="text-sm text-slate-400 flex items-center gap-x-1">
            <FaPhone /> {no_telp}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardUser;
