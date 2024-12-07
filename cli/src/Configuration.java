

import java.io.*;
import java.util.ArrayList;
import java.util.List;

public class Configuration {
    private static int currentConfigId; // Static variable to track the configuration ID
    private int configId; // Instance variable for each configuration
    private int totalTickets;
    private int ticketReleaseRate;
    private int customerRetrievalRate;
    private int maxTicketCapacity;

    public Configuration(int totalTickets, int ticketReleaseRate, int customerRetrievalRate, int maxTicketCapacity) {
        this.configId = loadCurrentConfigId();
        this.totalTickets = totalTickets;
        this.ticketReleaseRate = ticketReleaseRate;
        this.customerRetrievalRate = customerRetrievalRate;
        this.maxTicketCapacity = maxTicketCapacity;
    }

    // Getters
    public int getTotalTickets() {
        return totalTickets;
    }

    public int getTicketReleaseRate() {
        return ticketReleaseRate;
    }

    public int getCustomerRetrievalRate() {
        return customerRetrievalRate;
    }

    public int getMaxTicketCapacity() {
        return maxTicketCapacity;
    }
    // Method to save the configuration to a text file
    public void saveConfiguration() {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter("config.txt", true))) { // Append mode
            writer.write("ConfigID: " + this.configId + "\n");
            writer.write("TotalTickets: " + this.totalTickets + "\n");
            writer.write("TicketReleaseRate: " + this.ticketReleaseRate + "\n");
            writer.write("CustomerRetrievalRate: " + this.customerRetrievalRate + "\n");
            writer.write("MaxTicketCapacity: " + this.maxTicketCapacity + "\n");
            writer.write("---\n"); // Separator for configurations
            System.out.println("\nConfiguration saved successfully.");
            // Increment and save the new Config ID
            saveCurrentConfigId(this.configId + 1);

        } catch (IOException e) {
            System.out.println("Error saving configuration: " + e.getMessage());
        }
    }

    private static int loadCurrentConfigId() {
        try (BufferedReader reader = new BufferedReader(new FileReader("config_id.txt"))) {
            return Integer.parseInt(reader.readLine());
        } catch (IOException | NumberFormatException e) {
            System.out.println("Error reading config ID file. Defaulting to 1.");
            return 1; // Default to 1 if the file is missing or corrupted
        }
    }

    // Save the updated Config ID to config_id.txt
    private static void saveCurrentConfigId(int nextId) {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter("config_id.txt"))) {
            writer.write(String.valueOf(nextId));
        } catch (IOException e) {
            System.out.println("Error saving config ID: " + e.getMessage());
        }
    }

    // Method to load the configuration from a text file
    public static List<Configuration> loadAllConfigurations() {
        List<Configuration> configurations = new ArrayList<>();
        try (BufferedReader reader = new BufferedReader(new FileReader("config.txt"))) {
            String line;
            int configId = 0, totalTickets = 0, ticketReleaseRate = 0, customerRetrievalRate = 0, maxTicketCapacity = 0;

            while ((line = reader.readLine()) != null) {
                if (line.startsWith("ConfigID: ")) {
                    configId = Integer.parseInt(line.split(": ")[1]);
                } else if (line.startsWith("TotalTickets: ")) {
                    totalTickets = Integer.parseInt(line.split(": ")[1]);
                } else if (line.startsWith("TicketReleaseRate: ")) {
                    ticketReleaseRate = Integer.parseInt(line.split(": ")[1]);
                } else if (line.startsWith("CustomerRetrievalRate: ")) {
                    customerRetrievalRate = Integer.parseInt(line.split(": ")[1]);
                } else if (line.startsWith("MaxTicketCapacity: ")) {
                    maxTicketCapacity = Integer.parseInt(line.split(": ")[1]);
                } else if (line.equals("---")) { // End of one configuration
                    configurations.add(new Configuration(totalTickets, ticketReleaseRate, customerRetrievalRate, maxTicketCapacity));
                    configurations.get(configurations.size() - 1).configId = configId; // Assign config ID
                }
            }
        } catch (IOException e) {
            System.out.println("Error loading configurations: " + e.getMessage());
            System.exit(0);
        }
        return configurations;
    }
    // Display the configuration
    @Override
    public String toString() {
        return "ConfigID: " + configId + "\n" +
                "TotalTickets: " + totalTickets + "\n" +
                "TicketReleaseRate: " + ticketReleaseRate + "\n" +
                "CustomerRetrievalRate: " + customerRetrievalRate + "\n" +
                "MaxTicketCapacity: " + maxTicketCapacity;
    }

    public int getConfigId() {
        return configId;
    }
}