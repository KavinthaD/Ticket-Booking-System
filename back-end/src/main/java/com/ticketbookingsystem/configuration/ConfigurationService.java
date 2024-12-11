package com.ticketbookingsystem.configuration;

import com.ticketbookingsystem.controller.LoggingController;
import com.ticketbookingsystem.model.Customer;
import com.ticketbookingsystem.model.TicketPool;
import com.ticketbookingsystem.model.Vendor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.FileNotFoundException;
import java.util.List;

@Service
public class ConfigurationService {

    @Autowired
    private LoggingController loggingController;  // Inject LoggingController

    @Autowired
    private ConfigurationRepository configurationRepository;

    public Configuration saveConfiguration(int totalTickets, int ticketReleaseRate, int customerRetrievalRate, int maxTicketCapacity) {
        Configuration config = new Configuration(totalTickets, ticketReleaseRate, customerRetrievalRate, maxTicketCapacity);
        configurationRepository.save(config);  // Save the configuration to the database
        return config;
    }

    public List<Configuration> getAllConfigurations() {
        return configurationRepository.findAll();
    }

    public Configuration getConfigurationById(int id) {
        return configurationRepository.findById(id).orElseThrow();
    }

    public void beginTicketFlow(Configuration config) throws InterruptedException, FileNotFoundException {
        System.out.println("\nBegin ticket flow");
        loggingController.startLogging();  // Start logging
        // Create the TicketPool and other logic
        TicketPool ticketPool = new TicketPool(400); // create total ticket capacity and ticket queue

        Vendor[] vendors = new Vendor[4]; // Create vendors and add tickets to ticket pool
        for (int i = 0; i < vendors.length; i++) {
            vendors[i] = new Vendor(config.getMaxTicketCapacity(),config.getTotalTickets(), config.getTicketReleaseRate(), ticketPool, i);
            Thread vendorThread = new Thread(vendors[i], "Vendor ID-" + (i + 1)); //
            vendorThread.start();
        }

        Customer[] customers = new Customer[3]; // Create customers and remove tickets from ticket pool
        for (int i = 0; i < customers.length; i++) {
            customers[i] = new Customer(i, ticketPool, 6, 5); // quantity is how many tickets 1 customer buys
            Thread customerThread = new Thread(customers[i], "Customer ID-" + (i + 1));
            customerThread.start();
        }
    }
}

