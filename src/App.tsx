import React from "react";
import { SowScheduleForm, SowScheduleFormData } from "./components/ui/SowScheduleForm";
import SowSchedulePanel from "./components/ui/SowSchedulePanel";

const App: React.FC = () => {
  //just dump to console for now - backend will be spring
  const handleFormSubmit = (data: SowScheduleFormData) => {
    console.log("Form Data Submitted:", data);

  };

  return (
    <div className="flex  bg-gray-100 items-stretch">

      <div className="flex-none w-[400px] p-4">
        <SowScheduleForm onSubmit={handleFormSubmit} />
      </div>
      
    {/* calendar is going to go here - it will interact with the input form to provide an interactive calendar planner */}
      <div className="flex-grow p-4 ml-4 mr-4">
        <SowSchedulePanel />
      </div>
    </div>
  );
};

export default App;
