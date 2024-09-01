import React from "react";
import {
  AutocompleteItem,
  Autocomplete as AutocompleteNextUI,
  AutocompleteProps,
} from "@nextui-org/react";

interface IAutocomplete extends Omit<AutocompleteProps, "children"> {
  options: { value: number; label: string }[];
}

const Autocomplete: React.FC<IAutocomplete> = ({ options, ...props }) => {
  return (
    <AutocompleteNextUI
      {...props}
      inputProps={{
        classNames: {
          label: "font-semibold text-slate-200",
          inputWrapper:
            "bg-slate-50 group-hover:bg-slate-100 rounded-lg border-slate-300 border-1",
        },
      }}
    >
      {options.map(({ value, label }) => (
        <AutocompleteItem key={value} value={value}>
          {label}
        </AutocompleteItem>
      ))}
    </AutocompleteNextUI>
  );
};

export default Autocomplete;
