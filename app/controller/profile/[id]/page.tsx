"use client";

import { useGetAbsensiDetail } from "@/actions/hooks/absensi";
import { ColorType } from "@/components/atoms/chips/Chips";
import { COLOR_TYPE } from "@/constant/color";
import {
  checkOLDTransaction,
  formatToCurrency,
  getAlias,
} from "@/utils/format";
import { Accordion, AccordionItem, Avatar, Chip } from "@nextui-org/react";
import dayjs from "dayjs";
import { useParams } from "next/navigation";
import React from "react";
import "dayjs/locale/id";
import TransactionCard from "@/components/organisms/transaction-list/TransactionCard";
import BackButton from "@/components/organisms/back/BackButton";

dayjs.locale("id");

const DetailAbsen = () => {
  const { id } = useParams();
  const { data } = useGetAbsensiDetail(id as string);
  const { transactions = [], createdAt } = data ?? {};

  return (
    <>
      <BackButton
        title={`Transaksi (${dayjs(createdAt).format("dddd, DD MMM YYYY")})`}
      />
      <Accordion selectionMode="multiple">
        {transactions.map((item, index) => (
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
                <p>{dayjs(item.createdAt).format("dddd, DD MMM YYYY HH:mm")}</p>
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
              <p className="font-semibold capitalize">{item.customer?.nama}</p>
            }
          >
            <TransactionCard data={item} isOld={checkOLDTransaction(item)} />
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
};

export default DetailAbsen;
