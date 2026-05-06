package com.project.pcpartpicker.dto;

import java.util.List;

public class MonitorPageResponseDTO {
    private List<MonitorResponseDTO> listOfMonitors;
    private int totalPages;
    private int currentPage;

    //Default constructor
    public MonitorPageResponseDTO() {
    }

    //All args constructor
    public MonitorPageResponseDTO(List<MonitorResponseDTO> listOfMonitors, int totalPages, int currentPage) {
        this.listOfMonitors = listOfMonitors;
        this.totalPages = totalPages;
        this.currentPage = currentPage;
    }

    //Getters
    public List<MonitorResponseDTO> getListOfMonitors() {
        return listOfMonitors;
    }

    public int getTotalPages() {
        return totalPages;
    }

    public int getCurrentPage() {
        return currentPage;
    }
}
