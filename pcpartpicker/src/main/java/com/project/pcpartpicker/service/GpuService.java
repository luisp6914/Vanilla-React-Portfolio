package com.project.pcpartpicker.service;

import com.project.pcpartpicker.dto.GpuPageResponseDTO;
import com.project.pcpartpicker.dto.GpuResponseDTO;
import com.project.pcpartpicker.entities.GpuEntity;
import com.project.pcpartpicker.repository.GpuRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class GpuService {
    private final GpuRepository gpuRepository;

    //Args constructor
    public GpuService(GpuRepository gpuRepository) {
        this.gpuRepository = gpuRepository;
    }

    @Transactional(readOnly = true)
    public GpuPageResponseDTO listGpus(int currentPage){
        if(currentPage < 0){
            throw new IllegalArgumentException("Current page: " + currentPage + " does not exist");
        }
        int PAGE_SIZE = 15;

        //Pageable is the interface and PageRequest is the pagination requested (CurrentPage/PageSize)
        Pageable limitAndOffset = PageRequest.of(currentPage, PAGE_SIZE);

        //Page gets a list of gpuEntities from the paginated request to the DB through the repository
        Page<GpuEntity> page = gpuRepository.findAll(limitAndOffset);

        //The list of converted gpu entities to response DTOs
        List<GpuResponseDTO> listOfGpu = new ArrayList<>();

        for(GpuEntity gpuEntity : page.getContent()){
            listOfGpu.add(GpuResponseDTO.fromGpuEntity(gpuEntity));
        }

        return new GpuPageResponseDTO(listOfGpu, page.getTotalPages(), page.getNumber());
    }

    //TODO endpoint for the sale of item

}
