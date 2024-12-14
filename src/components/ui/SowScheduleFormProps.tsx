import React, { useState } from "react";
import { ResowField } from "./ResowField";
import { ResowOn } from "./ResowOn";
import { ResowDateList, DateItem } from "./ResowDateList";

interface SowScheduleFormProps {
  onSubmit: (data: SowScheduleFormData) => void;
}

export interface SowScheduleFormData {
  name: string;
  type: string;
  variety: string;
  notes: string;
  resowEveryWeeks: number;
  resowDates: DateItem[];
}

export const SowScheduleForm: React.FC<SowScheduleFormProps> = ({ onSubmit }) => {

  const [name, setName] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [variety, setVariety] = useState<string>("");
  const [notes, setNotes] = useState<string>("");


  const [resowEveryWeeks, setResowEveryWeeks] = useState<number>(0);
  const [resowDates, setResowDates] = useState<DateItem[]>([]);


  const addDate = (date: Date): void => {
    if (date) {
      setResowDates((prevDates) => [
        ...prevDates,
        { id: Date.now(), date },
      ]);
    }
  };


  const removeDate = (id: number): void => {
    setResowDates((prevDates) => prevDates.filter((item) => item.id !== id));
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();


    const formData: SowScheduleFormData = {
      name,
      type,
      variety,
      notes,
      resowEveryWeeks,
      resowDates,
    };

 
    onSubmit(formData);

    setName("");
    setType("");
    setVariety("");
    setNotes("");
    setResowEveryWeeks(0);
    setResowDates([]);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded-md shadow-md">
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
