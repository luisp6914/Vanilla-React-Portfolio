package com.project.pcpartpicker.dto;

import com.project.pcpartpicker.entities.CpuEntity;

public class CpuResponseDTO {
    //Fields
    private int id;
    private String brand;
    private String model;
    private int cores;
    private int threads;
    private double baseClockSpeed;
    private double boostClockSpeed;
    private int tdp;
    private String socketType;
    private int stock;
    private double price;

    //Constructors
    public CpuResponseDTO() {}

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

    public int getCores() {
        return cores;
    }

    public int getThreads() {
        return threads;
    }

    public double getBaseClockSpeed() {
        return baseClockSpeed;
    }

    public double getBoostClockSpeed() {
        return boostClockSpeed;
    }

    public int getTdp() {
        return tdp;
    }

    public String getSocketType() {
        return socketType;
    }

    public int getStock() {
        return stock;
    }

    public double getPrice() {
        return price;
    }

    /**
     * This is a static method to make creating a DTO cleaner
     * @param cpuEntity the cpu data we will be transferring
     * @return dto of the entity
     */
    public static CpuResponseDTO fromCpuEntity(CpuEntity cpuEntity) {
        CpuResponseDTO cpuResponseDTO = new CpuResponseDTO();
        cpuResponseDTO.id = cpuEntity.getId();
        cpuResponseDTO.brand = cpuEntity.getBrand();
        cpuResponseDTO.model = cpuEntity.getModel();
        cpuResponseDTO.cores = cpuEntity.getCores();
        cpuResponseDTO.threads = cpuEntity.getThreads();
        cpuResponseDTO.baseClockSpeed = cpuEntity.getBaseClockSpeed();
        cpuResponseDTO.boostClockSpeed = cpuEntity.getBoostClockSpeed();
        cpuResponseDTO.stock = cpuEntity.getStock();
        cpuResponseDTO.price = cpuEntity.getPrice();
        return cpuResponseDTO;
    }

}
