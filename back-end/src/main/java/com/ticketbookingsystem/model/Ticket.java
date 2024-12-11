package com.ticketbookingsystem.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;




@Entity
public class Ticket {
    @Id
    private String ticketId;
    private String eventName;
    private double ticketPrice;



    public Ticket(String ticketId, String eventName, double ticketPrice) {
        this.ticketId = ticketId;
        this.eventName = eventName;
        this.ticketPrice = ticketPrice;
    }

    public Ticket() {}

    public String getTicketId() {
        return ticketId;
    }

    public void setTicketId(String ticketId) {
        this.ticketId = ticketId;
    }

    public String getEventName() {
        return eventName;
    }

    public void setEventName(String eventName) {
        this.eventName = eventName;
    }

    public double getTicketPrice() {
        return ticketPrice;
    }

    public void setTicketPrice(double ticketPrice) {
        this.ticketPrice = ticketPrice;
    }

    @Override
    public String toString() {
        return "Ticket{" +
                "ticketId=" + ticketId +
                ", eventName='" + eventName + '\'' +
                ", ticketPrice=" + ticketPrice +
                '}';
    }
}
