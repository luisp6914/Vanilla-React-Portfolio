package com.portfolio.backend.dto;

import java.util.List;

public class VaccinePageResponseDTO {
    private List<VaccineResponseDTO> vaccines;
    private int totalPages;
    private int currentPage;

    public VaccinePageResponseDTO(){
    }

    public VaccinePageResponseDTO(List<VaccineResponseDTO> vaccines, int totalPages, int currentPage){
        this.vaccines = vaccines;
        this.totalPages = totalPages;
        this.currentPage = currentPage;
    }

    public List<VaccineResponseDTO> getVaccines() {
        return vaccines;
    }

    public int getCurrentPage() {
        return currentPage;
    }

    public int getTotalPages() {
        return totalPages;
    }
}
