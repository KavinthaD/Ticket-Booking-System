import React, { useEffect, useState } from "react";

const TicketDisplay = ({ logs }) => {
  const [vendors, setVendors] = useState([]);

  // List of unique names
  const uniqueNames = [
    "Jiro",
    "Itadori",
    "Gojo",
    "Takumi",
    "Mikey",
    "Levi",
    "Nezuko",
    "Tanjirou",
    "Zoro",
    "Luffy",
  ];

  // Map to store static vendor names
  const vendorNameMap = new Map();

  // Function to get or assign a unique name for a vendor
  const getStaticVendorName = (vendorId) => {
    if (!vendorNameMap.has(vendorId)) {
      const assignedName = uniqueNames[vendorNameMap.size % uniqueNames.length]; // Assign a unique name
      vendorNameMap.set(vendorId, assignedName);
    }
    return vendorNameMap.get(vendorId);
  };

  useEffect(() => {
    if (!logs || logs.length === 0) return;

    // Object to track available tickets for each vendor
    const ticketCounts = {};

    logs.forEach((log) => {
      // Match the "Ticket added" logs
      const ticketAddedMatch = log.match(
        /Ticket added by - Vendor ID-(\d+) - current size is \d+ - Ticket info - Ticket\{ticketId=v\d+t\d+, eventName='.*', ticketPrice=\d+\.\d+\}/
      );

      if (ticketAddedMatch) {
        const vendorId = parseInt(ticketAddedMatch[1], 10);

        // Initialize the vendor ticket count if not present
        if (!ticketCounts[vendorId]) {
          ticketCounts[vendorId] = 0;
        }

        // Add one ticket to the vendor's available tickets
        ticketCounts[vendorId] += 1;
      }

      // Match the "Ticket bought" logs
      const ticketBoughtMatch = log.match(
        /Ticket bought by - Customer ID-\d+ - current size is - \d+ - Ticket info - Ticket\{ticketId=(v\d+)t\d+, eventName='.*', ticketPrice=\d+\.\d+\}/
      );

      if (ticketBoughtMatch) {
        const vendorId = parseInt(ticketBoughtMatch[1].slice(1), 10); // Extract vendor ID (ex: v1 -> 1)

        // Initialize the vendor ticket count if not present
        if (!ticketCounts[vendorId]) {
          ticketCounts[vendorId] = 0;
        }

        // Decrease one ticket from the vendor's available tickets
        ticketCounts[vendorId] -= 1;
      }
    });

    // Convert ticketCounts object to an array of vendors
    const parsedVendors = Object.entries(ticketCounts).map(([vendorId, availableTickets]) => ({
      id: parseInt(vendorId, 10),
      name: getStaticVendorName(vendorId),
      availableTickets,
    }));

    setVendors(parsedVendors);
  }, [logs]);

  return (
    <div className="bg-black bg-opacity-80 rounded-md p-6 text-white">
      <h1 className="text-2xl font-bold mb-4 text-center">Available Tickets</h1>
      <table className="table-auto w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-700">
            <th className="px-4 py-2">Vendor ID</th>
            <th className="px-4 py-2">Vendor Name</th>
            <th className="px-4 py-2">Available Tickets</th>
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
