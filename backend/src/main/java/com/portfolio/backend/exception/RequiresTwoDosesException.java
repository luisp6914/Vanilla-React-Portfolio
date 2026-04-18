package com.portfolio.backend.exception;

public class RequiresTwoDosesException extends RuntimeException {
    public RequiresTwoDosesException(String message) {
        super(message);
    }
}
