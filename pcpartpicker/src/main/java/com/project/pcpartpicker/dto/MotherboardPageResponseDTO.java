package com.project.pcpartpicker.dto;

import java.util.List;

public class MotherboardPageResponseDTO {
    private List<MotherboardResponseDTO> listOfMotherboards;
    private int totalPages;
    private int currentPage;

    //Default Constructor
    public MotherboardPageResponseDTO() {
    }

    //All args
    public MotherboardPageResponseDTO(List<MotherboardResponseDTO> listOfMotherboards, int totalPages, int currentPage) {
        this.listOfMotherboards = listOfMotherboards;
        this.totalPages = totalPages;
        this.currentPage = currentPage;
    }

    //Getters
    public List<MotherboardResponseDTO> getListOfMotherboards() {
        return listOfMotherboards;
    }

    public int getTotalPages() {
        return totalPages;
    }

    public int getCurrentPage() {
        return currentPage;
    }
}
