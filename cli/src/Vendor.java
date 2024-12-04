import java.math.BigDecimal;

public class Vendor implements Runnable{
    private int totalTickets; // Tickets willing to sell
    private int ticketReleaseRate; // Frequency of releasing
    private TicketPool ticketPool; // Shared resource between Vendors and Customers
    private int vendorId;

    public Vendor(int totalTickets, int ticketReleaseRate, TicketPool ticketPool,int vendorId) {
        this.totalTickets = totalTickets;
        this.ticketReleaseRate = ticketReleaseRate;
        this.ticketPool = ticketPool;
        this.vendorId = vendorId;
    }

    public int getVendorId() {
        return vendorId;
    }

    @Override
    public void run() {
        for (int i = 1; i <= totalTickets; i++) {
            String ticketId = "v"+(vendorId+1)+"t"+i;
            Ticket ticket = new Ticket(ticketId,"Event", new BigDecimal("1000"));
            ticketPool.addTicket(ticket);
            try {
                Thread.sleep(ticketReleaseRate * 1000); // To convert to ms
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
        }
    }
}
