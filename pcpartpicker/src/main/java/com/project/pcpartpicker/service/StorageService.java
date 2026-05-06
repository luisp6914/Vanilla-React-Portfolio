package com.project.pcpartpicker.service;

import com.project.pcpartpicker.dto.StoragePageResponseDTO;
import com.project.pcpartpicker.dto.StorageResponseDTO;
import com.project.pcpartpicker.entities.StorageEntity;
import com.project.pcpartpicker.repository.StorageRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class StorageService {
    private final StorageRepository storageRepository;

    //Constructor injection
    public StorageService(StorageRepository storageRepository) {
        this.storageRepository = storageRepository;
    }

    @Transactional(readOnly = true)
    public StoragePageResponseDTO listStorages(int currentPage){
        if(currentPage < 0){
            throw new IllegalArgumentException("Current page: " + currentPage + " does not exist");
        }

        int PAGE_SIZE = 15;

        //Pagination requirements
        Pageable limitAndOffset = PageRequest.of(currentPage, PAGE_SIZE);

        //Paginated request results
        Page<StorageEntity> page = storageRepository.findAll(limitAndOffset);

        //Conversion of Entity to DTO
        List<StorageResponseDTO> listOfStorages = new ArrayList<>();

        for(StorageEntity storageEntity : page.getContent()){
            listOfStorages.add(StorageResponseDTO.fromStorageEntity(storageEntity));
        }

        return new StoragePageResponseDTO(listOfStorages, page.getTotalPages(), page.getNumber());
    }

    //TODO endpoint for the sale of storage

}
