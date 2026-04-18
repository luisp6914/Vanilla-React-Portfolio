package com.portfolio.backend.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "vaccines")
public class VaccineEntity {
    //Data fields
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "vaccine_name")
    private String vaccineName;

    @Column(name = "doses_required")
    private int dosesRequired;

    @Column(name = "dose_interval")
    private int doseInterval;

    @Column(name = "total_doses_received")
    private int totalDosesReceived;

    @Column(name = "quantity_remaining")
    private int quantityRemaining;

    @Column(name = "table_version")
    @Version
    private int tableVersion;


    //Default constructor for Hibernate
    public VaccineEntity(){}

    //All args constructor for creating a new vaccine
    public VaccineEntity(String vaccineName, int dosesRequired, int doseInterval, int totalDosesReceived, int quantityRemaining) {
        this.vaccineName = vaccineName;
        this.dosesRequired = dosesRequired;
        this.doseInterval = doseInterval;
        this.totalDosesReceived = totalDosesReceived;
        this.quantityRemaining = quantityRemaining;
    }

    //Getters
    public int getId() {
        return id;
    }

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

    public int getTableVersion(){ return tableVersion;}

    //Setters
    public void setVaccineName(String vaccineName) {
        this.vaccineName = vaccineName;
    }

    public void setDosesRequired(int dosesRequired) {
        this.dosesRequired = dosesRequired;
    }

    public void setDoseInterval(int doseInterval) {
        this.doseInterval = doseInterval;
    }

    public void setTotalDosesReceived(int totalDosesReceived) {
        this.totalDosesReceived = totalDosesReceived;
    }

    public void setQuantityRemaining(int quantityRemaining) {
        this.quantityRemaining = quantityRemaining;
    }
}
