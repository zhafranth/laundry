import { formatToCurrency } from "@/utils/format";
import dayjs from "dayjs";
import React, { useCallback } from "react";
import "dayjs/locale/id"; // Import locale bahasa Indonesia
import { Button } from "@nextui-org/react";
import { FaX } from "react-icons/fa6";
import { IPengeluaran } from "@/actions/actions/pengeluaran/Pengeluaran.interface";
import { usePengeluaran } from "@/actions/hooks/pengeluaran";

dayjs.locale("id");

const OutcomeCard = ({ data }: { data: IPengeluaran }) => {
  const { mutateDeletePengeluaran, pendingDelete } = usePengeluaran();
  const { harga, createdAt, kategori, jumlah, id } = data ?? {};
  const { nama } = kategori ?? {};

  const handleDeletePengeluaran = useCallback(
    () => mutateDeletePengeluaran(id),
    [id, mutateDeletePengeluaran]
  );
  return (
    <div className="flex gap-x-4 items-center">
      <div className="w-2 h-2 rounded-full bg-blue-500" />
      <p className="w-7/12">
        {nama} <span className="text-slate-500">x {jumlah}</span>
      </p>
      <p>{dayjs(createdAt).format("dddd, DD MMM YYYY")}</p>
      <p className="font-semibold w-[100px]">{formatToCurrency(harga)}</p>
      <Button
        className="ml-auto"
        isIconOnly
        variant="flat"
        size="sm"
        radius="full"
        color="danger"
        isLoading={pendingDelete}
        onClick={handleDeletePengeluaran}
      >
        <FaX />
      </Button>
    </div>
  );
};

export default OutcomeCard;
