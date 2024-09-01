"use client";

import { useParams } from "next/navigation";
import React from "react";

const UpdateTransaksi = () => {
  const { id } = useParams<{ id: string }>();
  return <div>UpdateTransaksi</div>;
};

export default UpdateTransaksi;
