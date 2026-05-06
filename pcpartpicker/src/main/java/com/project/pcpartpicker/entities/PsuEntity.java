package com.project.pcpartpicker.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "psu")
public class PsuEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "brand")
    private String brand;

    @Column(name = "model")
    private String model;

    @Column(name = "wattage")
    private int wattage;

    @Column(name = "efficiency_rating")
    private String efficiencyRating;

    @Column(name = "modular")
    private boolean modular;

    @Column(name = "stock")
    private int stock;

    @Column(name = "price")
    private double price;

    //Default Constructor for Hibernate
    public PsuEntity() {}

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

    //Setter
    public void setBrand(String brand) {
        this.brand = brand;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public void setWattage(int wattage) {
        this.wattage = wattage;
    }

    public void setEfficiencyRating(String efficiencyRating) {
        this.efficiencyRating = efficiencyRating;
    }

    public void setModular(boolean modular) {
        this.modular = modular;
    }

    public void setStock(int stock) {
        this.stock = stock;
    }

    public void setPrice(double price) {
        this.price = price;
    }
}
