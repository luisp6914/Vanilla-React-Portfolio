package com.portfolio.backend.dto;

import jakarta.validation.constraints.*;

public class VaccineRequestDTO {

    @NotBlank(message = "Name can not be empty")
    private String name;

    @PositiveOrZero(message = "Dose Interval must be at least 0")
    private int doseInterval;

    @Min(value = 1, message = "At least one item is required for initial stock")
    private int dosesReceived;

    @Min(value = 1, message = "Requires at least one dose")
    @Max(value = 2, message = "Can not require more than two doses")
    private int dosesRequired;


    public VaccineRequestDTO(){}

    //Getters
    public String getName() {
        return name;
    }

    public int getDoseInterval() {
        return doseInterval;
    }

    public int getDosesReceived() {
        return dosesReceived;
    }

    public int getDosesRequired() {
        return dosesRequired;
    }

    //Setters
    public void setName(String name) {
        this.name = name;
    }

    public void setDoseInterval(int doseInterval) {
        this.doseInterval = doseInterval;
    }

    public void setDosesReceived(int dosesReceived) {
        this.dosesReceived = dosesReceived;
    }

    public void setDosesRequired(int dosesRequired) {
        this.dosesRequired = dosesRequired;
    }
}
