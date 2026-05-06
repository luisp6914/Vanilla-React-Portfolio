package com.project.pcpartpicker.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "motherboard")
public class MotherboardEntity {
    //Fields
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "brand")
    private String brand;

    @Column(name = "model")
    private String model;

    @Column(name = "socket_type")
    private String socketType;

    @Column(name = "form_factor")
    private String formFactor;

    @Column(name = "ram_slots")
    private int ramSlots;

    @Column(name = "max_ram")
    private int maxRam;

    @Column(name = "chipset")
    private String chipset;

    @Column(name = "stock")
    private int stock;

    @Column(name = "price")
    private double price;

    //Default constructor for hibernate
    public MotherboardEntity() {}

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

    //Setters

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public void setSocketType(String socketType) {
        this.socketType = socketType;
    }

    public void setFormFactor(String formFactor) {
        this.formFactor = formFactor;
    }

    public void setRamSlots(int ramSlots) {
        this.ramSlots = ramSlots;
    }

    public void setMaxRam(int maxRam) {
        this.maxRam = maxRam;
    }

    public void setChipset(String chipset) {
        this.chipset = chipset;
    }

    public void setStock(int stock) {
        this.stock = stock;
    }

    public void setPrice(double price) {
        this.price = price;
    }
}
