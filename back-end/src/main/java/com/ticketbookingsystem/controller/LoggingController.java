package com.ticketbookingsystem.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.PrintStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

@RestController
public class LoggingController {

    private PrintStream originalOut = System.out;  // Save the original System.out

    // Start logging when this method is called
    public void startLogging() throws FileNotFoundException {
        // Create a custom log file to start logging
        PrintStream logStream = new PrintStream(new FileOutputStream("logs/my-custom-log.log"));
        System.setOut(logStream); // Redirect System.out to this log file
    }

    // Stop logging by restoring the original System.out
    public void stopLogging() {
        System.setOut(originalOut); // Restore original System.out
        System.out.println("Logging stopped at: " + System.currentTimeMillis());
    }
    @GetMapping("/api/logs")
    public List<String> getLogs() throws IOException {
        // Path to the log file
        String logFilePath = "logs/my-custom-log.log";

        // Read all lines from the log file
        return Files.readAllLines(Paths.get(logFilePath));
    }
}
