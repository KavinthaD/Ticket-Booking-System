import React, { useState } from "react";
import StartFlowService from "../services/start.flow.service";

const ControlPanel = ({ onStart, config }) => {
  const [isRunning, setIsRunning] = useState(false);

  const handleToggleSystem = async () => {
    const newRunningState = !isRunning;
    setIsRunning(newRunningState);
    onStart(newRunningState); // Notify the parent component about the state change

    if (newRunningState) {
      // System is starting
      try {
        const response = await StartFlowService.create(config);
      } catch (error) {
        console.error("Error starting the system:", error);
        alert("Failed to start the system.");
      }
    } else {
      // System is stopping
      alert("System has been stopped.");
    }
  };

  return (
    <div className="m-4 mx-10 flex items-center justify-between w-full">
      <h1 className="text-white text-2xl font-bold">Ticket Booking System</h1>
      <button
        onClick={handleToggleSystem}
        className={`px-6 py-2 rounded-md text-white font-semibold ${
          isRunning ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
        }`}
      >
        {isRunning ? "Stop System" : "Start System"}
      </button>
    </div>
  );
};

export default ControlPanel;
