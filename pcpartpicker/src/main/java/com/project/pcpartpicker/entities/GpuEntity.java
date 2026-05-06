package com.project.pcpartpicker.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "gpu")
public class GpuEntity {
    //Fields
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "brand")
    private String brand;

    @Column(name = "model")
    private String model;

    @Column(name = "vram")
    private int vram;

    @Column(name = "core_clock_speed")
    private double coreClockSpeed;

    @Column(name = "boost_clock_speed")
    private double boostClockSpeed;

    @Column(name = "tdp")
    private int tdp;

    @Column(name = "length")
    private int length;

    @Column(name = "stock")
    private int stock;

    @Column(name = "price")
    private double price;

    //Default constructor for hibernate
    public GpuEntity() {}

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

    //Setters
    public void setBrand(String brand) {
        this.brand = brand;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public void setVram(int vram) {
        this.vram = vram;
    }

    public void setCoreClockSpeed(double coreClockSpeed) {
        this.coreClockSpeed = coreClockSpeed;
    }

    public void setBoostClockSpeed(double boostClockSpeed) {
        this.boostClockSpeed = boostClockSpeed;
    }

    public void setTdp(int tdp) {
        this.tdp = tdp;
    }

    public void setLength(int length) {
        this.length = length;
    }

    public void setStock(int stock) {
        this.stock = stock;
    }

    public void setPrice(double price) {
        this.price = price;
    }
}
