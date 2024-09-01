"use client";

import { ServicePayload } from "@/actions/actions/service/Service.interface";
import { useService } from "@/actions/hooks/customer";
import { Radio } from "@/components/atoms";
import Modal from "@/components/atoms/modal";
import { Button, Input } from "@nextui-org/react";
import { useForm } from "@tanstack/react-form";
import React, { useCallback } from "react";
import { IoMdAdd } from "react-icons/io";

const ModalService = ({ toggle }: { toggle: () => void }) => {
  const { mutateCreateService, pendingCreate } = useService();

  const form = useForm<ServicePayload>({
    onSubmit: async ({ value }) => {
      mutateCreateService(value, {
        onSuccess: handleCloseModal,
      });
    },
  });

  const handleCloseModal = useCallback(() => {
    toggle();
    form.reset();
  }, [form, toggle]);
  return (
    <Modal
      isOpen
      onClose={toggle}
      onSubmit={toggle}
      title="Create Service"
      removeAction
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="mb-8 flex flex-col gap-y-6"
      >
        <form.Field
          name="nama"
          validators={{
            onChange: ({ value }) =>
              !value ? "This field is required" : undefined,
          }}
        >
          {(field) => {
            return (
              <Input
                name={field.name}
                value={field.state.value as string}
                label="Service"
                placeholder="Input service"
                labelPlacement="outside"
                radius="sm"
                isInvalid={field.state.meta.errors.length > 0}
                errorMessage={field.state.meta.errors}
                onChange={(e) => field.handleChange(e.target.value)}
                classNames={{
                  inputWrapper:
                    "bg-slate-50 group-hover:bg-slate-100 rounded-lg border-slate-300 border-1",
                }}
              />
            );
          }}
        </form.Field>
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
                value={field.state.value as unknown as string}
                label="Harga"
                placeholder="Input harga"
                labelPlacement="outside"
                radius="sm"
                isInvalid={field.state.meta.errors.length > 0}
                errorMessage={field.state.meta.errors}
                onChange={(e) => field.handleChange(Number(e.target.value))}
                classNames={{
                  inputWrapper:
                    "bg-slate-50 group-hover:bg-slate-100 rounded-lg border-slate-300 border-1",
                }}
                type="number"
                pattern="/^-?\d*\.?\d+$/"
              />
            );
          }}
        </form.Field>
        <form.Field
          name="type_point"
          validators={{
            onChange: ({ value }) =>
              !value ? "This field is required" : undefined,
          }}
        >
          {(field) => {
            return (
              <Radio
                radioGroup={{
                  name: field.name,
                  value: field.state.value,
                  onValueChange: (value) => field.handleChange(value),
                  orientation: "horizontal",
                  label: "Tipe Point",
                  size: "sm",
                  color: "primary",
                  isInvalid: field.state.meta.errors.length > 0,
                  classNames: {
                    label: "text-sm text-slate-600 font-semibold",
                  },
                }}
                options={[
                  {
                    label: "Kosong",
                    value: "kosong",
                  },
                  {
                    label: "Setrika",
                    value: "setrika",
                  },
                  {
                    label: "Lipat",
                    value: "lipat",
                  },
                ]}
              />
            );
          }}
        </form.Field>
        <Button
          type="submit"
          color="primary"
          radius="none"
          className="rounded-md"
          startContent={<IoMdAdd />}
          isLoading={pendingCreate}
        >
          Simpan
        </Button>
      </form>
    </Modal>
  );
};

export default ModalService;
