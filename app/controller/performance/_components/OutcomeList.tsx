import React from "react";
import OutcomeCard from "./OutcomeCard";
import { useGetPengeluaran } from "@/actions/hooks/pengeluaran";

const OutcomeList = ({ month, year }: { month: number; year: number }) => {
  const { data: listPengeluaran = [] } = useGetPengeluaran({ month, year });
  return (
    <div className="flex flex-col gap-6">
      {listPengeluaran.map((item, index) => (
        <OutcomeCard key={`outcome-${index}`} data={item} />
      ))}
    </div>
  );
};

export default OutcomeList;
