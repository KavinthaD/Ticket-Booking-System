import React, { useState } from "react";
import TicketDataService from "../services/ticket.service";

const ConfigurationForm = () => {
  // State for form fields
  const [config, setConfig] = useState({
    totalTickets: "",
    ticketReleaseRate: "",
    customerRetrievalRate: "",
    maxTicketCapacity: "",
  });

  // State for error messages
  const [errors, setErrors] = useState({});

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setConfig({ ...config, [name]: value });
  };

  // Validate form inputs
  const validate = () => {
    const newErrors = {};
    if (!config.totalTickets || config.totalTickets <= 0) {
      newErrors.totalTickets = "Total tickets must be a positive number and cannot be empty.";
    }
    if (!config.ticketReleaseRate || config.ticketReleaseRate <= 0) {
      newErrors.ticketReleaseRate = "Ticket release rate must be greater than 200ms and cannot be empty.";
    }
    if (!config.customerRetrievalRate || config.customerRetrievalRate <= 200) {
      newErrors.customerRetrievalRate = "Customer retrieval rate must be greater than 200ms and cannot be empty.";
    }
    if (!config.maxTicketCapacity || config.maxTicketCapacity <= 0) {
      newErrors.maxTicketCapacity = "Maximum ticket capacity must be a positive number and cannot be empty.";
    }

    if(config.totalTickets > config.maxTicketCapacity){
      newErrors.totalTickets = "Total tickets cannot exceed max ticket capacity.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return; // Stop if validation fails
  
    try {
      // Call TicketDataService.create with form data
      const response = await TicketDataService.create(config);
      alert("Configuration saved successfully: " + JSON.stringify(response.data));
    } catch (error) {
      console.error("Error saving configuration:", error);
      alert("Failed to save configuration. Check the backend.");
    }
  };
  

  return (
    <div className="bg-black bg-opacity-80 rounded-md p-6 text-white">
      <h1 className="text-2xl font-bold mb-4 text-center">System Configuration</h1>
      
      <form onSubmit={handleSubmit}>
        <div className="my-3">
          <label className="mr-3">Total Tickets:</label>
          <input className="bg-white bg-opacity-80 rounded-sm text-black"
            type="number"
            name="totalTickets"
            value={config.totalTickets}
            onChange={handleChange}
          />
          {errors.totalTickets && <p style={{ color: "red" }}>{errors.totalTickets}</p>}
        </div>

        <div className="my-3">
          <label className="mr-3">Ticket Release Rate (ms):</label>
          <input className="bg-white bg-opacity-80 rounded-sm text-black"
            type="number"
            name="ticketReleaseRate"
            value={config.ticketReleaseRate}
            onChange={handleChange}
          />
          {errors.ticketReleaseRate && <p style={{ color: "red" }}>{errors.ticketReleaseRate}</p>}
        </div>

        <div className="my-3">
          <label className="mr-3">Customer Retrieval Rate (ms):</label>
          <input className="bg-white bg-opacity-80 rounded-sm text-black"
            type="number"
            name="customerRetrievalRate"
            value={config.customerRetrievalRate}
            onChange={handleChange}
          />
          {errors.customerRetrievalRate && <p style={{ color: "red" }}>{errors.customerRetrievalRate}</p>}
        </div>

        <div className="my-3">
          <label className="mr-3">Maximum Ticket Capacity:</label>
          <input className="bg-white bg-opacity-80 rounded-sm text-black"
            type="number"
            name="maxTicketCapacity"
            value={config.maxTicketCapacity}
            onChange={handleChange}
          />
          {errors.maxTicketCapacity && <p style={{ color: "red" }}>{errors.maxTicketCapacity}</p>}
        </div>

        <button type="submit" className="bg-blue-500">Save Configuration</button>
      </form>
    </div>
  );
};

export default ConfigurationForm;
