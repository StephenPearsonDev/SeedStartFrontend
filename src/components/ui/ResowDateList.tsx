import React from "react";
import { Button as JollyButton } from "@/components/ui/jolly/button";

export interface DateItem {
  id: number;
  date: Date;
}

interface ResowDateListProps {
  dates: DateItem[];
  removeDate: (id: number) => void;
}

export const ResowDateList: React.FC<ResowDateListProps> = ({ dates, removeDate }) => {
  return (
    <div className="w-full max-w-md">
      <h2 className="text-xl font-semibold mb-2">Resow Date List:</h2>
      {dates.length === 0 ? (
        <p className="text-gray-500">No dates added yet.</p>
      ) : (
        <ul className="space-y-2">
          {dates.map(({ id, date }) => (
            <li 
              key={id} 
              className="flex justify-between items-center p-2 border border-gray-200 rounded-md bg-white shadow-sm"
            >
              <span>{date.toLocaleDateString()}</span>
              <JollyButton 
                size="sm" 
                variant="destructive" 
                onPress={() => removeDate(id)}
                isDisabled={false} 
              >
                X
              </JollyButton>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
