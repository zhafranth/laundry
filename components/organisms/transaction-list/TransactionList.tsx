"use client";

import {
  Accordion,
  AccordionItem,
  Avatar,
  Chip,
  Spinner,
  Tab,
  Tabs,
} from "@nextui-org/react";
import React, { Key, Suspense, useCallback, useState } from "react";
import { useGetTransactions } from "@/actions/hooks/transaksi";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import TransactionCard from "./TransactionCard";
import { formatToCurrency, getAlias } from "@/utils/format";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import SearchUser from "@/app/controller/customer/components/SearchUser";
import { ITransaction } from "@/actions/actions/transaction/Transaction.interface";
import { ColorType } from "@/components/atoms/chips/Chips";
import Image from "next/image";

dayjs.extend(isSameOrBefore);

const TransactionList = () => {
  const searchParams = useSearchParams();
  const search = (searchParams.get("search") as string) || "";

  const pathname = usePathname();
  const { replace } = useRouter();

  const [activeTab, setActiveTab] = useState("antrian");

  const handleChangeTab = useCallback(
    (value: Key) => {
      const params = new URLSearchParams(searchParams);
      setActiveTab(value as string);
      params.delete("search");
      replace(`${pathname}?${params.toString()}`);
    },
    [pathname, replace, searchParams]
  );

  const checkIsOLD = useCallback((data: ITransaction) => {
    const { createdAt, status } = data;
    const givenDate = createdAt;
    const currentDate = dayjs();

    // Hitung selisih hari
    const diffDays = currentDate.diff(givenDate, "day");

    if (status === "antrian" && diffDays > 3) {
      return "off_antrian";
    }
    if (status === "selesai" && diffDays > 5) {
      return "off_selesai";
    }

    return "passed";
  }, []);

  const COLOR_TYPE = {
    off_antrian: {
      bg: "bg-red-100",
      avatar: "danger",
    },
    off_selesai: {
      bg: "bg-orange-100",
      avatar: "warning",
    },
    passed: {
      bg: "",
      avatar: "primary",
    },
  };

  const { data = [], isLoading } = useGetTransactions({
    status: activeTab,
    search,
  });

  return (
    <div className="mb-20">
      <div className="flex justify-center mb-4">
        <Tabs
          color="primary"
          aria-label="Tabs colors"
          radius="full"
          size="sm"
          selectedKey={activeTab}
          onSelectionChange={handleChangeTab}
        >
          <Tab key="antrian" title="Antrian" className="text-sm" />
          <Tab key="selesai" title="Selesai" className="text-sm" />
          <Tab key="diambil" title="Diambil" className="text-sm" />
        </Tabs>
      </div>
      <SearchUser />
      {isLoading && (
        <div className="h-[70vh] w-full flex justify-center items-center">
          <Spinner size="lg" />
        </div>
      )}
      {data.length === 0 && !isLoading && (
        <div className="h-[70vh] w-full flex flex-col gap-y-2 justify-center items-center">
          <Image
            src="/images/empty-folder.png"
            width={100}
            height={100}
            alt="empty-list"
          />
          <p className="text-slate-400">Tidak ada transaksi...</p>
        </div>
      )}
      <Suspense fallback={<p>Loading...</p>}>
        <Accordion selectionMode="multiple">
          {data.map((item, index) => (
            <AccordionItem
              key={`card-${item.id}-${index}`}
              aria-label={item.customer?.nama}
              startContent={
                <Avatar
                  color={COLOR_TYPE[checkIsOLD(item)].avatar as ColorType}
                  radius="lg"
                  name={getAlias(item.customer?.nama as string)}
                  classNames={{
                    name: "font-semibold text-white",
                    // base: "bg-blue-400",
                  }}
                />
              }
              classNames={{
                title: "text-sm font-semibold",
                base: `${
                  COLOR_TYPE[checkIsOLD(item)].bg as ColorType
                } rounded-md px-2`,
              }}
              subtitle={
                <div className="flex gap-x-3 items-center">
                  <p className="text-xs">
                    {dayjs(item.createdAt).format("DD MMM YYYY, HH:mm")}
                  </p>
                  <div className="w-1 h-1 rounded-full bg-slate-500"></div>
                  <p className="text-xs w-[60px]">
                    {item.harga === 0
                      ? "GRATIS"
                      : formatToCurrency(item.harga as number)}
                  </p>
                  <div className="w-1 h-1 rounded-full bg-slate-500"></div>
                  <Chip
                    variant="flat"
                    color={item.status_pembayaran ? "success" : "danger"}
                    size="sm"
                    classNames={{
                      content: "text-xs",
                    }}
                  >
                    {item.status_pembayaran ? "Lunas" : "Belum Lunas"}
                  </Chip>
                </div>
              }
              title={
                <p className="font-semibold capitalize">
                  {item.customer?.nama}
                </p>
              }
            >
              <TransactionCard data={item} isOld={checkIsOLD(item)} />
            </AccordionItem>
          ))}
        </Accordion>
      </Suspense>
    </div>
  );
};

export default TransactionList;
