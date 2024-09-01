"use client";

import { useGetCustomers } from "@/actions/hooks";
import React from "react";
import CardUser from "./components/CardUser";
import SearchUser from "./components/SearchUser";

const Customer = ({ searchParams }: { searchParams: { search: string } }) => {
  const { search } = searchParams ?? {};
  const { data: users = [] } = useGetCustomers({ search, page: 1, limit: 10 });

  return (
    <>
      <SearchUser />
      {users?.map((item, index) => (
        <CardUser key={`user-${index}`} data={item} />
      ))}
    </>
  );
};

export default Customer;
