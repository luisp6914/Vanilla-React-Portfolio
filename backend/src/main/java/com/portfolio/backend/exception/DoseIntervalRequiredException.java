package com.portfolio.backend.exception;

public class DoseIntervalRequiredException extends RuntimeException {
    public DoseIntervalRequiredException(String message) {
        super(message);
    }
}
