"use client";

import useToggle from "@/utils/hooks/useToggle";
import React, { useCallback } from "react";
import { FiCopy } from "react-icons/fi";
import { TbEdit } from "react-icons/tb";
import { Transaction } from "@prisma/client";
import { toast } from "react-toastify";
import { textContent } from "@/utils/message";
import { MdKeyboardArrowRight } from "react-icons/md";
import dynamic from "next/dynamic";
import { TransactionUpdateStatusPayload } from "@/actions/actions/transaction/Transaction.interface";
import { useUpdateStatusTransaction } from "@/actions/hooks/transaksi";

import { Button } from "@nextui-org/react";
import { useForm } from "@tanstack/react-form";

const ModalEditTransaction = dynamic(
  () => import("./modal/ModalEditTransaction")
);

const ActionTransaction = ({ data }: { data: Transaction }) => {
  const { isOpen, toggle } = useToggle();
  const { mutate, isPending } = useUpdateStatusTransaction();
  const { tanggal_estimasi, status, status_pembayaran, id } = data ?? {};
  // console.log("data:", data);

  const form = useForm<TransactionUpdateStatusPayload>({
    defaultValues: {
      tanggal_estimasi,
      status,
      status_pembayaran,
    },
    onSubmit: async ({ value }) => {
      mutate(
        {
          id,
          data: value,
        },
        {
          onSuccess: toggle,
        }
      );
    },
  });

  const handleCopyStruck = useCallback(() => {
    const message = textContent(data);
    navigator.clipboard.writeText(message);
    toast.success("Copied");
  }, [data]);

  console.log("data:", data);

  return (
    <>
      <div className="flex items-center gap-x-2 ml-auto">
        {/* <Button isIconOnly variant="flat" color="danger" size="sm" radius="full">
        <IoMdClose size={16} />
      </Button> */}
        <Button
          isIconOnly
          variant="flat"
          color="primary"
          size="sm"
          radius="full"
          onPress={toggle}
        >
          <TbEdit size={16} />
        </Button>
        <Button
          isIconOnly
          variant="flat"
          color="success"
          size="sm"
          radius="full"
          onPress={handleCopyStruck}
          isDisabled={data?.status === "diambil"}
        >
          <FiCopy size={16} />
        </Button>
        <Button
          variant="flat"
          size="sm"
          color="primary"
          radius="full"
          endContent={<MdKeyboardArrowRight />}
          className="border-2 border-blue-500"
        >
          Cetak
        </Button>
      </div>
      {isOpen && <ModalEditTransaction data={data} toggle={toggle} />}
    </>
  );
};

export default ActionTransaction;
