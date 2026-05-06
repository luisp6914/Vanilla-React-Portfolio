package com.project.pcpartpicker.controller;

import com.project.pcpartpicker.dto.PcCasePageResponseDTO;
import com.project.pcpartpicker.service.PcCaseService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/pc-cases")
public class PcCaseController {
    //Fields to get injected
    private final PcCaseService pcCaseService;

    //Args constructor for dependency injection
    public PcCaseController(PcCaseService pcCaseService) {
        this.pcCaseService = pcCaseService;
    }

    @GetMapping
    public ResponseEntity<PcCasePageResponseDTO> listPcCases(@RequestParam(defaultValue = "0") int currentPage){
        return ResponseEntity.ok(pcCaseService.listPcCases(currentPage));
    }

    //TODO endpoint for sale of pc case
}
