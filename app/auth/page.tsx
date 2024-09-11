"use client";

import { Button, Input } from "@nextui-org/react";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import React from "react";
import { useAuth } from "./hooks";

const Auth = () => {
  const { mutate, isPending } = useAuth();
  const router = useRouter();

  const form = useForm<{ username: string; password: string }>({
    onSubmit: async ({ value }) => {
      mutate(value, {
        onSuccess: (response) => {
          if (response?.error) {
            const key = response?.error.includes("Username")
              ? "username"
              : "password";
            form.setFieldMeta(key, (prevMeta) => ({
              ...prevMeta,
              errorMap: {
                onSubmit: response?.error,
              },
            }));
          } else {
            router.push("/controller/transaksi");
          }
        },
      });
    },
  });
  return (
    <div className="flex h-screen justify-center items-center">
      <div className="p-8 rounded-3xl bg-white border border-blue-300 w-5/6 md:w-1/3">
        <h1 className="mb-8 font-semibold text-2xl">Masuk</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="flex flex-col gap-y-5"
        >
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
                  classNames={{
                    inputWrapper:
                      "bg-slate-50 group-hover:bg-slate-100 rounded-lg border-slate-300 border-1",
                  }}
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
                  classNames={{
                    inputWrapper:
                      "bg-slate-50 group-hover:bg-slate-100 rounded-lg border-slate-300 border-1",
                  }}
                />
              );
            }}
          </form.Field>
          <Button color="primary" type="submit" isLoading={isPending}>
            Masuk
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
