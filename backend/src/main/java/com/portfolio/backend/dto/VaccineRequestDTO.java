package com.portfolio.backend.dto;

import jakarta.validation.constraints.*;

public class VaccineRequestDTO {

    @NotBlank(message = "Name can not be empty")
    private String name;

    @PositiveOrZero(message = "Dose Interval must be at least 0")
    @NotNull(message = "Dose interval field can not be empty")
    private Integer doseInterval;

    @Min(value = 1, message = "At least one item is required for initial stock")
    private int dosesReceived;

    @NotNull(message = "Doses required is required")
    @Min(value = 1, message = "Requires at least one dose")
    @Max(value = 2, message = "Can not require more than two doses")
    private Integer dosesRequired;


    public VaccineRequestDTO(){}

    //Getters
    public String getName() {
        return name;
    }

    public Integer getDoseInterval() {
        return doseInterval;
    }

    public int getDosesReceived() {
        return dosesReceived;
    }

    public Integer getDosesRequired() {
        return dosesRequired;
    }

    //Setters
    public void setName(String name) {
        this.name = name;
    }

    public void setDoseInterval(Integer doseInterval) {
        this.doseInterval = doseInterval;
    }

    public void setDosesReceived(int dosesReceived) {
        this.dosesReceived = dosesReceived;
    }

    public void setDosesRequired(Integer dosesRequired) {
        this.dosesRequired = dosesRequired;
    }
}
