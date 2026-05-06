package com.project.pcpartpicker.controller;

import com.project.pcpartpicker.dto.PsuPageResponseDTO;
import com.project.pcpartpicker.service.PsuService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/psus")
public class PsuController {
    //Fields to get injected
    private final PsuService psuService;

    //Args constructor for dependency injection
    public PsuController(PsuService psuService) {
        this.psuService = psuService;
    }

    @GetMapping
    public ResponseEntity<PsuPageResponseDTO> listPsus(@RequestParam(defaultValue = "0") int currentPage){
        return ResponseEntity.ok(psuService.listPsus(currentPage));
    }

    //TODO endpoint for sale of psu
}
