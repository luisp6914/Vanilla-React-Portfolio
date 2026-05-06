package com.project.pcpartpicker.service;

import com.project.pcpartpicker.dto.CpuPageResponseDTO;
import com.project.pcpartpicker.dto.CpuResponseDTO;
import com.project.pcpartpicker.entities.CpuEntity;
import com.project.pcpartpicker.repository.CpuRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class CpuService {
    private final CpuRepository cpuRepository;

    public CpuService(CpuRepository cpuRepository) {
        this.cpuRepository = cpuRepository;
    }

    //Service to get a page of cpu
    @Transactional(readOnly = true)
    public CpuPageResponseDTO listCpus(int currentPage){
        if(currentPage < 0){
            throw new IllegalArgumentException("Current page: " + currentPage + " does not exist");
        }

        int PAGE_SIZE = 15;

        //Pageable is the interface and PageRequest is the class that implements the use of pagination for the current page and the size of it.
        Pageable limitAndOffset = PageRequest.of(currentPage, PAGE_SIZE);

        //The repository makes a call to the db with the pagination requirements, then returns the page/list of entities/cpus
        Page<CpuEntity> page = this.cpuRepository.findAll(limitAndOffset);

        //Building the list of CPU DTOs from the page we received with the repository call
        List<CpuResponseDTO> listOfCpus = new ArrayList<>();
        for(CpuEntity cpuEntity : page.getContent()){
            listOfCpus.add(CpuResponseDTO.fromCpuEntity(cpuEntity));
        }

        return new CpuPageResponseDTO(listOfCpus, page.getTotalPages(), page.getNumber());
    }

    //TODO make an endpoint for the sale of CPU


}
