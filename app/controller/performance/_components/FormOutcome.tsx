"use client";

import { PengeluaranPayload } from "@/actions/actions/pengeluaran/Pengeluaran.interface";
import {
  useGetKategoriPengeluaran,
  usePengeluaran,
} from "@/actions/hooks/pengeluaran";
import useToggle from "@/utils/hooks/useToggle";
import { styleInput } from "@/utils/style";
import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import { useForm } from "@tanstack/react-form";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import React, { useMemo } from "react";
import { IoMdAdd } from "react-icons/io";
import { useGetOptionsKategori } from "../_hooks";

const BackButton = dynamic(
  () => import("@/components/organisms/back/BackButton")
);
const ModalKategori = dynamic(() => import("./ModalKategori"));

const FormOutcome = () => {
  const { isOpen, toggle } = useToggle();
  const { mutateCreatePengeluaran } = usePengeluaran();
  const kategoriOptions = useGetOptionsKategori();

  const router = useRouter();
  const form = useForm<PengeluaranPayload>({
    onSubmit: async ({ value }) => {
      const { harga, jumlah, kategoriId } = value;
      const payload = {
        ...value,
        harga: Number(harga),
        jumlah: Number(jumlah),
        kategoriId: Number(kategoriId),
      };
      mutateCreatePengeluaran(payload, {
        onSuccess: () => router.back(),
      });
      // if (id) {
      //   return mutateUpdateUser(
      //     { data: value, id },
      //     {
      //       onSuccess: router.back,
      //     }
      //   );
      // }
      // return mutateCreateUser(value as User, {
      //   onSuccess: router.back,
      // });
    },
  });

  return (
    <>
      <BackButton title="Input Pengeluaran" />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="my-10 flex flex-col gap-y-8"
      >
        <form.Field
          name="kategoriId"
          validators={{
            onChange: ({ value }) =>
              !value ? "This field is required" : undefined,
          }}
        >
          {(field) => {
            return (
              <Select
                label="Kategori"
                placeholder="Kategori"
                labelPlacement="outside"
                name={field.name}
                selectedKeys={[field.state.value] as number[]}
                onChange={(event) =>
                  field.handleChange(event.target.value as unknown as number)
                }
                isInvalid={field.state.meta.errors.length > 0}
                errorMessage={field.state.meta.errors}
                items={kategoriOptions}
              >
                {kategoriOptions?.map((item) => (
                  <SelectItem key={item.value}>{item.label}</SelectItem>
                ))}
              </Select>
            );
          }}
        </form.Field>
        <Button variant="flat" color="primary" radius="sm" onClick={toggle}>
          Tambah Kategori
        </Button>
        <form.Field
          name="harga"
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
                placeholder="Harga"
                label="Harga"
                labelPlacement="outside"
                type="number"
                pattern="/^\d+$/"
                classNames={styleInput}
              />
            );
          }}
        </form.Field>
        <form.Field
          name="jumlah"
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
                placeholder="Jumlah"
                label="Jumlah"
                labelPlacement="outside"
                type="number"
                pattern="/^\d+$/"
                classNames={styleInput}
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
                classNames={styleInput}
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
          // isLoading={pendingCreate}
        >
          Simpan
        </Button>
      </form>
      {isOpen && <ModalKategori closeModal={toggle} />}
    </>
  );
};

export default FormOutcome;
