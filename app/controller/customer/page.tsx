"use client";

import { useGetCustomers } from "@/actions/hooks";
import React from "react";
import CardUser from "./components/CardUser";
import SearchUser from "./components/SearchUser";
import Loading from "@/components/atoms/loading";

const Customer = ({ searchParams }: { searchParams: { search: string } }) => {
  const { search } = searchParams ?? {};
  const { data: users = [], isFetching } = useGetCustomers({
    search,
    page: 1,
    limit: 10,
  });

  return (
    <>
      <SearchUser />
      {isFetching && !!users ? (
        <div className="w-full h-screen">
          <Loading />
        </div>
      ) : (
        users?.map((item, index) => (
          <CardUser key={`user-${index}`} data={item} />
        ))
      )}
    </>
  );
};

export default Customer;
