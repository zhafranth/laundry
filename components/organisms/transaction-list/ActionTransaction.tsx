"use client";

import useToggle from "@/utils/hooks/useToggle";
import React, { useCallback } from "react";
import { FiCopy } from "react-icons/fi";
import { TbEdit } from "react-icons/tb";
import { Transaction } from "@prisma/client";
import { toast } from "react-toastify";
import { textContent } from "@/utils/message";
import { MdKeyboardArrowRight } from "react-icons/md";
// import dynamic from "next/dynamic";
import { TransactionUpdateStatusPayload } from "@/actions/actions/transaction/Transaction.interface";
import { useUpdateStatusTransaction } from "@/actions/hooks/transaksi";
import { STATUS_ENUM } from "@/app/controller/transaksi/constant/status";
import { Radio, Switch } from "@/components/atoms";
import Modal from "@/components/atoms/modal";
import { parseDate } from "@internationalized/date";
import { Button, Chip, DatePicker } from "@nextui-org/react";
import { useForm } from "@tanstack/react-form";
import { IoMdAdd } from "react-icons/io";

// const ModalEditTransaction = dynamic(
//   () => import("./modal/ModalEditTransaction")
// );

const ActionTransaction = ({ data }: { data: Transaction }) => {
  const { isOpen, toggle } = useToggle();
  const { mutate } = useUpdateStatusTransaction();
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
      {isOpen && (
        <Modal title="Update Transaksi" isOpen onClose={toggle} removeAction>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
            className="flex flex-col gap-y-5 mb-4"
          >
            <form.Field name="status_pembayaran" defaultValue={false}>
              {(field) => {
                return (
                  <>
                    <p className="text-sm text-slate-600 font-semibold">
                      Status Pembayaran
                    </p>
                    <Switch
                      name={field.name}
                      isSelected={field.state.value as boolean}
                      onValueChange={field.handleChange}
                      checkText={
                        <Chip size="sm" color="success" variant="flat">
                          Lunas
                        </Chip>
                      }
                      uncheckText={
                        <Chip size="sm" color="danger" variant="flat">
                          Belum Lunas
                        </Chip>
                      }
                    />
                  </>
                );
              }}
            </form.Field>

            <div className="flex-1">
              <form.Field
                name="status"
                defaultValue="antrian"
                validators={{
                  onChangeListenTo: ["status_pembayaran"],
                  onChange: ({ value, fieldApi }) => {
                    if (
                      fieldApi.form.getFieldValue("status_pembayaran") ===
                        false &&
                      value === "diambil"
                    ) {
                      return "Pastikan lunas terlebih dahulu";
                    }
                    return undefined;
                  },
                }}
              >
                {(field) => {
                  return (
                    <Radio
                      radioGroup={{
                        orientation: "horizontal",
                        label: "Status",
                        size: "sm",
                        color: "primary",
                        classNames: {
                          label: "text-sm text-slate-600 font-semibold",
                        },
                        name: field.name,
                        value: field.state.value as string,
                        isInvalid: field.state.meta.errors.length > 0,
                        errorMessage: field.state.meta.errors,
                        onValueChange: field.handleChange,
                      }}
                      radio={{
                        classNames: {
                          label: "text-slate-500",
                        },
                      }}
                      options={STATUS_ENUM}
                    />
                  );
                }}
              </form.Field>
            </div>
            <div className="flex-1">
              <form.Field name="tanggal_estimasi">
                {(field) => {
                  return (
                    <DatePicker
                      name={field.name}
                      value={parseDate(field.state.value as string)}
                      onChange={(e) =>
                        field.handleChange(e as unknown as string)
                      }
                      label={"Estimasi Selesai"}
                      labelPlacement="outside"
                      size="sm"
                      dateInputClassNames={{
                        label: "text-sm text-slate-600 font-semibold",
                        inputWrapper: "bg-white group-hover:bg-slate-50",
                      }}
                    />
                  );
                }}
              </form.Field>
            </div>
            <Button
              color="primary"
              radius="none"
              className="rounded-md"
              startContent={<IoMdAdd />}
              type="submit"
            >
              Simpan
            </Button>
          </form>
        </Modal>
      )}
    </>
  );
};

export default ActionTransaction;
