package com.project.pcpartpicker.controller;

import com.project.pcpartpicker.dto.MotherboardPageResponseDTO;
import com.project.pcpartpicker.service.MotherboardService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/motherboards")
public class MotherboardController {
    //Fields to get inject
    private final MotherboardService motherboardService;

    //Args constructor for dependency injection
    public MotherboardController(MotherboardService motherboardService) {
        this.motherboardService = motherboardService;
    }

    @GetMapping
    public ResponseEntity<MotherboardPageResponseDTO> listMotherboards(@RequestParam(defaultValue = "0") int currentPage){
        return ResponseEntity.ok(motherboardService.listMotherboards(currentPage));
    }

    //TODO endpoint for sale of motherboard
}
