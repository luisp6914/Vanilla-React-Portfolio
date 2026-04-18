package com.portfolio.backend.dto;

import com.portfolio.backend.entities.VaccineEntity;

public class VaccineResponseDTO {
    private int id;
    private String vaccineName;
    private int dosesRequired;
    private int doseInterval;
    private int totalDosesReceived;
    private int quantityRemaining;

    public VaccineResponseDTO(){
    }

    public static VaccineResponseDTO fromEntity(VaccineEntity vaccine){
        VaccineResponseDTO dto = new VaccineResponseDTO();

        dto.id = vaccine.getId();
        dto.vaccineName = vaccine.getVaccineName();
        dto.dosesRequired = vaccine.getDosesRequired();
        dto.doseInterval = vaccine.getDoseInterval();
        dto.totalDosesReceived = vaccine.getTotalDosesReceived();
        dto.quantityRemaining = vaccine.getQuantityRemaining();

        return dto;
    }

    //Getters
    public String getVaccineName() {
        return vaccineName;
    }

    public int getDosesRequired() {
        return dosesRequired;
    }

    public int getDoseInterval() {
        return doseInterval;
    }

    public int getTotalDosesReceived() {
        return totalDosesReceived;
    }

    public int getQuantityRemaining() {
        return quantityRemaining;
    }
}
