import { Layout } from "@/components/organisms";
import NextAuthProvider from "@/providers/NextAuthProvider";
import React from "react";

const ControllerLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <NextAuthProvider>
      <Layout>{children}</Layout>
    </NextAuthProvider>
  );
};

export default ControllerLayout;
