"use client";

import Radio from "@/components/atoms/radio";
import Switch from "@/components/atoms/switch";
import { Input, DatePicker, Textarea, Chip, Button } from "@nextui-org/react";
import React, { Key, useCallback, useMemo, useState } from "react";
import { IoLogoWhatsapp, IoMdAdd } from "react-icons/io";
import AddCustomers from "./AddCustomers";
import { IoLocationSharp } from "react-icons/io5";
import { TbHexagonPlusFilled } from "react-icons/tb";
import { useGetCustomers } from "@/actions/hooks";
import { Autocomplete } from "@/components/atoms";
import { debounce } from "lodash";
import { Customer, Service } from "@prisma/client";
import { useGetServices } from "@/actions/hooks/customer";
import { parseDate } from "@internationalized/date";
import { useForm } from "@tanstack/react-form";
import { TransactionPayload } from "@/actions/actions/transaction/Transaction.interface";
import { formatToCurrency } from "@/utils/format";
import { calculatePrice } from "../utils/calculatePrice";
import { useTransaction } from "@/actions/hooks/transaksi";
import { useRouter } from "next/navigation";
import { STATUS_ENUM } from "../constant/status";

const FormTransaksi = () => {
  const [search, setSearch] = useState<string | undefined>();
  const [customer, setCustomer] = useState<Customer | undefined>();
  const [service, setService] = useState<Service | undefined>();

  const { mutateCreateTransaction } = useTransaction();

  const dateNow = new Date().toISOString().split("T")[0];

  const router = useRouter();

  const form = useForm<TransactionPayload>({
    onSubmit: async ({ value }) => {
      const { serviceId, customerId, berat, ...restValue } = value;
      const payload = {
        serviceId: Number(serviceId),
        customerId: Number(customerId),
        berat: Number(berat),
        ...restValue,
      };
      mutateCreateTransaction(payload, {
        onSuccess: () => router.back(),
      });
    },
  });

  const {
    alamat,
    no_telp,
    point_lipat = 0,
    point_setrika = 0,
  } = customer ?? {};

  const { data: users = [], isFetching: loadingUsers } = useGetCustomers(
    { search },
    { enabled: !!search }
  );
  const { data: services = [], isFetching: loadingService } = useGetServices();

  const USERS_OPTIONS = useMemo(
    () => users?.map((item) => ({ label: item.nama, value: item.id })),
    [users]
  );

  const SERVICES_OPTIONS = useMemo(
    () => services?.map((item) => ({ label: item.nama, value: item.id })),
    [services]
  );

  const onSearchCustomer = debounce((value: string) => setSearch(value), 1500);

  const handleSelectCustomer = useCallback(
    (key?: Key | null) => {
      const selectedCustomer = users?.find((item) => item.id === Number(key));
      setCustomer(selectedCustomer);
    },
    [users]
  );

  const handleSelectService = useCallback(
    (key?: Key | null) => {
      const selectedService = services?.find((item) => item.id === Number(key));
      setService(selectedService);
    },
    [services]
  );

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <div className="flex flex-col gap-y-6">
          <form.Field
            name="customerId"
            validators={{
              onChange: ({ value }) =>
                !value ? "This field is required" : undefined,
            }}
          >
            {(field) => {
              return (
                <Autocomplete
                  isLoading={loadingUsers}
                  name={field.name}
                  selectedKey={field.state.value as number}
                  isInvalid={field.state.meta.errors.length > 0}
                  errorMessage={field.state.meta.errors}
                  labelPlacement="outside"
                  label="Nama Pelanggan"
                  placeholder="Input nama pelanggan"
                  onInputChange={onSearchCustomer}
                  onSelectionChange={(e) => {
                    field.handleChange(e as number);
                    handleSelectCustomer(e);
                  }}
                  options={USERS_OPTIONS}
                />
              );
            }}
          </form.Field>

          <div className="flex gap-x-4">
            <div className="w-2/4">
              <p className="flex  items-center gap-x-2 text-xs text-slate-500 mb-1">
                <IoLocationSharp />
                Alamat
              </p>
              <p className="text-sm font-semibold">{alamat || "-"}</p>
            </div>
            <div className="w-1/4">
              <p className="flex  items-center gap-x-2 text-xs text-slate-500 mb-1">
                <IoLogoWhatsapp /> No. Telp
              </p>
              <p className="text-sm font-semibold">{no_telp || "-"}</p>
            </div>

            <div className="w-1/4">
              <p className="flex  items-center gap-x-2 text-xs text-slate-500 mb-1">
                <TbHexagonPlusFilled />
                Point Setrika
              </p>
              <p className="text-sm font-semibold">{point_setrika}</p>
            </div>
            <div className="w-1/4">
              <p className="flex  items-center gap-x-2 text-xs text-slate-500 mb-1">
                <TbHexagonPlusFilled />
                Point Lipat
              </p>
              <p className="text-sm font-semibold">{point_lipat}</p>
            </div>
          </div>
          <AddCustomers />
        </div>
        <div className="bg-slate-100 border border-slate-300 w-full py-4 px-6 rounded-lg my-10 flex gap-x-6">
          <form.Field name="status_pembayaran" defaultValue={false}>
            {(field) => {
              return (
                <div className="w-1/4">
                  <p className="text-sm mb-2 text-slate-600 font-semibold">
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
                </div>
              );
            }}
          </form.Field>

          <div className="flex-1">
            <form.Field name="status" defaultValue="antrian">
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
            <form.Field name="tanggal_estimasi" defaultValue={dateNow}>
              {(field) => {
                return (
                  <DatePicker
                    name={field.name}
                    value={parseDate(field.state.value as string)}
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
        </div>
        <div className="flex flex-col gap-y-6">
          <form.Field
            name="serviceId"
            validators={{
              onChange: ({ value }) =>
                !value ? "This field is required" : undefined,
            }}
          >
            {(field) => {
              return (
                <Autocomplete
                  name={field.name}
                  selectedKey={field.state.value as number}
                  isInvalid={field.state.meta.errors.length > 0}
                  errorMessage={field.state.meta.errors}
                  labelPlacement="outside"
                  label="Tipe Layanan"
                  placeholder="Pilih layanan"
                  isLoading={loadingService}
                  options={SERVICES_OPTIONS}
                  onSelectionChange={(e) => {
                    field.handleChange(e as number);
                    handleSelectService(e);
                  }}
                />
              );
            }}
          </form.Field>
          <form.Field
            name="berat"
            validators={{
              onChange: ({ value }) =>
                !value ? "This field is required" : undefined,
            }}
          >
            {(field) => {
              return (
                <Input
                  name={field.name}
                  value={String(field.state.value)}
                  isInvalid={field.state.meta.errors.length > 0}
                  errorMessage={field.state.meta.errors}
                  onChange={(e) =>
                    field.handleChange(e.target.value as unknown as number)
                  }
                  placeholder="Berat"
                  label="Berat"
                  description={
                    field.state.value &&
                    service && (
                      <p className="text-lg">
                        Total Harga :{" "}
                        <span className="font-semibold">
                          {formatToCurrency(
                            calculatePrice(field.state.value, service, customer)
                          )}
                        </span>
                      </p>
                    )
                  }
                  isDisabled={!service}
                  labelPlacement="outside"
                  type="number"
                  pattern="/^\d+$/"
                  endContent="Kg"
                  classNames={{
                    label: "font-semibold text-slate-200",
                    inputWrapper:
                      "bg-slate-50 group-hover:bg-slate-100 rounded-lg border-slate-300 border-1",
                  }}
                />
              );
            }}
          </form.Field>
          <form.Field name="note">
            {(field) => {
              return (
                <Textarea
                  name={field.name}
                  value={field.state.value as string}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Note"
                  label="Note"
                  description="Optional"
                  labelPlacement="outside"
                  classNames={{
                    label: "font-semibold text-slate-200",
                    inputWrapper:
                      "bg-slate-50 group-hover:bg-slate-100 rounded-lg border-slate-300 border-1",
                  }}
                />
              );
            }}
          </form.Field>

          <Button
            color="primary"
            radius="none"
            className="rounded-md"
            startContent={<IoMdAdd />}
            type="submit"
          >
            Simpan
          </Button>
        </div>
      </form>
    </>
  );
};

export default FormTransaksi;
