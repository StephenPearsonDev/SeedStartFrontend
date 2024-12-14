import React from "react";
import { CalendarDate } from "@internationalized/date";
import { JollyDatePicker } from "@/components/ui/jolly/date-picker";

interface SowOnProps {
  sowDate: CalendarDate | null;
  setSowDate: React.Dispatch<React.SetStateAction<CalendarDate | null>>;
  sowDateError: string | null;
  setSowDateError: React.Dispatch<React.SetStateAction<string | null>>;
}

export const SowOn: React.FC<SowOnProps> = ({
    sowDate,
    setSowDate,
    sowDateError,
    setSowDateError,
  }) => {
    
    const now = new Date();
    const today = new CalendarDate(
      now.getFullYear(),
      now.getMonth() + 1,
      now.getDate()
    );
  
    return (
      <div className="flex flex-col justify-center items-start space-y-2 text-lg border border-gray-300 bg-gray-50 rounded-md p-4 shadow-sm w-full max-w-md">
      
        <div className="flex items-center space-x-4">
          <label htmlFor="sowDate" className="font-semibold">
            Sow Date:
          </label>
          <JollyDatePicker
            className="w-40"
            label=""
            description=""
            value={sowDate} 
            onChange={(date: CalendarDate | null) => {
              setSowDate(date);
              if (date) {
                setSowDateError(null);
              }
            }}
            minValue={today} 
          />
        </div>
       
        {sowDateError && (
          <span className="text-red-500 text-sm mt-1">
            {sowDateError}
          </span>
        )}
      </div>
    );
  };
  