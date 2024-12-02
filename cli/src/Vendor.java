import java.math.BigDecimal;

public class Vendor {
    private int totalTickets;
    private int ticketReleaseRate;
    private TicketPool ticketPool;

    public Vendor(int totalTickets, int ticketReleaseRate, TicketPool ticketPool) {
        this.totalTickets = totalTickets;
        this.ticketReleaseRate = ticketReleaseRate;
        this.ticketPool = ticketPool;
    }
    @Override
    public void run() {
        for (int i = 1; i < totalTickets; i++) {
            Ticket ticket = new Ticket(i,"Simple Event", new BigDecimal("1000"));
            ticketPool.addTicket(ticket);
            try {
                Thread.sleep(ticketReleaseRate * 1000); // To calculate to MS
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
        }
    }
}
