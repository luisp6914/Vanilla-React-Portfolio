package com.project.pcpartpicker.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "storage")
public class StorageEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "brand")
    private String brand;

    @Column(name = "model")
    private String model;

    @Column(name = "capacity")
    private int capacity;

    @Column(name = "storage_type")
    private String storageType;

    @Column(name = "read_speed")
    private int readSpeed;

    @Column(name = "write_speed")
    private int writeSpeed;

    @Column(name = "form_factor")
    private String formFactor;

    @Column(name = "stock")
    private int stock;

    @Column(name = "price")
    private double price;

    //Default Constructor for Hibernate
    public StorageEntity() {}

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

    //Setters
    public void setBrand(String brand) {
        this.brand = brand;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }

    public void setStorageType(String storageType) {
        this.storageType = storageType;
    }

    public void setReadSpeed(int readSpeed) {
        this.readSpeed = readSpeed;
    }

    public void setWriteSpeed(int writeSpeed) {
        this.writeSpeed = writeSpeed;
    }

    public void setFormFactor(String formFactor) {
        this.formFactor = formFactor;
    }

    public void setStock(int stock) {
        this.stock = stock;
    }

    public void setPrice(double price) {
        this.price = price;
    }
}
