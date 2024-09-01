"use client";

import { UserPayload } from "@/actions/actions/user/User.interface";
import { useUser } from "@/actions/hooks/user";
import Upload from "@/components/atoms/upload";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { Role, User } from "@prisma/client";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import React, { useMemo } from "react";
import { FaArrowLeft, FaPlus } from "react-icons/fa";

interface IFormUser {
  data?: User | null;
}

const FormUser: React.FC<IFormUser> = ({ data }) => {
  const router = useRouter();
  const { mutateCreateUser, mutateUpdateUser, pendingCreate, pendingUpdate } =
    useUser();

  const {
    name,
    username,
    password,
    role,
    alamat,
    id,
    identitas,
    kontak,
    profile_url,
    status_pegawai,
  } = data ?? {};

  const formType = useMemo(() => (data ? "Edit" : "Tambah"), [data]);

  const form = useForm<UserPayload>({
    defaultValues: {
      name: name ?? "",
      username: username ?? "",
      password: password ?? "",
      role: role ?? "USER",
      alamat: alamat ?? "",
      identitas: identitas ?? "",
      kontak: kontak ?? "",
      profile_url: profile_url ?? "",
      status_pegawai: status_pegawai ?? "",
    },
    onSubmit: async ({ value }) => {
      if (id) {
        return mutateUpdateUser(
          { data: value, id },
          {
            onSuccess: router.back,
          }
        );
      }
      return mutateCreateUser(value as User, {
        onSuccess: router.back,
      });
    },
  });

  const styleInput = {
    inputWrapper:
      "bg-slate-50 group-hover:bg-slate-100 rounded-lg border-slate-300 border-1 shadow-none ",
    input: "placeholder:text-slate-400",
    label: "!text-slate-600",
  };

  return (
    <>
      <div className="flex gap-x-4 items-center  textblue ">
        <Button
          isIconOnly
          variant="light"
          color="primary"
          onClick={() => router.back()}
        >
          <FaArrowLeft />
        </Button>
        <p>{formType} User</p>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="my-10 flex flex-col gap-y-8"
      >
        <form.Field name="profile_url">
          {(field) => {
            return (
              <Upload
                name={field.name}
                onChange={(e) => field.handleChange(e as string)}
                value={field.state.value as string}
              />
            );
          }}
        </form.Field>
        <form.Field
          name="name"
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
                label="Nama"
                placeholder="Input nama"
                labelPlacement="outside"
                radius="sm"
                isInvalid={field.state.meta.errors.length > 0}
                errorMessage={field.state.meta.errors}
                onChange={(e) => field.handleChange(e.target.value)}
                classNames={styleInput}
              />
            );
          }}
        </form.Field>
        <form.Field
          name="username"
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
                label="Username"
                placeholder="Input username"
                labelPlacement="outside"
                radius="sm"
                isInvalid={field.state.meta.errors.length > 0}
                errorMessage={field.state.meta.errors}
                onChange={(e) => field.handleChange(e.target.value)}
                classNames={styleInput}
              />
            );
          }}
        </form.Field>
        <form.Field
          name="password"
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
                label="Password"
                placeholder="Input password"
                labelPlacement="outside"
                radius="sm"
                type="password"
                isInvalid={field.state.meta.errors.length > 0}
                errorMessage={field.state.meta.errors}
                onChange={(e) => field.handleChange(e.target.value)}
                classNames={styleInput}
              />
            );
          }}
        </form.Field>

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
                onChange={(event) =>
                  field.handleChange(event.target.value as Role)
                }
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

        <form.Field name="identitas">
          {(field) => {
            return (
              <Input
                name={field.name}
                description="Optional"
                value={field.state.value as string}
                label="Identitas / KTP"
                placeholder="Input indentitas"
                labelPlacement="outside"
                radius="sm"
                isInvalid={field.state.meta.errors.length > 0}
                errorMessage={field.state.meta.errors}
                onChange={(e) => field.handleChange(e.target.value)}
                classNames={styleInput}
              />
            );
          }}
        </form.Field>
        <form.Field name="kontak">
          {(field) => {
            return (
              <Input
                name={field.name}
                value={field.state.value as string}
                label="Kontak / Whatsapp"
                placeholder="Input kontak"
                labelPlacement="outside"
                radius="sm"
                isInvalid={field.state.meta.errors.length > 0}
                errorMessage={field.state.meta.errors}
                onChange={(e) => field.handleChange(e.target.value)}
                classNames={styleInput}
                description="Optional"
              />
            );
          }}
        </form.Field>
        <form.Field name="alamat">
          {(field) => {
            return (
              <Input
                name={field.name}
                value={field.state.value as string}
                label="Alamat"
                placeholder="Input alamat"
                labelPlacement="outside"
                radius="sm"
                isInvalid={field.state.meta.errors.length > 0}
                errorMessage={field.state.meta.errors}
                onChange={(e) => field.handleChange(e.target.value)}
                classNames={styleInput}
                description="Optional"
              />
            );
          }}
        </form.Field>
        <form.Field name="status_pegawai">
          {(field) => {
            return (
              <Input
                name={field.name}
                value={field.state.value as string}
                label="Status Pegawai"
                placeholder="Input status pegawai"
                labelPlacement="outside"
                radius="sm"
                isInvalid={field.state.meta.errors.length > 0}
                errorMessage={field.state.meta.errors}
                onChange={(e) => field.handleChange(e.target.value)}
                classNames={styleInput}
                description="Optional"
              />
            );
          }}
        </form.Field>

        <Button
          color="primary"
          startContent={<FaPlus />}
          radius="sm"
          type="submit"
          isLoading={pendingCreate || pendingUpdate}
        >
          Simpan
        </Button>
      </form>
    </>
  );
};

export default FormUser;
