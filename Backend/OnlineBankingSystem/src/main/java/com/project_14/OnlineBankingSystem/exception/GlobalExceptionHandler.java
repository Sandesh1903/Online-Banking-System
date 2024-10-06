package com.project_14.OnlineBankingSystem.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Unauthorized.class)
    public ResponseEntity<Object> handleException(Unauthorized e) {
        System.out.println(e.getMessage());
        System.out.println("tfghjkl");
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Login denied!");
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Object> handleGenericException(Exception e) {
        System.out.println(e.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred: " + e.getMessage());
    }
}
