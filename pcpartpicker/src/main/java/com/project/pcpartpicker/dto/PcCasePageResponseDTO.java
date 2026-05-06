package com.project.pcpartpicker.dto;

import java.util.List;

public class PcCasePageResponseDTO {
    private List<PcCaseResponseDTO> listOfPcCases;
    private int totalPages;
    private int currentPage;

    //Default constructor
    public PcCasePageResponseDTO() {
    }

    //All args constructor
    public PcCasePageResponseDTO(List<PcCaseResponseDTO> listOfPcCases, int totalPages, int currentPage) {
        this.listOfPcCases = listOfPcCases;
        this.totalPages = totalPages;
        this.currentPage = currentPage;
    }

    //Getters
    public List<PcCaseResponseDTO> getListOfPcCases() {
        return listOfPcCases;
    }

    public int getTotalPages() {
        return totalPages;
    }

    public int getCurrentPage() {
        return currentPage;
    }
}
