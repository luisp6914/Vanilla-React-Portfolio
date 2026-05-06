package com.project.pcpartpicker.service;

import com.project.pcpartpicker.dto.PsuPageResponseDTO;
import com.project.pcpartpicker.dto.PsuResponseDTO;
import com.project.pcpartpicker.entities.PsuEntity;
import com.project.pcpartpicker.repository.PsuRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class PsuService {
    private final PsuRepository psuRepository;

    //Constructor injection
    public PsuService(PsuRepository psuRepository) {
        this.psuRepository = psuRepository;
    }

    @Transactional(readOnly = true)
    public PsuPageResponseDTO listPsus(int currentPage){
        if(currentPage < 0){
            throw new IllegalArgumentException("Current page: " + currentPage + " does not exist");
        }

        int PAGE_SIZE = 15;

        //Pagination requirements
        Pageable limitAndOffset = PageRequest.of(currentPage, PAGE_SIZE);

        //Pagination request and results
        Page<PsuEntity> page = psuRepository.findAll(limitAndOffset);

        //Entity to DTO conversion
        List<PsuResponseDTO> listOfPsus = new ArrayList<>();

        for(PsuEntity psuEntity : page.getContent()){
            listOfPsus.add(PsuResponseDTO.fromPsuEntity(psuEntity));
        }

        return new PsuPageResponseDTO(listOfPsus, page.getTotalPages(), page.getNumber());
    }

    //TODO endpoint for sale of PSU


}
