package com.project.pcpartpicker.dto;

import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;

public class ExceptionResponseDTO {
    //Fields
    private LocalDateTime timeStamp;
    private int status;
    private String error;
    private String message;
    private String path;

    //Default constructor
    public ExceptionResponseDTO() {
    }


    public static ExceptionResponseDTO fromException(String message, HttpStatus status, String path){
        ExceptionResponseDTO exceptionDTO = new ExceptionResponseDTO();
        exceptionDTO.timeStamp = LocalDateTime.now();
        exceptionDTO.status = status.value();
        exceptionDTO.error = status.getReasonPhrase();
        exceptionDTO.message = message;
        exceptionDTO.path = path;

        return exceptionDTO;
    }

    //Getters
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
