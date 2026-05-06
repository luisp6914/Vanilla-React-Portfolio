package com.project.pcpartpicker.dto;

import java.util.List;

public class CpuPageResponseDTO {
    private List<CpuResponseDTO> listOfCpus;
    private int totalPages;
    private int currentPage;

    public CpuPageResponseDTO(){}

    public CpuPageResponseDTO(List<CpuResponseDTO> listOfCpus, int totalPages, int currentPage) {
        this.listOfCpus = listOfCpus;
        this.totalPages = totalPages;
        this.currentPage = currentPage;
    }

    //Getters
    public List<CpuResponseDTO> getListOfCpus() {
        return listOfCpus;
    }

    public int getTotalPages() {
        return totalPages;
    }

    public int getCurrentPage() {
        return currentPage;
    }
}
