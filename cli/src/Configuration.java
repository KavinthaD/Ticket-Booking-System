public class Configuration {
    private int totalTickets;
    private int ticketReleaseRate;
    private TicketPool ticketPool;

    public Configuration(int totalTickets, int ticketReleaseRate, TicketPool ticketPool) {
        this.totalTickets = totalTickets;
        this.ticketReleaseRate = ticketReleaseRate;
        this.ticketPool = ticketPool;
    }
}
