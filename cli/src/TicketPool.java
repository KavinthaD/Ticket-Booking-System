import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.Map;
import java.util.Queue;

public class TicketPool {
    private int totalTickets;
    private Queue<Ticket> ticketQueue;
    public int ticketCount = 0;
    private Map<Integer, Integer> vendorTicketsMap;

    //creating timestamp
    private static final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss.SSS");

    public TicketPool(int totalTickets) {
        this.totalTickets = totalTickets;
        this.ticketQueue = new LinkedList<>();
        this.vendorTicketsMap = new HashMap<>();
    }

    public int getTicketCount() {
        return ticketCount;
    }

    // Vendor who is the Producer will call the addTicket() method
    public synchronized void addTicket(Ticket ticket){
        while (ticketQueue.size() >= totalTickets){
            try {
                wait();
            } catch (InterruptedException e) {
                e.printStackTrace(); // For command line interface (CLI)
                throw new RuntimeException(e.getMessage()); // For Client-Server application
            }
        }

        this.ticketQueue.add(ticket);
        ticketCount++;
        notifyAll(); // Notify all the waiting threads
        String timestampForAdd = LocalDateTime.now().format(formatter);
        System.out.println("[" + timestampForAdd + "] "
                + "Ticket added by - " + Thread.currentThread().getName()
                + " - current size is " + ticketQueue.size()
                + " - Ticket info - " + ticket);
    }

    // Customer who is the Consumer will call the buyTicket() method
    public synchronized Ticket removeTicket(){
        while (ticketQueue.isEmpty()){
            try {
                wait(); // If queue is empty add Customer to waiting status
            } catch (InterruptedException e) {
                throw new RuntimeException(e.getMessage());
            }
        }

        Ticket ticket = ticketQueue.poll();
        notifyAll();
        String timestamp = LocalDateTime.now().format(formatter);
        System.out.println("[" + timestamp + "] "
                + "Ticket bought by - " + Thread.currentThread().getName()
                + " - current size is - " + ticketQueue.size()
                + " - Ticket info - " + ticket);
        return ticket;
    }
}
