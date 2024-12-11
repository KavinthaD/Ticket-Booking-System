import React, { useState, useEffect } from "react";
import ConfigurationForm from "./components/ConfigurationForm";
import TicketDisplay from "./components/TicketDisplay";
import LogDisplay from "./components/LogDisplay";
import ControlPanel from "./components/ControlPanel";
import logService from "./services/log.service"; // Import the log service

function App() {
  const [showLogs, setShowLogs] = useState(false);
  const [logs, setLogs] = useState([]);
  const [config, setConfig] = useState({
    totalTickets: "",
    ticketReleaseRate: "",
    customerRetrievalRate: "",
    maxTicketCapacity: "",
  });

  const handleSaveConfig = (newConfig) => {
    setConfig(newConfig);
  };

  const handleStart = (isRunning) => {
    setShowLogs(isRunning);
  };

  useEffect(() => {
    let interval;

    const fetchLogs = async () => {
      try {
        const data = await logService.fetchLogs(); // Call the service function
        setLogs(data);
      } catch (err) {
        console.error("Error fetching logs:", err);
      }
    };

    if (showLogs) {
      fetchLogs(); // Fetch logs immediately
      interval = setInterval(fetchLogs, 2000); // Poll every 2 seconds
    }

    return () => clearInterval(interval); // Cleanup on unmount or when `showLogs` changes
  }, [showLogs]);

  return (
    <div className="flex flex-col h-screen" style={{ backgroundColor: "#262626" }}>
      {/* Control Panel at the top */}
      <div className="flex justify-center py-4 shadow-md" style={{ backgroundColor: "#4a4949" }}>
        <ControlPanel onStart={handleStart} config={config} />
      </div>

      {/* Main content area */}
      <div className="flex flex-1 w-full">
        {/* ConfigurationForm on the left */}
        <div className="flex-1 p-4">
          <ConfigurationForm onSaveConfig={handleSaveConfig} />
        </div>

        {/* TicketDisplay on the right */}
        <div className="flex-1 p-4">
          <TicketDisplay logs={logs} />
        </div>
      </div>

      {/* LogDisplay at the bottom */}
      <div className="w-full bg-black text-white p-4">
        <LogDisplay showLogs={showLogs} />
      </div>
    </div>
  );
}

export default App;
