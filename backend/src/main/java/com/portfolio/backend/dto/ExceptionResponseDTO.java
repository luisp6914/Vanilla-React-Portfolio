package com.portfolio.backend.dto;

import com.portfolio.backend.exception.PatientNotFoundException;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;

public class ExceptionResponseDTO {
    private LocalDateTime timeStamp;
    private int status;
    private String error;
    private String message;
    private String path;

    public ExceptionResponseDTO(){};

    public static ExceptionResponseDTO fromException(String message, HttpStatus status, String path){
        ExceptionResponseDTO dto = new ExceptionResponseDTO();
        dto.timeStamp = LocalDateTime.now();
        dto.status = status.value();
        dto.error = status.getReasonPhrase();
        dto.message = message;
        dto.path = path;
        return dto;
    }

    public LocalDateTime getTimeStamp() {
        return timeStamp;
    }

    public int getStatus() {
        return status;
    }

    public String getError() {
        return error;
    }

    public String getMessage() {
        return message;
    }

    public String getPath() {
        return path;
    }
}
