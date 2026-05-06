package com.project.pcpartpicker.dto;

import java.util.List;

public class RamPageResponseDTO {
    private List<RamResponseDTO> listOfRams;
    private int totalPages;
    private int currentPage;

    //Default Constructor for JSON serialization
    public RamPageResponseDTO() {
    }

    //All args constructor for response DTO
    public RamPageResponseDTO(List<RamResponseDTO> listOfRams, int totalPages, int currentPage) {
        this.listOfRams = listOfRams;
        this.totalPages = totalPages;
        this.currentPage = currentPage;
    }

    //Getters
    public List<RamResponseDTO> getListOfRams() {
        return listOfRams;
    }

    public int getTotalPages() {
        return totalPages;
    }

    public int getCurrentPage() {
        return currentPage;
    }

}
