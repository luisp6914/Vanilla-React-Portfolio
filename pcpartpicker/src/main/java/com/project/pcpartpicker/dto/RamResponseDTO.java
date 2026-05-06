package com.project.pcpartpicker.dto;

import com.project.pcpartpicker.entities.RamEntity;

public class RamResponseDTO {
    private int id;
    private String brand;
    private String model;
    private int capacity;
    private int speed;
    private String ddrType;
    private int numSticks;
    private int stock;
    private double price;

    //Default constructor
    public RamResponseDTO() {
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

    public int getCapacity() {
        return capacity;
    }

    public int getSpeed() {
        return speed;
    }

    public String getDdrType() {
        return ddrType;
    }

    public int getNumSticks() {
        return numSticks;
    }

    public int getStock() {
        return stock;
    }

    public double getPrice() {
        return price;
    }

    public static RamResponseDTO fromRamEntity(RamEntity ramEntity){
        RamResponseDTO ramDTO = new RamResponseDTO();

        ramDTO.id = ramEntity.getId();
        ramDTO.brand = ramEntity.getBrand();
        ramDTO.model = ramEntity.getModel();
        ramDTO.capacity = ramEntity.getCapacity();
        ramDTO.speed = ramEntity.getSpeed();
        ramDTO.ddrType = ramEntity.getDdrType();
        ramDTO.numSticks = ramEntity.getNumSticks();
        ramDTO.stock = ramEntity.getStock();
        ramDTO.price = ramEntity.getPrice();

        return ramDTO;
    }
}
