package com.portfolio.backend.exception;

public class InvalidRestockAmountException extends RuntimeException {
    public InvalidRestockAmountException(String message) {
        super(message);
    }
}
