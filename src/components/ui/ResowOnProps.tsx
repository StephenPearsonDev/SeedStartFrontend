import React, { useState } from "react";
import { JollyDatePicker } from "@/components/ui/jolly/date-picker";
import { Button as JollyButton } from "@/components/ui/jolly/button";
import { CalendarDate } from "@internationalized/date";

interface ResowOnProps {
  addDate: (date: Date) => void;
}

export const ResowOn: React.FC<ResowOnProps> = ({ addDate }) => {
  const [selectedDate, setSelectedDate] = useState<CalendarDate | null>(null);
  const [pickerKey, setPickerKey] = useState<number>(0); 

  const handleAddDate = () => {
    if (selectedDate) {
      const date = new Date(selectedDate.year, selectedDate.month - 1, selectedDate.day);
      addDate(date);
      setSelectedDate(null);
      setPickerKey(prevKey => prevKey + 1); 
      console.log("Date added to the list!");
    }
  };

  return (
    <div className="flex justify-center items-center space-x-2 text-lg border border-gray-300 bg-gray-50 rounded-md p-2 shadow-sm w-full max-w-md">
      <span>Resow on:</span>
      <JollyDatePicker 
        key={pickerKey}
        className="w-40"
        label=""
        description=""
        value={selectedDate ?? undefined} 
        onChange={(date: CalendarDate | null) => setSelectedDate(date)}
      />
      <JollyButton 
        className="px-4 py-2" 
        onPress={handleAddDate}
        isDisabled={!selectedDate} 
      >
        +
      </JollyButton>
    </div>
  );
};
