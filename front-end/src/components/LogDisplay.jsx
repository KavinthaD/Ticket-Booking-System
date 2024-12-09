import React, { useEffect, useState } from "react";

const LogDisplay = ({ showLogs }) => {
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    let interval;

    const fetchLogs = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/logs");
        if (!response.ok) {
          throw new Error("Failed to fetch logs");
        }
        const data = await response.json();
        setLogs(data);
      } catch (err) {
        setError(err.message);
      }
    };

    if (showLogs) {
      // Fetch logs immediately and start polling
      fetchLogs();
      interval = setInterval(fetchLogs, 2000); // Poll logs every 2 seconds
    } else {
      // Clear logs and stop polling when system is stopped
      setLogs([]);
      setError(null);
    }

    return () => clearInterval(interval); // Cleanup interval on unmount or when `showLogs` changes
  }, [showLogs]);

  if (!showLogs) return null;

  return (
    <div
      className="bg-black bg-opacity-80 rounded-md p-6 text-white overflow-y-auto"
      style={{ maxHeight: "10000px" }}
    >
      <h1 className="mb-2 text-2xl">Logs</h1>
      {error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <pre>
          {logs.length > 0 ? (
            logs.map((log, index) => <div key={index}>{log}</div>)
          ) : (
            <p>No logs available</p>
          )}
        </pre>
      )}
    </div>
  );
};

export default LogDisplay;
