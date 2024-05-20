package ru.vsu.cs.maslova_e_i.controller;

import org.hibernate.ObjectNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class ControllerExceptionHandler {
    @ExceptionHandler
    public ResponseEntity<Map<String, Object>> handleObjectNotFoundException(ObjectNotFoundException e) {
        Map<String, Object> error = new HashMap<>();
        error.put("entity", e.getEntityName());
        error.put("identifier", e.getIdentifier());
        error.put("message", e.getEntityName() + " with " + e.getIdentifier() + " not found");
        error.put("timestamp", LocalDateTime.now());
        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }

}
