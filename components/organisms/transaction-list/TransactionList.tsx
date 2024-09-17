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
import {
  checkOLDTransaction,
  formatToCurrency,
  getAlias,
} from "@/utils/format";
import dayjs from "dayjs";
import "dayjs/locale/id";
import SearchUser from "@/app/controller/customer/components/SearchUser";
import { ITransaction } from "@/actions/actions/transaction/Transaction.interface";
import { ColorType } from "@/components/atoms/chips/Chips";
import Image from "next/image";
import { toast } from "react-toastify";
import { COLOR_TYPE } from "@/constant/color";

dayjs.locale("id");

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

  const handleCopyID = useCallback((data: ITransaction) => {
    const { customer, id, createdAt, harga } = data ?? {};
    const { nama } = customer ?? {};
    const message = `${nama} - ${dayjs(createdAt).format(
      "dddd, DD MMM YYYY HH:mm"
    )} - ${formatToCurrency(harga || 0)} - #${id}`;
    navigator.clipboard.writeText(message);
    toast.success("Copied");
  }, []);

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
                  color={
                    COLOR_TYPE[checkOLDTransaction(item)].avatar as ColorType
                  }
                  radius="lg"
                  name={getAlias(item.customer?.nama as string)}
                  className="hidden sm:block"
                  classNames={{
                    name: "font-semibold text-white",
                  }}
                  onClick={() => handleCopyID(item)}
                />
              }
              classNames={{
                title: "text-sm font-semibold",
                base: `${
                  COLOR_TYPE[checkOLDTransaction(item)].bg as ColorType
                } rounded-md px-2`,
              }}
              subtitle={
                <div className="flex flex-wrap sm:flex-nowrap gap-x-2 sm:gap-x-3 items-center text-[10px] sm:text-xs">
                  <p>
                    {dayjs(item.createdAt).format("dddd, DD MMM YYYY HH:mm")}
                  </p>
                  <div className="w-1 h-1 rounded-full bg-slate-500"></div>
                  <p className="w-[65px]">
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
                      content: "",
                    }}
                  >
                    {item.status_pembayaran ? "Lunas" : "Belum Lunas"}
                  </Chip>
                  <div className="w-1 h-1 rounded-full bg-slate-500"></div>
                  <p className="font-semibold">{item.layanan?.nama || "-"}</p>
                </div>
              }
              title={
                <p className="font-semibold capitalize">
                  {item.customer?.nama}
                </p>
              }
            >
              <TransactionCard data={item} isOld={checkOLDTransaction(item)} />
            </AccordionItem>
          ))}
        </Accordion>
      </Suspense>
    </div>
  );
};

export default TransactionList;
