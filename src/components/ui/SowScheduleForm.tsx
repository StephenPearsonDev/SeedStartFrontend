import React, { useState, useEffect } from "react";
import { CalendarDate } from "@internationalized/date";
import { ResowField } from "./ResowField";
import { ResowOn } from "./ResowOn";
import { ResowDateList, DateItem } from "./ResowDateList";
import { JollyDatePicker } from "@/components/ui/jolly/date-picker";
import { SowOn } from './SowOn';

interface SowScheduleFormProps {
  onSubmit: (data: SowScheduleFormData) => void;
}

export interface SowScheduleFormData {
  name: string;
  type: string;
  variety: string;
  notes: string;
  sowDate: Date | null; 
  resowEveryWeeks: number;
  resowDates: DateItem[];
}

export const SowScheduleForm: React.FC<SowScheduleFormProps> = ({ onSubmit }) => {

  const [name, setName] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [variety, setVariety] = useState<string>("");
  const [notes, setNotes] = useState<string>("");

 
  const [sowDate, setSowDate] = useState<CalendarDate | null>(null);
  const [resowEveryWeeks, setResowEveryWeeks] = useState<number>(0);
  const [resowDates, setResowDates] = useState<DateItem[]>([]);
  const [sowWeek, setSowWeek] = useState<CalendarDate | null>(null);


  const [sowDateError, setSowDateError] = useState<string | null>(null);


  
  const now = new Date();
  const today = new CalendarDate(now.getFullYear(), now.getMonth() + 1, now.getDate());


  const addDate = (date: Date): void => {
    if (date) {
      setResowDates((prevDates) => {
        const updatedDates = [...prevDates, { id: Date.now(), date }];
        updatedDates.sort((a, b) => a.date.getTime() - b.date.getTime());
        return updatedDates;
      });
    }
  };
  


  const removeDate = (id: number): void => {
    setResowDates((prevDates) => prevDates.filter((item) => item.id !== id));
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let valid = true;


    if (!sowDate) {
      setSowDateError("Please select a Sow Date.");
      valid = false;
    } else {
      setSowDateError(null);
    }



    if (!valid) {
      return;
    }

    const formData: SowScheduleFormData = {
      name,
      type,
      variety,
      notes,
      sowDate: sowDate ? new Date(sowDate.year, sowDate.month - 1, sowDate.day) : null,
      resowEveryWeeks,
      resowDates,
    };


    onSubmit(formData);


    setName("");
    setType("");
    setVariety("");
    setNotes("");
    setSowDate(null);
    setResowEveryWeeks(0);
    setResowDates([]);
    setSowDateError(null);
  };

  
  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded-md shadow-md relative">
      <h1 className="text-2xl font-bold mb-4">Sow Schedule Form</h1>


      <div className="flex flex-col">
        <label htmlFor="name" className="font-semibold">
          Name:
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="p-2 border border-gray-300 rounded-md"
        />
      </div>

  
      <div className="flex flex-col">
        <label htmlFor="type" className="font-semibold">
          Type:
        </label>
        <input
          id="type"
          type="text"
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
          className="p-2 border border-gray-300 rounded-md"
        />
      </div>


      <div className="flex flex-col">
        <label htmlFor="variety" className="font-semibold">
          Variety:
        </label>
        <input
          id="variety"
          type="text"
          value={variety}
          onChange={(e) => setVariety(e.target.value)}
          required
          className="p-2 border border-gray-300 rounded-md"
        />
      </div>


      <div className="flex flex-col">
        <label htmlFor="notes" className="font-semibold">
          Notes:
        </label>
        <textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
        />
      </div>

        <SowOn sowDate={sowDate}
            setSowDate={setSowDate}
            sowDateError={sowDateError}
            setSowDateError={setSowDateError}/>

      
     
      <ResowField
        resowEveryWeeks={resowEveryWeeks}
        setResowEveryWeeks={setResowEveryWeeks}
      />

    
      <ResowOn addDate={addDate} />

    
      <ResowDateList dates={resowDates} removeDate={removeDate} />

     
      <button
        type="submit"
        className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
};
