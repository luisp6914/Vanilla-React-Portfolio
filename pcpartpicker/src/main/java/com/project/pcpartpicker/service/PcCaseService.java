package com.project.pcpartpicker.service;

import com.project.pcpartpicker.dto.PcCasePageResponseDTO;
import com.project.pcpartpicker.dto.PcCaseResponseDTO;
import com.project.pcpartpicker.entities.PcCaseEntity;
import com.project.pcpartpicker.repository.PcCaseRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class PcCaseService {
    private final PcCaseRepository pcCaseRepository;

    //Constructor injection
    public PcCaseService(PcCaseRepository pcCaseRepository) {
        this.pcCaseRepository = pcCaseRepository;
    }

    @Transactional(readOnly = true)
    public PcCasePageResponseDTO listPcCases(int currentPage){
        if(currentPage < 0){
            throw new IllegalArgumentException("Current page: " + currentPage + " does not exist");
        }

        int PAGE_SIZE = 15;

        //Pagination requirements
        Pageable limitAndOffset = PageRequest.of(currentPage, PAGE_SIZE);

        //Pagination request and response
        Page<PcCaseEntity> page = pcCaseRepository.findAll(limitAndOffset);

        //Entity to DTO conversion
        List<PcCaseResponseDTO> listOfPcCases = new ArrayList<>();

        for(PcCaseEntity pcCaseEntity : page.getContent()){
            listOfPcCases.add(PcCaseResponseDTO.fromPcCaseEntity(pcCaseEntity));
        }

        return new PcCasePageResponseDTO(listOfPcCases, page.getTotalPages(), page.getNumber());
    }

    //TODO endpoint for sale of PcCase
}
