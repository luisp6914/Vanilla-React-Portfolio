package com.project.pcpartpicker.controller;

import com.project.pcpartpicker.dto.GpuPageResponseDTO;
import com.project.pcpartpicker.service.GpuService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/gpus")
public class GpuController {
    //Field
    private final GpuService gpuService;

    //Args constructor for dependency injection
    public GpuController(GpuService gpuService) {
        this.gpuService = gpuService;
    }

    @GetMapping
    public ResponseEntity<GpuPageResponseDTO> listGpus(@RequestParam(defaultValue = "0") int currentPage){
        return ResponseEntity.ok(gpuService.listGpus(currentPage));
    }

    //TODO endpoint for sale of gpu

}
