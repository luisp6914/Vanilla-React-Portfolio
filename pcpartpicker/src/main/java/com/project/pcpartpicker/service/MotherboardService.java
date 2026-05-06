package com.project.pcpartpicker.service;

import com.project.pcpartpicker.dto.MotherboardPageResponseDTO;
import com.project.pcpartpicker.dto.MotherboardResponseDTO;
import com.project.pcpartpicker.entities.MotherboardEntity;
import com.project.pcpartpicker.repository.MotherboardRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class MotherboardService {
    private final MotherboardRepository motherboardRepository;

    //All Args constructor
    public MotherboardService(MotherboardRepository motherboardRepository) {
        this.motherboardRepository = motherboardRepository;
    }

    @Transactional(readOnly = true)
    public MotherboardPageResponseDTO listMotherboards(int currentPage){
        if(currentPage < 0){
            throw new IllegalArgumentException("Current page: " + currentPage + " does not exist");
        }

        int PAGE_SIZE = 15;

        //The pagination requirements
        Pageable limitAndOffset = PageRequest.of(currentPage, PAGE_SIZE);

        //The pagination request results
        Page<MotherboardEntity> page = motherboardRepository.findAll(limitAndOffset);

        //Conversion of Entity to DTO
        List<MotherboardResponseDTO> listOfMotherboards = new ArrayList<>();

        for(MotherboardEntity motherboardEntity : page.getContent()){
            listOfMotherboards.add(MotherboardResponseDTO.fromMotherboardEntity(motherboardEntity));
        }

        return new MotherboardPageResponseDTO(listOfMotherboards, page.getTotalPages(), page.getNumber());
    }

    //TODO endpoint for sale of motherboard

}
