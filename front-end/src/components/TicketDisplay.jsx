import React from "react";

const TicketDisplay = () => {
    // Mock data for vendors and their available tickets
    const vendors = [
        { id: 1, name: "Vendor A", availableTickets: 50 },
        { id: 2, name: "Vendor B", availableTickets: 30 },
        { id: 3, name: "Vendor C", availableTickets: 75 },
    ];

    return (
        <div className="bg-black bg-opacity-80 rounded-md p-6 text-white">
            <h1 className="text-2xl font-bold mb-4 text-center">Available Tickets</h1>
            <table className="table-auto w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-gray-700">
                        <th className="px-4 py-2 w-[150px]">Vendor ID</th>
                        <th className="px-4 py-2 w-[200px]">Vendor Name</th>
                        <th className="px-4 py-2 w-[250px]">Available Tickets</th>
                    </tr>
                </thead>
                <tbody>
                    {vendors.map((vendor) => (
                        <tr key={vendor.id} className="border-b border-gray-700">
                            <td className="px-4 py-2">{vendor.id}</td>
                            <td className="px-4 py-2">{vendor.name}</td>
                            <td className="px-4 py-2">{vendor.availableTickets}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TicketDisplay;
