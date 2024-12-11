package com.ticketbookingsystem.model;

public class Customer implements Runnable{

    private int customerId;
    private TicketPool ticketPool;
    private int customerRetrivelRate;
    private int quantity;

    public Customer(int customerId,TicketPool ticketPool, int customerRetrivelRate, int quantity) {
        this.customerId = customerId;
        this.ticketPool = ticketPool;
        this.customerRetrivelRate = customerRetrivelRate;
        this.quantity = quantity;
    }

    public int getCustomerId() {
        return customerId;
    }

    @Override
    public void run() {
        for (int i = 0; i < quantity; i++) {
            Ticket ticket = ticketPool.removeTicket(); // Call method to buyTickets
            try {
                Thread.sleep(customerRetrivelRate); // Retrieving delay
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
        }
    }
}
