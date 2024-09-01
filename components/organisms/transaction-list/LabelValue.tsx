import React from "react";

const LabelValue = ({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) => {
  return (
    <div>
      <p className="text-xs text-slate-400 mb-2 capitalize">{label}</p>
      {typeof children === "string" ? (
        <p className="text-sm">{children}</p>
      ) : (
        children
      )}
    </div>
  );
};

export default LabelValue;
