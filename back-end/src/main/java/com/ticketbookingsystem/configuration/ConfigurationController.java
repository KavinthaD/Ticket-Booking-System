package com.ticketbookingsystem.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173") // Allow requests from the frontend
@RequestMapping("/api/configurations")  // This is the base URL
public class ConfigurationController {

    @Autowired
    private ConfigurationService configurationService;

    // Save Configuration Endpoint
    @PostMapping("/save")
    public Configuration saveConfiguration(@RequestBody Configuration config) {
        return configurationService.saveConfiguration(
                config.getTotalTickets(),
                config.getTicketReleaseRate(),
                config.getCustomerRetrievalRate(),
                config.getMaxTicketCapacity()
        );
    }

    // Start Ticket Flow Endpoint
    @PostMapping("/start-flow")
    public String startTicketFlow(@RequestBody Configuration config) {
        try {
            configurationService.beginTicketFlow(config);
            return "Ticket flow started successfully!";
        } catch (InterruptedException e) {
            e.printStackTrace();
            return "Error while starting ticket flow!";
        }
    }
}
