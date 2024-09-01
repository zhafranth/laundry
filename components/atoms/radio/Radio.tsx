import {
  RadioGroup,
  RadioGroupProps,
  RadioProps,
  Radio as RadioNextUI,
} from "@nextui-org/react";
import React from "react";

const Radio = ({
  options,
  radioGroup,
  radio,
}: {
  options: { value: string; label: string }[];
  radioGroup?: RadioGroupProps;
  radio?: Omit<RadioProps, "value">;
}) => {
  return (
    <RadioGroup label="Sample" {...radioGroup}>
      {options?.map(({ label, value }, index) => (
        <RadioNextUI value={value} key={`options-${index}`} {...radio}>
          {label}
        </RadioNextUI>
      ))}
    </RadioGroup>
  );
};

export default Radio;
