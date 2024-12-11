import http from "../http-common";

const create = async (data) => {
  console.log("Saving tickets...");
  
  try {
    // Save the configuration
    const saveResponse = await http.post("/save", data);
    console.log("Configuration saved successfully:");

    return {
      saveResponse: saveResponse.data,
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