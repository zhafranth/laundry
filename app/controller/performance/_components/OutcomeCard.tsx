import { formatToCurrency } from "@/utils/format";
import dayjs from "dayjs";
import React from "react";
import "dayjs/locale/id"; // Import locale bahasa Indonesia
import { Button } from "@nextui-org/react";
import { FaX } from "react-icons/fa6";

dayjs.locale("id");

const OutcomeCard = () => {
  return (
    <div className="flex gap-x-4 items-center">
      <div className="w-2 h-2 rounded-full bg-blue-500" />
      <p className="text-slate-500 w-7/12">Tabung Gas</p>
      <p>{dayjs("08-20-2024").format("dddd, DD MMM YYYY")}</p>
      <p className="font-semibold w-[100px]">{formatToCurrency(100000)}</p>
      <Button
        className="ml-auto"
        isIconOnly
        variant="flat"
        size="sm"
        radius="full"
        color="danger"
      >
        <FaX />
      </Button>
    </div>
  );
};

export default OutcomeCard;
