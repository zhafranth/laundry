"use client";

import React from "react";
import CardService from "./components/CardService";
import { useGetServices } from "@/actions/hooks/customer";
import Loading from "@/components/atoms/loading";

const Service = () => {
  const { data, isFetching } = useGetServices();

  if (isFetching) {
    return (
      <div className="h-screen w-full">
        <Loading />
      </div>
    );
  }
  return (
    <>
      {data?.map((item, index) => (
        <CardService key={`service-${index}`} data={item} />
      ))}
    </>
  );
};

export default Service;
