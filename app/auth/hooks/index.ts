import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";

export const useAuth = () =>
  useMutation({
    mutationFn: async (data: { username: string; password: string }) =>
      await signIn("credentials", {
        ...data,
        redirect: false,
      }),
  });
