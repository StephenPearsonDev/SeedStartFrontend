import React from "react";
import { NumberfieldReusable } from "./NumberFieldReusable";

interface ResowFieldProps {
  resowEveryWeeks: number;
  setResowEveryWeeks: (value: number) => void;
}

export const ResowField: React.FC<ResowFieldProps> = ({
  resowEveryWeeks,
  setResowEveryWeeks,
}) => {
  return (
    <div className="flex justify-center items-center space-x-2 text-lg border border-gray-300 bg-gray-50 rounded-md p-2 shadow-sm w-full max-w-md">
      <span>Resow every</span>
      <div className="flex items-center">
        <NumberfieldReusable
          value={resowEveryWeeks}
          onChange={(value: number) => setResowEveryWeeks(value)}
        />
      </div>
      <span>weeks</span>
    </div>
  );
};
