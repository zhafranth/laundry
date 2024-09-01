"use client";

import { Input } from "@nextui-org/react";
import React, { useCallback, useEffect, useState } from "react";
import debounce from "lodash/debounce";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { FaSearch } from "react-icons/fa";

const SearchUser = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const [searchName, setsearchName] = useState("");

  const pathname = usePathname();
  const { push } = useRouter();

  const handleLink = debounce((value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("search", value as unknown as string);
    } else {
      params.delete("search");
    }

    push(`${pathname}?${params}`);
  }, 2000);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setsearchName(value);
    handleLink(value);
  };

  useEffect(() => {
    setsearchName(search || "");
  }, [search]);

  return (
    <>
      <Input
        placeholder="Search Customer"
        size="md"
        onChange={handleSearch}
        value={searchName as string}
        width="200px"
        isClearable
        radius="full"
        startContent={<FaSearch className="text-slate-400" />}
      />
    </>
  );
};

export default SearchUser;
