package com.project.pcpartpicker.dto;

import com.project.pcpartpicker.entities.PcCaseEntity;

public class PcCaseResponseDTO {
    private int id;
    private String brand;
    private String model;
    private String formFactor;
    private int maxGpuLength;
    private int numBays;
    private int stock;
    private double price;

    //Default constructor for JSON serialization
    public PcCaseResponseDTO() {
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

    public String getFormFactor() {
        return formFactor;
    }

    public int getMaxGpuLength() {
        return maxGpuLength;
    }

    public int getNumBays() {
        return numBays;
    }

    public int getStock() {
        return stock;
    }

    public double getPrice() {
        return price;
    }

    public static PcCaseResponseDTO fromPcCaseEntity(PcCaseEntity pcCaseEntity){
        PcCaseResponseDTO pcCaseDTO = new PcCaseResponseDTO();

        pcCaseDTO.id = pcCaseEntity.getId();
        pcCaseDTO.brand = pcCaseEntity.getBrand();
        pcCaseDTO.model = pcCaseEntity.getModel();
        pcCaseDTO.formFactor = pcCaseEntity.getFormFactor();
        pcCaseDTO.maxGpuLength = pcCaseEntity.getMaxGpuLength();
        pcCaseDTO.numBays = pcCaseEntity.getNumBays();
        pcCaseDTO.stock = pcCaseEntity.getStock();
        pcCaseDTO.price = pcCaseEntity.getPrice();

        return pcCaseDTO;
    }
}
