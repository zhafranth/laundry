"use client";

import React from "react";
import {
  Select as SelectNextUI,
  SelectItem,
  SelectProps,
} from "@nextui-org/react";

interface ISelect extends Omit<SelectProps, "children"> {
  options: { value: number; label: string }[];
}

const Select: React.FC<ISelect> = ({ options, ...props }) => {
  return (
    <SelectNextUI {...props}>
      {options.map(({ value, label }) => (
        <SelectItem key={value} value={value}>
          {label}
        </SelectItem>
      ))}
    </SelectNextUI>
  );
};

export default Select;
