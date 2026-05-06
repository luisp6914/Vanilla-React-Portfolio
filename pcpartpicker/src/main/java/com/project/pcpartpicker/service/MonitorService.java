package com.project.pcpartpicker.service;

import com.project.pcpartpicker.dto.MonitorPageResponseDTO;
import com.project.pcpartpicker.dto.MonitorResponseDTO;
import com.project.pcpartpicker.entities.MonitorEntity;
import com.project.pcpartpicker.repository.MonitorRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class MonitorService {
    private final MonitorRepository monitorRepository;

    //Constructor injection
    public MonitorService(MonitorRepository monitorRepository) {
        this.monitorRepository = monitorRepository;
    }

    @Transactional(readOnly = true)
    public MonitorPageResponseDTO listMonitors(int currentPage){
        if(currentPage < 0){
            throw new IllegalArgumentException("Current page: " + currentPage + " does not exist");
        }

        int PAGE_SIZE = 15;

        //Pagination conditions
        Pageable limitAndOffset = PageRequest.of(currentPage, PAGE_SIZE);

        //Pagination request and response;
        Page<MonitorEntity> page = monitorRepository.findAll(limitAndOffset);

        //Entity to DTO conversion
        List<MonitorResponseDTO> listOfMonitors = new ArrayList<>();

        for(MonitorEntity monitorEntity : page.getContent()){
            listOfMonitors.add(MonitorResponseDTO.fromMonitorEntity(monitorEntity));
        }

        return new MonitorPageResponseDTO(listOfMonitors, page.getTotalPages(), page.getNumber());
    }

    //TODO endpoint for sale of monitor

}

