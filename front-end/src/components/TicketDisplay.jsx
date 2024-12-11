import React, { useEffect, useState } from "react";

const TicketDisplay = ({ logs }) => {
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    if (!logs || logs.length === 0) return;

    // Parse the logs to extract vendor information
    const parsedVendors = logs.reduce((acc, log) => {
      // Match the "Ticket added" logs
      const ticketAddedMatch = log.match(
        /Ticket added by - Vendor ID-(\d+) - current size is (\d+)/
      );
      
      if (ticketAddedMatch) {
        const vendorId = parseInt(ticketAddedMatch[1], 10);
        const availableTickets = parseInt(ticketAddedMatch[2], 10);

        // Update the vendor info
        const existingVendor = acc.find((v) => v.id === vendorId);
        if (existingVendor) {
          existingVendor.availableTickets = availableTickets;
        } else {
          acc.push({
            id: vendorId,
            name: `Vendor ${vendorId}`,
            availableTickets,
          });
        }
      }

      // Match the "Ticket bought" logs
      const ticketBoughtMatch = log.match(
        /Ticket bought by - Customer ID-(\d+) - current size is - (\d+) - Ticket is - Ticket\{ticketId=(v[12]\w+), eventName='.*', ticketPrice=\d+\}/
      );

      if (ticketBoughtMatch) {
        const vendorId = ticketBoughtMatch[3].startsWith('v1') ? 1 : 2; // Determine vendor from ticketId
        const currentSize = parseInt(ticketBoughtMatch[2], 10); // The current size after the purchase

        // Update the vendor info for "Ticket bought"
        const existingVendor = acc.find((v) => v.id === vendorId);
        if (existingVendor) {
          existingVendor.availableTickets = currentSize;
        } else {
          acc.push({
            id: vendorId,
            name: `Vendor ${vendorId}`,
            availableTickets: currentSize,
          });
        }
      }

      return acc;
    }, []);

    setVendors(parsedVendors);
  }, [logs]);

  return (
    <div className="bg-black bg-opacity-80 rounded-md p-6 text-white">
      <h1 className="text-2xl font-bold mb-4 text-center">Available Tickets</h1>
      <table className="table-auto w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-700">
            <th className="px-4 py-2 ">Vendor ID</th>
            <th className="px-4 py-2 ">Vendor Name</th>
            <th className="px-4 py-2 ">Available Tickets</th>
          </tr>
        </thead>
        <tbody>
          {vendors.length > 0 ? (
            vendors.map((vendor) => (
              <tr key={vendor.id} className="border-b border-gray-700">
                <td className="px-4 py-2">{vendor.id}</td>
                <td className="px-4 py-2">{vendor.name}</td>
                <td className="px-4 py-2">{vendor.availableTickets}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="px-4 py-2 text-center">
                No ticket data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TicketDisplay;
