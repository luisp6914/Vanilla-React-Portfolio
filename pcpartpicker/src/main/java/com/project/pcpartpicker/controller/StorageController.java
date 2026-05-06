package com.project.pcpartpicker.controller;

import com.project.pcpartpicker.dto.StoragePageResponseDTO;
import com.project.pcpartpicker.service.StorageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/storages")
public class StorageController {
    //Fields to get inject
    private final StorageService storageService;

    //Args constructor for dependecny injection
    public StorageController(StorageService storageService) {
        this.storageService = storageService;
    }

    @GetMapping
    public ResponseEntity<StoragePageResponseDTO> listStorages(@RequestParam(defaultValue = "0") int currentPage){
        return ResponseEntity.ok(storageService.listStorages(currentPage));
    }

    //TODO endpoint for sale of storage
}
