package com.civiclink.project.Exception;

public class IssueNotFoundException extends RuntimeException {
    public IssueNotFoundException(String message) {
        super(message);
    }
}
