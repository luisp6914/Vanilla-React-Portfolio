package com.portfolio.backend.exception;

import com.portfolio.backend.dto.ExceptionResponseDTO;
import jakarta.persistence.OptimisticLockException;
import jakarta.servlet.http.HttpServletRequest;
import org.aspectj.apache.bcel.classfile.Module;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(PatientNotFoundException.class)
    public ResponseEntity<ExceptionResponseDTO> handlePatientNotFound(PatientNotFoundException ex, HttpServletRequest request){
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ExceptionResponseDTO.fromException(ex.getMessage(), HttpStatus.NOT_FOUND, request.getRequestURI()));
    }

    @ExceptionHandler(VaccineNotFoundException.class)
    public ResponseEntity<ExceptionResponseDTO> handleVaccineNotFound(VaccineNotFoundException ex, HttpServletRequest request){
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ExceptionResponseDTO.fromException(ex.getMessage(), HttpStatus.NOT_FOUND, request.getRequestURI()));
    }

    @ExceptionHandler(NoDosesRemainingException.class)
    public ResponseEntity<ExceptionResponseDTO> handleNoDosesRemaining(NoDosesRemainingException ex, HttpServletRequest request){
        return ResponseEntity.status(HttpStatus.CONFLICT).body(ExceptionResponseDTO.fromException(ex.getMessage(), HttpStatus.CONFLICT, request.getRequestURI()));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ExceptionResponseDTO> handleArgumentNotValid(MethodArgumentNotValidException ex, HttpServletRequest request){
        String message = ex.getBindingResult().getFieldError() != null ? ex.getBindingResult().getFieldError().getDefaultMessage() : "Validation failed";
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ExceptionResponseDTO.fromException(message, HttpStatus.BAD_REQUEST, request.getRequestURI()));
    }

    @ExceptionHandler(OptimisticLockException.class)
    public ResponseEntity<ExceptionResponseDTO> handleOptimisticLockException(HttpServletRequest request){
        String message = "Vaccine is out of stock, please select another";
        return ResponseEntity.status(HttpStatus.CONFLICT).body(ExceptionResponseDTO.fromException(message, HttpStatus.CONFLICT, request.getRequestURI()));
    }

    @ExceptionHandler(RequiresTwoDosesException.class)
    public ResponseEntity<ExceptionResponseDTO> handleRequiresTwoDosesException(RequiresTwoDosesException ex, HttpServletRequest request){
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ExceptionResponseDTO.fromException(ex.getMessage(), HttpStatus.BAD_REQUEST, request.getRequestURI()));
    }

    @ExceptionHandler(DoseIntervalNotMetException.class)
    public ResponseEntity<ExceptionResponseDTO> handleDoseIntervalNotMetException(DoseIntervalNotMetException ex, HttpServletRequest request){
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ExceptionResponseDTO.fromException(ex.getMessage(), HttpStatus.BAD_REQUEST, request.getRequestURI()));
    }

    @ExceptionHandler(DoseTwoExistException.class)
    public ResponseEntity<ExceptionResponseDTO> handleDoseTwoExistException(DoseTwoExistException ex, HttpServletRequest request){
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ExceptionResponseDTO.fromException(ex.getMessage(), HttpStatus.BAD_REQUEST, request.getRequestURI()));
    }

    @ExceptionHandler(DoseIntervalRequiredException.class)
    public ResponseEntity<ExceptionResponseDTO> handleDoseIntervalRequiredException(DoseIntervalRequiredException ex, HttpServletRequest request){
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ExceptionResponseDTO.fromException(ex.getMessage(), HttpStatus.BAD_REQUEST, request.getRequestURI()));
    }

    @ExceptionHandler(InvalidRestockAmountException.class)
    public ResponseEntity<ExceptionResponseDTO> handleInvalidRestockAmountException(InvalidRestockAmountException ex, HttpServletRequest request){
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ExceptionResponseDTO.fromException(ex.getMessage(), HttpStatus.BAD_REQUEST, request.getRequestURI()));
    }


}
