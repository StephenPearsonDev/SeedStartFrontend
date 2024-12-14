import React from "react";
import { JollyNumberField } from "@/components/ui/jolly/numberfield";

interface NumberfieldReusableProps {
  value: number;
  onChange: (value: number) => void;
}

export const NumberfieldReusable: React.FC<NumberfieldReusableProps> = ({
  value,
  onChange,
}) => {
  return (
    <JollyNumberField
      className="w-16 text-lg"
      label="" 
      description="" 
      value={value}
      minValue={0}
      maxValue={8}
      onChange={onChange} 
    />
  );
};
