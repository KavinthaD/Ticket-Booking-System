public class Vendor implements Runnable {
    private int maxTicketCapacity;
    private int totalTickets; // Tickets willing to sell
    private int ticketReleaseRate; // Frequency of releasing
    private TicketPool ticketPool; // Shared resource between Vendors and Customers
    private int vendorId;


    public Vendor(int maxTicketCapacity, int totalTickets, int ticketReleaseRate, TicketPool ticketPool, int vendorId) {
        this.maxTicketCapacity = maxTicketCapacity;
        this.totalTickets = totalTickets;
        this.ticketReleaseRate = ticketReleaseRate;
        this.ticketPool = ticketPool;
        this.vendorId = vendorId;
        ;
    }

    public int getVendorId() {
        return vendorId;
    }

    @Override
    public void run() {
        for (int i = 1; i <= totalTickets; i++) {
            int count = ticketPool.getTicketCount() * 4;
            if (count == maxTicketCapacity) {
                System.out.println("Maximum ticket capacity reached for vendor" + (vendorId + 1) + ". Stopping the system.");
                break; // Exit the loop
            }

            String ticketId = "v" + (vendorId + 1) + "t" + i;

            //events and prices for 4 vendors
            String event = "Event";
            double price = 0;
            if ((vendorId + 1) == 1) {
                event = "Movie: Deadpool 3";
                price = 2000;
            } else if ((vendorId + 1) == 2) {
                event = "Movie: Despicable Me 4";
                price = 2000;
            } else if ((vendorId + 1) == 3) {
                event = "Cricket Match: Sri Lanka vs India";
                price = 1000;
            } else if ((vendorId + 1) == 4) {
                event = "Musical Festival: Spandana 3.0";
                price = 3000;
            }

            Ticket ticket = new Ticket(ticketId, event, price);
            ticketPool.addTicket(ticket);
            try {
                Thread.sleep(ticketReleaseRate);
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
        }
    }
}
