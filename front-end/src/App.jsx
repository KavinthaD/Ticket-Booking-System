import React, { useState, useEffect } from "react";
import ConfigurationForm from "./components/ConfigurationForm";
import TicketDisplay from "./components/TicketDisplay";
import LogDisplay from "./components/LogDisplay";
import ControlPanel from "./components/ControlPanel";
import logService from "./services/log.service"; // Import the log service
import TicketLineChart from "./components/TicketLineChart";
import './app.css'; // Import the CSS file

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
    <div className="app-container">
      {/* Control Panel at the top */}
      <div className="control-panel">
        <ControlPanel onStart={handleStart} config={config} />
      </div>

      {/* Main content area */}
      <div className="main-content">
        {/* ConfigurationForm on the left */}
        <div className="configuration-form">
          <ConfigurationForm onSaveConfig={handleSaveConfig} />
        </div>

        {/* TicketDisplay on the middle */}
        <div className="ticket-display">
          <TicketDisplay logs={logs} />
        </div>

        {/* Chart on the right */}
        <div className="chart-display">
          <TicketLineChart logs={logs}/>
        </div>
      </div>

      {/* LogDisplay at the bottom */}
      <div className="log-display">
        <LogDisplay showLogs={showLogs} />
      </div>
    </div>
  );
}

export default App;
