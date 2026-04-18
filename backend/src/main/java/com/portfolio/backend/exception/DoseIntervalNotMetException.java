package com.portfolio.backend.exception;

public class DoseIntervalNotMetException extends RuntimeException {
    public DoseIntervalNotMetException(String message) {
        super(message);
    }
}
