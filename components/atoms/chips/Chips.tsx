import { ChipProps, Chip } from "@nextui-org/react";
import React from "react";

export type ColorType =
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | undefined;

export interface OptionProps {
  label: string;
  value: string | number;
  color: ColorType;
}

type IChips = ChipProps & {
  value: string | number;
  options: OptionProps[];
};

const Chips: React.FC<IChips> = ({ value, options, ...restProps }) => {
  const { color = "default", label = "" } =
    options.find((item) => item.value === value) ?? {};
  return (
    <Chip color={color} {...restProps}>
      {label}
    </Chip>
  );
};

export default Chips;
