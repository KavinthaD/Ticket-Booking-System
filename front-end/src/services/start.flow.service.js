// start.flow.service.js
import http from "../http-common";

const create = async (data) => {
  console.log("Starting ticket flow...");
  
  try {
    // Start the ticket flow
    const response = await http.post("/start-flow", data);
    console.log(response.data);
  } catch (error) {
    console.error("Error starting the ticket flow:", error);
    throw error; // Propagate the error to the caller
  }
};

const StartFlowService = {
  create,
};

export default StartFlowService;
