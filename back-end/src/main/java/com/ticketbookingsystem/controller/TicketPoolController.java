//package org.example.ticketbookingsystem.controller;
//
//import org.example.ticketbookingsystem.configuration.Configuration;
//import org.example.ticketbookingsystem.configuration.ConfigurationService;
//import org.example.ticketbookingsystem.services.TicketPoolService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.*;
//
//
//@RestController
//@CrossOrigin(origins = "http://localhost:5173") // Allow requests from the frontend
//@RequestMapping("/api/configurations")  // This is the base URL
//public class TicketPoolController {
//
//    private TicketPoolService ticketPoolService;
//
//    // Start Ticket Flow Endpoint
//    @PostMapping("/start-flow")
//    public String startTicketFlow(@RequestBody Configuration config) {
//        try {
//            ticketPoolService.beginTicketFlow(config);
//            return "Ticket flow started successfully!";
//        } catch (InterruptedException e) {
//            e.printStackTrace();
//            return "Error while starting ticket flow!";
//        }
//    }
//}
