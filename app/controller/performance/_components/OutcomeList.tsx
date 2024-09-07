import React from "react";
import OutcomeCard from "./OutcomeCard";

const OutcomeList = () => {
  const data = [1, 2, 3];
  return (
    <div className="flex flex-col gap-6">
      {data.map((item, index) => (
        <OutcomeCard key={`outcome-${index}`} />
      ))}
    </div>
  );
};

export default OutcomeList;
