package com.portfolio.backend.dto;

import java.util.List;

public class PatientPageResponseDTO {
    //Data fields
    private List<PatientResponseDTO> patients;
    private int totalPages;
    private int currentPage;

    //Default Constructor
    public PatientPageResponseDTO(){}

    //Args Constructor
    public PatientPageResponseDTO(List<PatientResponseDTO> patients, int totalPages, int currentPage){
        this.patients = patients;
        this.totalPages = totalPages;
        this.currentPage = currentPage;
    }

    //Getters
    public List<PatientResponseDTO> getPatientList() {
        return patients;
    }

    public int getGetTotalPages() {
        return totalPages;
    }

    public int getCurrentPage() {
        return currentPage;
    }
}
