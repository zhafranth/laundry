"use client";

import useToggle from "@/utils/hooks/useToggle";
import { styleInput } from "@/utils/style";
import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import { useForm } from "@tanstack/react-form";
import dynamic from "next/dynamic";
import React from "react";
import { IoMdAdd } from "react-icons/io";

const BackButton = dynamic(
  () => import("@/components/organisms/back/BackButton")
);
const ModalKategori = dynamic(() => import("./ModalKategori"));

const FormOutcome = () => {
  const { isOpen, toggle } = useToggle();

  const form = useForm({
    onSubmit: async ({ value }) => {
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
          name="role"
          validators={{
            onChange: ({ value }) =>
              !value ? "This field is required" : undefined,
          }}
        >
          {(field) => {
            return (
              <Select
                label="Role"
                placeholder="Role"
                labelPlacement="outside"
                name={field.name}
                selectedKeys={[field.state.value] as string[]}
                onChange={(event) => field.handleChange(event.target.value)}
                isInvalid={field.state.meta.errors.length > 0}
                errorMessage={field.state.meta.errors}
              >
                {[
                  { label: "Admin", value: "ADMIN" },
                  { label: "User", value: "USER" },
                ].map((item) => (
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
