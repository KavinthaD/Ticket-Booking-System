package com.ticketbookingsystem.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

@RestController
public class LogController {

    @GetMapping("/api/logs")
    public List<String> getLogs() throws IOException {
        // Path to the log file
        String logFilePath = "logs/my-custom-log.log";

        // Read all lines from the log file
        return Files.readAllLines(Paths.get(logFilePath));
    }
}
