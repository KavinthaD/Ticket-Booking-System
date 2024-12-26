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

    const vendorData = {}; // Object to store revenue data for each vendor
    let lastTimestamp = 0; // To track the last timestamp for each log entry

    // Iterate over the logs and process each one
    logs.forEach((log, index) => {
      let timestamp = 0; // Default to 0 if no valid timestamp found

      // Parse "Ticket bought" logs for vendor ID and ticket price
      const ticketBoughtMatch = log.match(
        /Ticket bought by - Customer ID-\d+ - .*?Ticket\{ticketId=(v\d+)t\d+,.*?ticketPrice=(\d+\.\d+)/
      );
      if (ticketBoughtMatch) {
        const vendorId = parseInt(ticketBoughtMatch[1].slice(1), 10); // Extract vendor ID (e.g., "v2" -> 2)
        const ticketPrice = parseFloat(ticketBoughtMatch[2]); // Extract ticket price

        // If this is the first log or the time hasn't been set, use lastTimestamp + 1 (to ensure incremental time)
        timestamp = lastTimestamp + 1;

        // Initialize vendor data if not already initialized
        if (!vendorData[vendorId]) {
          vendorData[vendorId] = { timestamps: [], revenue: [0] };
        }

        // Accumulate revenue for the vendor
        const previousRevenue =
          vendorData[vendorId].revenue[vendorData[vendorId].revenue.length - 1] || 0;
        const newRevenue = previousRevenue + ticketPrice;

        vendorData[vendorId].timestamps.push(timestamp);
        vendorData[vendorId].revenue.push(newRevenue);

        // Update lastTimestamp
        lastTimestamp = timestamp;
      }
    });

    // Format data for the chart
    const allTimestamps = [];
    Object.values(vendorData).forEach((data) => {
      allTimestamps.push(...data.timestamps);
    });

    // Ensure all timestamps are unique and sorted
    const timestamps = [...new Set(allTimestamps)].sort((a, b) => a - b);

    const datasets = Object.entries(vendorData).map(([vendorId, data]) => ({
      label: `Vendor ${vendorId}`,
      data: data.revenue,
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
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Time (seconds)",
        },
        ticks: {
          autoSkip: false,
          maxTicksLimit: 20, // Limit the number of x-axis ticks for better spacing
        },
      },
      y: {
        title: {
          display: true,
          text: "Revenue (in currency)",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-black bg-opacity-80 rounded-md p-6 text-white">
      {chartData ? (
        <>
          <h1 className="text-2xl font-bold mb-4 text-center">Vendor Ticket Revenue Chart</h1>
          <Line data={chartData} options={options} />
        </>
      ) : (
        <div>Loading chart data...</div>
      )}
    </div>
  );
};

export default TicketLineChart;
