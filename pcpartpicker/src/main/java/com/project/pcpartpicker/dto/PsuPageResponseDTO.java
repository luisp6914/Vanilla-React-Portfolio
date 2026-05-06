package com.project.pcpartpicker.dto;

import java.util.List;

public class PsuPageResponseDTO {
    private List<PsuResponseDTO> listOfPsus;
    private int totalPages;
    private int currentPage;

    //Default constructor
    public PsuPageResponseDTO() {
    }

    //All args constructor
    public PsuPageResponseDTO(List<PsuResponseDTO> listOfPsus, int totalPages, int currentPage) {
        this.listOfPsus = listOfPsus;
        this.totalPages = totalPages;
        this.currentPage = currentPage;
    }

    public List<PsuResponseDTO> getListOfPsus() {
        return listOfPsus;
    }

    public int getTotalPages() {
        return totalPages;
    }

    public int getCurrentPage() {
        return currentPage;
    }
}
