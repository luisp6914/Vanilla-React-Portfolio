package com.project.pcpartpicker.exception;

import com.project.pcpartpicker.dto.ExceptionResponseDTO;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<ExceptionResponseDTO> handleMethodArgumentTypeMisMatchException(MethodArgumentTypeMismatchException ex, HttpServletRequest request){
        String paraName = ex.getName();
        Object invalidValue = ex.getValue();
        String expectedType = ex.getRequiredType() != null ? ex.getRequiredType().getSimpleName() : "value";

        String message = paraName + " must be a valid " + expectedType + ", but got: " + invalidValue;

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ExceptionResponseDTO.fromException(message, HttpStatus.BAD_GATEWAY, request.getRequestURI()));
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ExceptionResponseDTO> handleIllegalArgumentException(IllegalArgumentException ex, HttpServletRequest request){
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ExceptionResponseDTO.fromException(ex.getMessage(), HttpStatus.BAD_REQUEST, request.getRequestURI()));
    }
}
