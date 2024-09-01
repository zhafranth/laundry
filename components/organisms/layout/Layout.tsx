import React from "react";
import { Dock } from "../dock";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container min-h-screen py-6 px-4 bg-slate-50 relative">
      {children}
      <Dock />
    </div>
  );
};

export default Layout;
