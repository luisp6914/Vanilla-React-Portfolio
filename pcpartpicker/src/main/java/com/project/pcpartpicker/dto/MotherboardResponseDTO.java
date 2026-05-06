package com.project.pcpartpicker.dto;

import com.project.pcpartpicker.entities.MotherboardEntity;

public class MotherboardResponseDTO {
    private int id;
    private String brand;
    private String model;
    private String socketType;
    private String formFactor;
    private int ramSlots;
    private int maxRam;
    private String chipset;
    private int stock;
    private double price;

    //default constructor
    public MotherboardResponseDTO() {
    }

    //getters
    public int getId() {
        return id;
    }

    public String getBrand() {
        return brand;
    }

    public String getModel() {
        return model;
    }

    public String getSocketType() {
        return socketType;
    }

    public String getFormFactor() {
        return formFactor;
    }

    public int getRamSlots() {
        return ramSlots;
    }

    public int getMaxRam() {
        return maxRam;
    }

    public String getChipset() {
        return chipset;
    }

    public int getStock() {
        return stock;
    }

    public double getPrice() {
        return price;
    }

    public static MotherboardResponseDTO fromMotherboardEntity(MotherboardEntity motherboardEntity){
        MotherboardResponseDTO motherboardDTO = new MotherboardResponseDTO();

        motherboardDTO.id = motherboardEntity.getId();
        motherboardDTO.brand = motherboardEntity.getBrand();
        motherboardDTO.model = motherboardEntity.getModel();
        motherboardDTO.socketType = motherboardEntity.getSocketType();
        motherboardDTO.formFactor = motherboardEntity.getFormFactor();
        motherboardDTO.ramSlots = motherboardEntity.getRamSlots();
        motherboardDTO.maxRam = motherboardEntity.getMaxRam();
        motherboardDTO.chipset = motherboardEntity.getChipset();
        motherboardDTO.stock = motherboardEntity.getStock();
        motherboardDTO.price = motherboardEntity.getPrice();

        return motherboardDTO;
    }
}
