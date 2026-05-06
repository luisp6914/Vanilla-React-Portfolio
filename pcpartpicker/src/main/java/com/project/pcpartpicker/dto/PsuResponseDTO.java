package com.project.pcpartpicker.dto;

import com.project.pcpartpicker.entities.PsuEntity;

public class PsuResponseDTO {
    private int id;
    private String brand;
    private String model;
    private int wattage;
    private String efficiencyRating;
    private boolean modular;
    private int stock;
    private double price;

    //Default constructor for json serialization
    public PsuResponseDTO() {
    }

    //Getters
    public int getId() {
        return id;
    }

    public String getBrand() {
        return brand;
    }

    public String getModel() {
        return model;
    }

    public int getWattage() {
        return wattage;
    }

    public String getEfficiencyRating() {
        return efficiencyRating;
    }

    public boolean isModular() {
        return modular;
    }

    public int getStock() {
        return stock;
    }

    public double getPrice() {
        return price;
    }

    public static PsuResponseDTO fromPsuEntity(PsuEntity psuEntity){
        PsuResponseDTO psuDTO = new PsuResponseDTO();

        psuDTO.id = psuEntity.getId();
        psuDTO.brand = psuEntity.getBrand();
        psuDTO.model = psuEntity.getModel();
        psuDTO.wattage = psuEntity.getWattage();
        psuDTO.efficiencyRating = psuEntity.getEfficiencyRating();
        psuDTO.modular = psuEntity.isModular();
        psuDTO.stock = psuEntity.getStock();
        psuDTO.price = psuEntity.getPrice();

        return psuDTO;
    }
}
