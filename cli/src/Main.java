

import java.util.List;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        int choice = -1;
        System.out.print(
                "\nSystem Initialization and Configuration:\n" +
                        "------------------------------------------\n" +
                        "1. Save configuration\n" +
                        "2. Load configuration\n" +
                        "------------------------------------------\n" +
                        "choice (press 1 or 2) : "
        );

        //loop until get valid choice (1 or 2)
        while (choice != 1 && choice != 2) {
            try {
                choice = input.nextInt();

                if (choice == 1) {
                    System.out.println();
                    int MaxTicketCapacity = getValidInput(input, "Enter maximum ticket capacity : ");
                    int TotalTickets = getValidInput(input, "Enter total number of tickets: ", 1, MaxTicketCapacity); //1-should be lower than limit
                    int TicketReleaseRate = getValidInput(input, "Enter ticket release rate(ms): ", 0, 200); //0-should be more than limit
                    int CustomerRetrievalRate = getValidInput(input, "Enter customer retrieval rate(ms): ", 0, 200);

                    //display and save configuration
                    Configuration config = new Configuration(MaxTicketCapacity, TotalTickets, TicketReleaseRate, CustomerRetrievalRate);
                    config.saveConfiguration();

                    System.out.println("Max Ticket Capacity (for the event): " + config.getMaxTicketCapacity());
                    System.out.println("Total Tickets (1 vendor can add): " + config.getTotalTickets());
                    System.out.println("Ticket Release Rate(ms): " + config.getTicketReleaseRate());
                    System.out.println("Customer Retrieval Rate(ms): " + config.getCustomerRetrievalRate() + "\n");

                    beginTicketFlow(config);

                } else if (choice == 2) {
                    // Load all configurations
                    List<Configuration> configurations = Configuration.loadAllConfigurations();

                    // Display loaded configuration
                    System.out.println("Existing Configurations:\n");
                    for (Configuration config : configurations) {
                        System.out.println(config + "\n");
                    }
                    //choose config to load
                    System.out.print("Enter configID to load it: ");
                    int chosenConfigId = input.nextInt();

                    // Find the configuration with the matching ConfigID
                    Configuration selectedConfig = null;
                    for (Configuration config : configurations) {
                        if (config.getConfigId() == chosenConfigId) {
                            selectedConfig = config;
                            break;
                        }
                    }

                    // Check if a valid configuration was selected
                    if (selectedConfig != null) {
                        System.out.println("\nLoaded Configuration:");
                        System.out.println(selectedConfig);
                        System.out.println();

                        // Begin the ticket flow with the selected configuration
                        beginTicketFlow(selectedConfig);
                    } else {
                        System.out.println("Invalid ConfigID. Please try again.");
                    }
                    input.close();

                } else {
                    System.out.print("Invalid choice. Please enter 1 to create a new configuration or 2 to load an existing one: ");
                }
                //handle exceptions
            } catch (Exception e) {
                System.out.println("Invalid input. Please enter a valid number (1 or 2):");
                input.nextLine(); // Clear the invalid input
                choice = -1; // Reset choice to remain in the loop
            }
        }

    }

    // Method to get valid positive integer input
    private static int getValidInput(Scanner input, String prompt) {
        int value;
        //loop until get valid input
        while (true) {
            System.out.print(prompt);

            if (input.hasNextInt()) {
                value = input.nextInt();
                if (value > 0) {
                    return value;
                }
            }
            input.nextLine(); // Clear invalid input
            System.out.println("Invalid input. Please enter a positive number.");
        }
    }

    // Overloaded method to validate input based on an upper limit
    private static int getValidInput(Scanner input, String prompt, int limitType, int limit) {
        int value;
        //loop until get valid input
        while (true) {
            System.out.print(prompt);
            if (limitType == 1) {
                if (input.hasNextInt()) {
                    value = input.nextInt();

                    if (value > 0 && value <= limit) {
                        return value;
                    }
                }
                input.nextLine(); // Clear invalid input
                System.out.println("Invalid input. Please enter a positive integer less than " + limit + ".");
            } else {
                if (input.hasNextInt()) {
                    value = input.nextInt();

                    if (value >= limit) {
                        return value;
                    }
                }
                input.nextLine(); // Clear invalid input
                System.out.println("Invalid input. Please enter a positive integer greater than " + limit + ".");
            }


        }
    }

    private static void beginTicketFlow(Configuration config) throws InterruptedException {
        System.out.print("Press enter to Initiate Ticket Automation...");
        Scanner waitForEnter = new Scanner(System.in);
        waitForEnter.nextLine();

        System.out.print("Ticket Automation initialising");
        // Create a loop that adds a dot every 200 milliseconds
        for (int i = 0; i < 3; i++) {
            Thread.sleep(500);  // Wait for 200 milliseconds
            System.out.print("."); // Add a dot to the printed string
        }
        Thread.sleep(500);
        System.out.println("\n");

        TicketPool ticketPool = new TicketPool(400); //create ticket pool limit

        Vendor[] vendors = new Vendor[4]; // Creating array of vendors and add tickets to ticket pool
        for (int i = 0; i < vendors.length; i++) {
            vendors[i] = new Vendor(config.getMaxTicketCapacity(), config.getTotalTickets(), config.getTicketReleaseRate(), ticketPool, i);

            Thread vendorThread = new Thread(vendors[i], "Vendor ID-" + (i + 1)); //
            vendorThread.start();
        }

        Customer[] customers = new Customer[3]; // Creating array of customers and buy/remove tickets from ticket pool
        for (int i = 0; i < customers.length; i++) {
            customers[i] = new Customer(i, ticketPool, 6, 5); //quantity is how many tickets 1 customer buy
            Thread customerThread = new Thread(customers[i], "Customer ID-" + (i + 1));
            customerThread.start();
        }
    }

}

