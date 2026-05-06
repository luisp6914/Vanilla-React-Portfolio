package com.project.pcpartpicker.dto;

import com.project.pcpartpicker.entities.GpuEntity;

public class GpuResponseDTO {
    //Data fields
    private int id;
    private String brand;
    private String model;
    private int vram;
    private double coreClockSpeed;
    private double boostClockSpeed;
    private int tdp;
    private int length;
    private int stock;
    private double price;

    //Default constructor
    public GpuResponseDTO() {
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

    public int getVram() {
        return vram;
    }

    public double getCoreClockSpeed() {
        return coreClockSpeed;
    }

    public double getBoostClockSpeed() {
        return boostClockSpeed;
    }

    public int getTdp() {
        return tdp;
    }

    public int getLength() {
        return length;
    }

    public int getStock() {
        return stock;
    }

    public double getPrice() {
        return price;
    }

    public static GpuResponseDTO fromGpuEntity(GpuEntity gpuEntity){
        GpuResponseDTO gpuDTO = new GpuResponseDTO();

        gpuDTO.id =  gpuEntity.getId();
        gpuDTO.brand = gpuEntity.getBrand();
        gpuDTO.model = gpuEntity.getModel();
        gpuDTO.vram = gpuEntity.getVram();
        gpuDTO.coreClockSpeed = gpuEntity.getCoreClockSpeed();
        gpuDTO.boostClockSpeed = gpuEntity.getBoostClockSpeed();
        gpuDTO.tdp = gpuEntity.getTdp();
        gpuDTO.length = gpuEntity.getLength();
        gpuDTO.stock = gpuEntity.getStock();
        gpuDTO.price = gpuEntity.getPrice();

        return gpuDTO;
    }
}
