import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js modules
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const TicketLineChart = ({ logs }) => {
  const [chartData, setChartData] = useState(null);

  // Predefined list of colors for the vendors
  const colorList = [
    "#FF5733", // Vendor 1 color
    "#33FF57", // Vendor 2 color
    "#3357FF", // Vendor 3 color
    "#FF33A1", // Vendor 4 color
    "#F9FF33", // Vendor 5 color
    "#FF8C33", // Vendor 6 color
    "#33FFF6", // Vendor 7 color
    "#FF33FF", // Vendor 8 color
    "#33D1FF", // Vendor 9 color
    "#F7FF33", // Vendor 10 color
  ];

  // Function to get a color for each vendor
  const getColorForVendor = (vendorId) => {
    return colorList[vendorId % colorList.length]; // Ensure vendor gets a color from the list
  };

  useEffect(() => {
    if (!logs || logs.length === 0) return;

    const vendorData = {}; // Object to store data for each vendor

    // Iterate over the logs and process each one
    logs.forEach((log, index) => {
      const time = `${index * 1}s`; // Assume each log is recorded at 1-second intervals for simplicity

      // Parse "Ticket bought" logs
      const ticketBoughtMatch = log.match(
        /Ticket bought by - Customer ID-\d+ - current size is - \d+ - Ticket info - Ticket\{ticketId=(v\d)t(\d+),/
      );

      if (ticketBoughtMatch) {
        const vendorId = parseInt(ticketBoughtMatch[1].slice(1), 10); // Extract vendor ID (e.g., "v2" -> 2)
        const ticketCount = parseInt(ticketBoughtMatch[2], 10); // Extract ticket number (e.g., "t1" -> 1)

        // If vendor data doesn't exist, create it
        if (!vendorData[vendorId]) {
          vendorData[vendorId] = { timestamps: [], ticketSales: [] };
        }

        // Set the ticket count for the vendor (just set the sales to the current ticket count)
        vendorData[vendorId].timestamps.push(time);
        vendorData[vendorId].ticketSales.push(ticketCount); // Set the sales as per the `tX` value
      }
    });

    // Format data for the chart
    const timestamps = Object.values(vendorData)[0]?.timestamps || [];
    const datasets = Object.entries(vendorData).map(([vendorId, data]) => ({
      label: `Vendor ${vendorId}`,
      data: data.ticketSales,
      borderColor: getColorForVendor(vendorId), // Use a color from the list
      backgroundColor: getColorForVendor(vendorId), // Use the same color for background
      tension: 0.3,
      fill: false, // Make sure the lines are not filled, to prevent them from overlapping
      borderWidth: 2, // Adjust the width of the line to make it more visible
      pointRadius: 5, // Add points to the line for better visibility
      pointBackgroundColor: getColorForVendor(vendorId), // Color of the points
    }));

    setChartData({
      labels: timestamps,
      datasets,
    });
  }, [logs]);

  const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Vendor Ticket Sales Over Time",
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: "Time (seconds)",
      },
    },
    y: {
      title: {
        display: true,
        text: "Tickets Sold",
      },
      beginAtZero: true,
      // ticks: {
      //   callback: function(value) {
      //     return Math.floor(value); // Round down to the nearest whole number
      //   },
      // },
    },
  },
};

  return (
    <div className="bg-black bg-opacity-80 rounded-md p-6 text-white">
      {chartData ? (
        <>
          <h1 className="text-2xl font-bold mb-4 text-center">Vendor Ticket Sales Chart</h1>
          <Line data={chartData} options={options} />
        </>
      ) : (
        <div>Loading chart data...</div>
      )}
    </div>
  );
};

export default TicketLineChart;
