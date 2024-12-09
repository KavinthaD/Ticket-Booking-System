import http from "../http-common";

const create = async (data) => {
  console.log("Saving and starting flow...");
  
  try {
    // Save the configuration
    const saveResponse = await http.post("/save", data);
    console.log("Configuration saved successfully:", saveResponse.data);

    // Start the ticket flow
    const startFlowResponse = await http.post("/start-flow", data);
    console.log("Ticket flow started successfully:", startFlowResponse.data);

    return {
      saveResponse: saveResponse.data,
      startFlowResponse: startFlowResponse.data,
    };
  } catch (error) {
    console.error("Error during save or start flow:", error);
    throw error; // Propagate the error to the caller
  }  

};

const getAll = () => {
  return http.get("/tickets");
};

const TicketDataService = {
  create,
  getAll,
};

export default TicketDataService;