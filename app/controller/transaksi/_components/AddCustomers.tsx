"use client";

import { CustomerPayload } from "@/actions/actions/customer/Customer.interface";
import { useCustomer } from "@/actions/hooks";
import Modal from "@/components/atoms/modal";
import useToggle from "@/utils/hooks/useToggle";
import { Button, Input, Textarea } from "@nextui-org/react";
import { useForm } from "@tanstack/react-form";
import React, { useCallback } from "react";
import { FaUserPlus } from "react-icons/fa";

const AddCustomers = () => {
  const { isOpen, toggle } = useToggle();
  const { mutateCreateCustomer, pendingCreate } = useCustomer();

  const form = useForm<CustomerPayload>({
    onSubmit: async ({ value }) => {
      mutateCreateCustomer(value, {
        onSuccess: handleCloseModal,
      });
    },
  });

  const handleCloseModal = useCallback(() => {
    toggle();
    form.reset();
  }, [form, toggle]);

  return (
    <>
      <Button
        startContent={<FaUserPlus />}
        color="primary"
        variant="flat"
        size="sm"
        className="w-3/12 rounded-md"
        radius="none"
        onPress={toggle}
      >
        Tambah Pelanggan
      </Button>
      {isOpen && (
        <Modal
          isOpen
          onClose={handleCloseModal}
          title="Tambah Pelanggan"
          radius="sm"
          okButtonProps={{
            radius: "sm",
          }}
          size="xl"
          removeAction
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
          >
            <div className="flex flex-col gap-y-6">
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
                      label="Nama Pelanggan"
                      placeholder="Input nama pelanggan"
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
                name="no_telp"
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
                      label="No. HP / Whatsapp"
                      placeholder="Input nomer handphone"
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
                name="alamat"
                validators={{
                  onChange: ({ value }) =>
                    !value ? "This field is required" : undefined,
                }}
              >
                {(field) => {
                  return (
                    <Textarea
                      name={field.name}
                      value={field.state.value as string}
                      label="Alamat"
                      placeholder="Input alamat"
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
            </div>
            <div className="flex justify-end my-4">
              <Button
                type="submit"
                size="md"
                color="primary"
                radius="sm"
                isLoading={pendingCreate}
              >
                Simpan
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
};

export default AddCustomers;
