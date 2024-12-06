import React from "react";
import ConfigurationForm from "./components/ConfigurationForm";
import TicketDisplay from "./components/TicketDisplay";
import LogDisplay from "./components/LogDisplay";
import ControlPanel from "./components/ControlPanel";

function App() {
  return (
    <div className="flex flex-col h-screen" style={{ backgroundColor: "#262626" }}>
      {/* Control Panel at the top */}
      <div className="flex justify-center py-4 shadow-md" style={{ backgroundColor: "#4a4949" }}>
        <ControlPanel />
      </div>

      {/* Main content area */}
      <div className="flex flex-1 w-full">
        {/* ConfigurationForm on the left */}
        <div className="flex-1 p-4">
          <ConfigurationForm />
        </div>

        {/* TicketDisplay on the right */}
        <div className="flex-1 p-4">
          <TicketDisplay />
        </div>
      </div>

      {/* LogDisplay at the bottom */}
      <div className="w-full bg-black text-white p-4">
        <LogDisplay />
      </div>
    </div>
  );
}

export default App;
