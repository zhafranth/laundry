"use client";

import React from "react";
import { Switch as SwitchNextUI, SwitchProps } from "@nextui-org/react";
import useToggle from "@/utils/hooks/useToggle";

type ISwitch = SwitchProps & {
  checkText?: string | React.ReactNode;
  uncheckText?: string | React.ReactNode;
};

const Switch: React.FC<ISwitch> = ({ checkText, uncheckText, ...props }) => {
  const { isSelected } = props;
  return (
    <SwitchNextUI
      {...props}
      size="sm"
      color="primary"
      className="text-sm "
      classNames={{
        label: "text-slate-500",
      }}
    >
      {isSelected ? checkText : uncheckText}
    </SwitchNextUI>
  );
};

export default Switch;
