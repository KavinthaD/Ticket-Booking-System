import React, { useState } from "react";

const ControlPanel = () => {
  const [isRunning, setIsRunning] = useState(false);

  const toggleSystem = () => {
    setIsRunning((prev) => !prev);
  };

  return (
    
<div className="m-4 mx-10 flex items-center justify-between w-full">
  <h1 className="text-white text-2xl font-bold">Ticket Booking System</h1>
  <button
    onClick={toggleSystem}
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
