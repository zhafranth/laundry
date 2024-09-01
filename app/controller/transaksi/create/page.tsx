import dynamic from "next/dynamic";
import React from "react";

const BackButton = dynamic(
  () => import("@/components/organisms/back/BackButton")
);
const FormTransaksi = dynamic(() => import("../_components/FormTransaksi"));

const Create = () => {
  return (
    <>
      <BackButton title="Tambah Transaksi" />
      <div className="my-8">
        <FormTransaksi />
      </div>
    </>
  );
};

export default Create;
