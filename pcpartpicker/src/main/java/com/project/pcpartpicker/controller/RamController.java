package com.project.pcpartpicker.controller;

import com.project.pcpartpicker.dto.RamPageResponseDTO;
import com.project.pcpartpicker.service.RamService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/rams")
public class RamController {
    //Fields to get inject
    private final RamService ramService;

    //Args constructor for dependency injection
    public RamController(RamService ramService) {
        this.ramService = ramService;
    }

    @GetMapping
    public ResponseEntity<RamPageResponseDTO> listRams(@RequestParam(defaultValue = "0") int currentPage){
        return ResponseEntity.ok(ramService.listRams(currentPage));
    }

    //TODO endpoint for sale of rams
}
