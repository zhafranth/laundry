import Image from "next/image";
import React from "react";

const Empty = () => {
  return (
    <div className="h-[80vh] w-full flex flex-col justify-center items-center">
      <Image alt="empty" src="/images/empty.svg" width={400} height={500} />
      <p className="mt-4 text-blue-800">Masih kosong bang messi...</p>
    </div>
  );
};

export default Empty;
