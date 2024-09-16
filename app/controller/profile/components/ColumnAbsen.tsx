import dayjs from "dayjs";
import React, { useCallback } from "react";

const ColumnAbsen = ({
  jam,
  type,
}: {
  jam?: Date | null;
  type: "masuk" | "keluar";
}) => {
  const checkAbsen = useCallback((): boolean => {
    const inputDate = dayjs(jam);
    const time = type === "masuk" ? 9 : 19;
    const cutOffTime = inputDate.hour(time).minute(0).second(0);
    const checker = type === "masuk" ? "isAfter" : "isBefore";

    return inputDate[checker](cutOffTime);
  }, [jam, type]);

  if (!jam) {
    return "-";
  }
  return (
    <>
      {checkAbsen() ? (
        <p className="px-2 py-1 inline-block rounded-md bg-warning-100 text-warning-600">
          {dayjs(jam).format("HH:mm:ss")}
        </p>
      ) : (
        dayjs(jam).format("HH:mm:ss")
      )}
    </>
  );
};

export default ColumnAbsen;
