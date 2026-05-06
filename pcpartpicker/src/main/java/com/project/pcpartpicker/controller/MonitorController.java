package com.project.pcpartpicker.controller;

import com.project.pcpartpicker.dto.MonitorPageResponseDTO;
import com.project.pcpartpicker.service.MonitorService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/monitors")
public class MonitorController {

    //Field to get injected
    private final MonitorService monitorService;

    //Args constructor for dependency injection
    public MonitorController(MonitorService monitorService) {
        this.monitorService = monitorService;
    }

    @GetMapping
    public ResponseEntity<MonitorPageResponseDTO> listMonitors(@RequestParam(defaultValue = "0") int currentPage){
        return ResponseEntity.ok(monitorService.listMonitors(currentPage));
    }

    //TODO build endpoint for sale of monitor
}
