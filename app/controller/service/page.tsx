"use client";

import React from "react";
import CardService from "./components/CardService";
import { useGetServices } from "@/actions/hooks/customer";

const Service = () => {
  const { data } = useGetServices();
  return (
    <>
      {data?.map((item, index) => (
        <CardService key={`service-${index}`} data={item} />
      ))}
    </>
  );
};

export default Service;
