package com.project.pcpartpicker.dto;

import java.util.List;

public class GpuPageResponseDTO {
    //Fields
    private List<GpuResponseDTO> listOfGpus;
    private int totalPages;
    private int currentPage;

    //default constructor
    public GpuPageResponseDTO(){}

    //All args constructor
    public GpuPageResponseDTO(List<GpuResponseDTO> listOfGpus, int totalPages, int currentPage) {
        this.listOfGpus = listOfGpus;
        this.totalPages = totalPages;
        this.currentPage = currentPage;
    }

    //Getters
    public List<GpuResponseDTO> getListOfGpus() {
        return listOfGpus;
    }

    public int getTotalPages() {
        return totalPages;
    }

    public int getCurrentPage() {
        return currentPage;
    }
}
