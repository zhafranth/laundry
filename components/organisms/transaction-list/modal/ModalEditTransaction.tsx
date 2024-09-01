"use client";

import { TransactionUpdateStatusPayload } from "@/actions/actions/transaction/Transaction.interface";
import {
  useGetTransaction,
  useUpdateStatusTransaction,
} from "@/actions/hooks/transaksi";
import { STATUS_ENUM } from "@/app/controller/transaksi/constant/status";
import { Radio, Switch } from "@/components/atoms";
import Modal from "@/components/atoms/modal";
import { parseDate } from "@internationalized/date";
import { Button, Chip, DatePicker, Spinner } from "@nextui-org/react";
import { Transaction } from "@prisma/client";
import { useForm } from "@tanstack/react-form";
import React from "react";
import { IoMdAdd } from "react-icons/io";

const ModalEditTransaction = ({
  toggle,
  data,
}: {
  toggle: () => void;
  data: Transaction;
}) => {
  const { mutate, isPending } = useUpdateStatusTransaction();
  const { id } = data ?? {};
  const { data: detail, isLoading } = useGetTransaction(id);

  const { status = "", status_pembayaran, tanggal_estimasi } = detail ?? {};

  const form = useForm<TransactionUpdateStatusPayload>({
    defaultValues: {
      tanggal_estimasi: tanggal_estimasi ?? "",
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

  return (
    <Modal title="Update Transaksi" isOpen onClose={toggle} removeAction>
      {isLoading && !detail ? (
        <div className="flex min-h-48 justify-center items-center">
          <Spinner size="lg" />
        </div>
      ) : (
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
                    value={
                      field.state.value
                        ? parseDate(field.state.value as string)
                        : null
                    }
                    onChange={(e) => field.handleChange(e as unknown as string)}
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
            isLoading={isPending}
          >
            Simpan
          </Button>
        </form>
      )}
    </Modal>
  );
};

export default ModalEditTransaction;
