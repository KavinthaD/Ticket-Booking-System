import React, { useState } from "react";
import ControlPanel from "./ControlPanel";
import LogDisplay from "./LogDisplay";

const ParentComponent = () => {
  const [showLogs, setShowLogs] = useState(false);

  const handleStart = (isRunning) => {
    setShowLogs(isRunning); // Show logs only when the system is running
  };

  return (
    <div>
      <ControlPanel onStart={handleStart} />
      <LogDisplay showLogs={showLogs} />
    </div>
  );
};

export default ParentComponent;
