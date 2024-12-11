// starting log.service.js

const fetchLogs = async () => {
  try {
    const response = await fetch("http://localhost:8080/api/logs");
    if (!response.ok) {
      throw new Error("Failed to fetch logs");
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error fetching logs:", err);
    throw err;
  }
};

export default { fetchLogs };
