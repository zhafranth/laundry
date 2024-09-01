import React from "react";
import { NextUIProvider } from "@nextui-org/react";

const UIProvider = ({ children }: { children: React.ReactNode }) => {
  return <NextUIProvider>{children}</NextUIProvider>;
};

export default UIProvider;
