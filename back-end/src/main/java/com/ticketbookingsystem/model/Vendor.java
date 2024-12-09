package com.ticketbookingsystem.model;

import java.math.BigDecimal;

public class Vendor implements Runnable{
    private int totalTickets; // Tickets willing to sell
    private int ticketReleaseRate; // Frequency of releasing
    private TicketPool ticketPool; // Shared resource between Vendors and Customers
    private int vendorId;
    private int maxTicketCapacity; // Add this field


    public Vendor(int totalTickets, int ticketReleaseRate, TicketPool ticketPool,int vendorId, int maxTicketCapacity) {
        this.totalTickets = totalTickets;
        this.ticketReleaseRate = ticketReleaseRate;
        this.ticketPool = ticketPool;
        this.vendorId = vendorId;
        this.maxTicketCapacity = maxTicketCapacity;
    }

    public int getVendorId() {
        return vendorId;
    }

    @Override
    public void run() {
        for (int i = 1; i <= totalTickets; i++) {

            if (ticketPool.getTicketCount() == maxTicketCapacity){
                System.out.println("Maximum ticket capacity reached. Stopping the system.");
                break; // Exit the loop
            }

            String ticketId = "v"+(vendorId+1)+"t"+i;
            Ticket ticket = new Ticket(ticketId,"Event", new BigDecimal("1000"));
            ticketPool.addTicket(ticket);
            try {
                Thread.sleep(ticketReleaseRate);
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
        }
    }
}
