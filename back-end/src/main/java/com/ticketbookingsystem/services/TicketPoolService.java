//package org.example.ticketbookingsystem.services;
//
//import org.example.ticketbookingsystem.configuration.Configuration;
//import org.example.ticketbookingsystem.model.Customer;
//import org.example.ticketbookingsystem.model.TicketPool;
//import org.example.ticketbookingsystem.model.Vendor;
//
//public class TicketPoolService {
//    public void beginTicketFlow(Configuration config) throws InterruptedException {
//        // Create the TicketPool and other logic
//        TicketPool ticketPool = new TicketPool(config.getTotalTickets()); // create total ticket capacity and ticket queue
//
//        Vendor[] vendors = new Vendor[2]; // Create vendors and add tickets to ticket pool
//        for (int i = 0; i < vendors.length; i++) {
//            vendors[i] = new Vendor(config.getTotalTickets(), config.getTicketReleaseRate(), ticketPool, i, config.getMaxTicketCapacity());
//
//            Thread vendorThread = new Thread(vendors[i], "Vendor ID-" + (i + 1)); //
//            vendorThread.start();
//        }
//
//        Customer[] customers = new Customer[3]; // Create customers and remove tickets from ticket pool
//        for (int i = 0; i < customers.length; i++) {
//            customers[i] = new Customer(i, ticketPool, 6, 5); // quantity is how many tickets 1 customer buys
//            Thread customerThread = new Thread(customers[i], "Customer ID-" + (i + 1));
//            customerThread.start();
//        }
//    }
//}
