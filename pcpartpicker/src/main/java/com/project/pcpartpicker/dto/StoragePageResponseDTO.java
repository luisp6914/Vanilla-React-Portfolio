package com.project.pcpartpicker.dto;

import java.util.List;

public class StoragePageResponseDTO {
    private List<StorageResponseDTO> listOfStorages;
    private int totalPages;
    private int currentPage;

    //default constructor for json serialization
    public StoragePageResponseDTO() {
    }

    //All args constructor
    public StoragePageResponseDTO(List<StorageResponseDTO> listOfStorages, int totalPages, int currentPage) {
        this.listOfStorages = listOfStorages;
        this.totalPages = totalPages;
        this.currentPage = currentPage;
    }

    //getters
    public int getTotalPages() {
        return totalPages;
    }

    public List<StorageResponseDTO> getListOfStorages() {
        return listOfStorages;
    }

    public int getCurrentPage() {
        return currentPage;
    }
}
