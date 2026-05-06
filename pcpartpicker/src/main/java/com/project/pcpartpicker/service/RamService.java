package com.project.pcpartpicker.service;

import com.project.pcpartpicker.dto.RamPageResponseDTO;
import com.project.pcpartpicker.dto.RamResponseDTO;
import com.project.pcpartpicker.entities.RamEntity;
import com.project.pcpartpicker.repository.RamRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class RamService {
    private final RamRepository ramRepository;

    //All args constructor
    public RamService(RamRepository ramRepository) {
        this.ramRepository = ramRepository;
    }

    @Transactional(readOnly = true)
    public RamPageResponseDTO listRams(int currentPage){
        if(currentPage < 0){
            throw new IllegalArgumentException("Current page: " + currentPage + " does not exist");
        }

        int PAGE_SIZE = 15;

        //Pagination Request
        Pageable limitAndOffset = PageRequest.of(currentPage, PAGE_SIZE);

        //Response to the pagination request
        Page<RamEntity> page = ramRepository.findAll(limitAndOffset);

        //Entity to DTO conversion
        List<RamResponseDTO> listOfRams = new ArrayList<>();

        for(RamEntity ramEntity : page.getContent()){
            listOfRams.add(RamResponseDTO.fromRamEntity(ramEntity));
        }

        return new RamPageResponseDTO(listOfRams, page.getTotalPages(), page.getNumber());
    }

    //TODO endpoint for sale of Ram
}
