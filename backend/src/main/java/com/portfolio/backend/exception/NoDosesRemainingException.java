package com.portfolio.backend.exception;

public class NoDosesRemainingException extends RuntimeException {
    public NoDosesRemainingException(String message) {
        super(message);
    }
}
