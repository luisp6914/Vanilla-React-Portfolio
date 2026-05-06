package com.project.pcpartpicker.dto;

import com.project.pcpartpicker.entities.StorageEntity;

public class StorageResponseDTO {
    private int id;
    private String brand;
    private String model;
    private int capacity;
    private String storageType;
    private int readSpeed;
    private int writeSpeed;
    private String formFactor;
    private int stock;
    private double price;

    //Default constructor for JSON serialization
    public StorageResponseDTO() {
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

    public String getStorageType() {
        return storageType;
    }

    public int getReadSpeed() {
        return readSpeed;
    }

    public int getWriteSpeed() {
        return writeSpeed;
    }

    public String getFormFactor() {
        return formFactor;
    }

    public int getStock() {
        return stock;
    }

    public double getPrice() {
        return price;
    }

    public static StorageResponseDTO fromStorageEntity(StorageEntity storageEntity){
        StorageResponseDTO storageDTO = new StorageResponseDTO();

        storageDTO.id = storageEntity.getId();
        storageDTO.brand = storageEntity.getBrand();
        storageDTO.model = storageEntity.getModel();
        storageDTO.capacity = storageEntity.getCapacity();
        storageDTO.storageType = storageEntity.getStorageType();
        storageDTO.readSpeed = storageEntity.getReadSpeed();
        storageDTO.writeSpeed = storageEntity.getWriteSpeed();
        storageDTO.formFactor = storageEntity.getFormFactor();
        storageDTO.stock = storageEntity.getStock();
        storageDTO.price = storageEntity.getPrice();

        return storageDTO;
    }
}
