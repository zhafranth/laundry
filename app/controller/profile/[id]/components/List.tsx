"use client";

import { useGetAbsensiDetail } from "@/actions/hooks/absensi";
import { useParams } from "next/navigation";
import React from "react";

const List = () => {
  const { id } = useParams();
  const { data } = useGetAbsensiDetail(id as string);
  return <div>List</div>;
};

export default List;
