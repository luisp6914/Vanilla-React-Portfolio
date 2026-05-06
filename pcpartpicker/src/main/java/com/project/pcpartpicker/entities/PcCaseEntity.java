package com.project.pcpartpicker.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "pc_case")
public class PcCaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "brand")
    private String brand;

    @Column(name = "model")
    private String model;

    @Column(name = "form_factor")
    private String formFactor;

    @Column(name = "max_gpu_length")
    private int maxGpuLength;

    @Column(name = "num_bays")
    private int numBays;

    @Column(name = "stock")
    private int stock;

    @Column(name = "price")
    private double price;

    //Default Constructor for Hibernate
    public PcCaseEntity() {}

    //Getter
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

    //Setter
    public void setBrand(String brand) {
        this.brand = brand;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public void setFormFactor(String formFactor) {
        this.formFactor = formFactor;
    }

    public void setMaxGpuLength(int maxGpuLength) {
        this.maxGpuLength = maxGpuLength;
    }

    public void setNumBays(int numBays) {
        this.numBays = numBays;
    }

    public void setStock(int stock) {
        this.stock = stock;
    }

    public void setPrice(double price) {
        this.price = price;
    }
}
