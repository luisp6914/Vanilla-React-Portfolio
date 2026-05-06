package com.project.pcpartpicker.controller;

import com.project.pcpartpicker.dto.CpuPageResponseDTO;
import com.project.pcpartpicker.dto.CpuResponseDTO;
import com.project.pcpartpicker.service.CpuService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/cpus")
public class CpuController {
    //fields
    private final CpuService cpuService;

    //Args constructor for dependency injection
    public CpuController(CpuService cpuService) {
        this.cpuService = cpuService;
    }

    @GetMapping
    public ResponseEntity<CpuPageResponseDTO> listCpus(@RequestParam(defaultValue = "0") int currentPage){
        return ResponseEntity.ok(cpuService.listCpus(currentPage));
    }

    //TODO Endpoint for the sale of cpu
}
