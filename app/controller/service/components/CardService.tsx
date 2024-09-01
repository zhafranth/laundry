import { formatToCurrency } from "@/utils/format";
import { Button } from "@nextui-org/react";
import { Service } from "@prisma/client";
import React from "react";
import { BsFillXDiamondFill } from "react-icons/bs";
import { FaDollarSign, FaEdit, FaTrash } from "react-icons/fa";
import { FaBasketShopping } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";

const CardService = ({ data }: { data?: Service }) => {
  const { nama, harga, type_point } = data ?? {};
  return (
    <div className="bg-blue-50 px-4 py-5 flex items-center rounded-lg mb-4 border-2 border-blue-400">
      <div className="flex-1">
        <p className="font-semibold text-slate-700">{nama}</p>
        <div className="flex gap-x-5 mt-2">
          <div className="flex gap-x-2 text-sm items-center text-slate-400">
            <div className="w-5 h-5 rounded-md bg-blue-500 text-white flex justify-center items-center">
              <FaDollarSign size={12} />
            </div>
            {formatToCurrency(harga)}
          </div>
          <div className="flex gap-x-2 text-sm items-center text-slate-400">
            <div className="w-5 h-5 rounded-md bg-blue-500 text-white flex justify-center items-center">
              <FaBasketShopping size={12} />
            </div>
            0 Total Transaksi
          </div>
          {type_point !== "kosong" && (
            <div className="flex gap-x-2 text-sm items-center text-slate-400 capitalize">
              <div className="w-5 h-5 rounded-md bg-blue-500 text-white flex justify-center items-center">
                <BsFillXDiamondFill size={12} />
              </div>
              Point {type_point}
            </div>
          )}
        </div>
      </div>
      <div className="flex gap-x-2 ml-auto">
        <Button
          isIconOnly
          variant="flat"
          color="danger"
          radius="full"
          className="font-semibold"
        >
          <IoCloseSharp size={16} />
        </Button>
        <Button isIconOnly variant="flat" color="primary" radius="full">
          <FaEdit />
        </Button>
      </div>
    </div>
  );
};

export default CardService;
