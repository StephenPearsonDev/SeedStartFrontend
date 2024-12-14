import React, { useState, useEffect } from "react";
import { JollyDatePicker } from "@/components/ui/jolly/date-picker";
import { Button as JollyButton } from "@/components/ui/jolly/button";
import { CalendarDate } from "@internationalized/date";

interface ResowOnProps {
  addDate: (date: Date) => void;
}

export const ResowOn: React.FC<ResowOnProps> = ({ addDate }) => {
  const [selectedDate, setSelectedDate] = useState<CalendarDate | null>(null);
  const [resowDateError, setResowDateError] = useState<string | null>(null);
  const [addedDates, setAddedDates] = useState<Date[]>([]); 

  const now = new Date();
  const today = new CalendarDate(now.getFullYear(), now.getMonth() + 1, now.getDate());

  const handleAddDate = () => {
    if (selectedDate) {
    
      const date = new Date(selectedDate.year, selectedDate.month - 1, selectedDate.day);

 
      const isDuplicate = addedDates.some(
        (addedDate) =>
          addedDate.getFullYear() === date.getFullYear() &&
          addedDate.getMonth() === date.getMonth() &&
          addedDate.getDate() === date.getDate()
      );

      if (isDuplicate) {
        setResowDateError("This date is already in the list.");
        return;
      }


      setAddedDates((prevDates) => [...prevDates, date]);
      addDate(date);
      setSelectedDate(null); 
      setResowDateError(null); 
      console.log("Date added to the list!");
    } else {
      setResowDateError("Please select a Resow Date.");
    }
  };


  useEffect(() => {
    if (resowDateError) {
      const timer = setTimeout(() => {
        setResowDateError(null);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [resowDateError]);

  return (
    <div id="ResowOn" className="flex flex-col relative space-y-0 border border-gray-300 rounded-md">
      <label htmlFor="ResowOn" className="flex font-semibold p-2 justify-center w-full">
        Select, add and remove multiple dates.
      </label>
      <div className="flex flex-col items-center space-y-2 bg-gray-50 p-4 shadow-sm w-full max-w-md min-h-28">
        <div className="flex justify-center items-center space-x-2 w-full">
          <span>Resow on:</span>
          <JollyDatePicker
            className="w-40"
            label=""
            description=""
            value={selectedDate} 
            onChange={(date: CalendarDate | null) => {
              setSelectedDate(date);
              if (date) {
                setResowDateError(null);
              }
            }}
            minValue={today} 
          />
          <JollyButton
            className="px-4 py-2"
            onPress={handleAddDate}
            isDisabled={!selectedDate} 
          >
            +
          </JollyButton>
        </div>

        {resowDateError && (
          <span className="text-red-500 text-sm mt-2">
            {resowDateError}
          </span>
        )}
      </div>
    </div>
  );
};
