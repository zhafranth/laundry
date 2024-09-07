"use client";

import useToggle from "@/utils/hooks/useToggle";
import React, { useCallback } from "react";
import { FiCopy } from "react-icons/fi";
import { TbEdit } from "react-icons/tb";
import { Transaction } from "@prisma/client";
import { toast } from "react-toastify";
import { textContent } from "@/utils/message";
import dynamic from "next/dynamic";

import { Button } from "@nextui-org/react";
const ModalEditTransaction = dynamic(
  () => import("./modal/ModalEditTransaction")
);
const ButtonPrint = dynamic(() => import("./ButtonPrint"));

const ActionTransaction = ({ data }: { data: Transaction }) => {
  const { isOpen, toggle } = useToggle();
  const { status } = data ?? {};

  const handleCopyStruck = useCallback(() => {
    const message = textContent(data);
    navigator.clipboard.writeText(message);
    toast.success("Copied");
  }, [data]);

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
          isDisabled={status === "diambil"}
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
          isDisabled={status === "diambil"}
        >
          <FiCopy size={16} />
        </Button>
        <ButtonPrint data={data} />
      </div>
      {isOpen && <ModalEditTransaction data={data} toggle={toggle} />}
    </>
  );
};

export default ActionTransaction;
