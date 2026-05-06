package com.project.pcpartpicker.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "cpu")
public class CpuEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id ;

    @Column(name = "brand")
    private String brand;

    @Column(name = "model")
    private String model;

    @Column(name = "cores")
    private int cores;

    @Column(name = "threads")
    private int threads;

    @Column(name = "base_clock_speed")
    private double baseClockSpeed;

    @Column(name = "boost_clock_speed")
    private double boostClockSpeed;

    @Column(name = "tdp")
    private int tdp;

    @Column(name = "socket_type")
    private String socketType;

    @Column(name = "stock")
    private int stock;

    @Column(name = "price")
    private double price;


    //Default constructor needed for Hibernate
    public CpuEntity() {}

    //getters
    public int getId() {
        return this.id;
    }

    public String getBrand() {
        return this.brand;
    }

    public String getModel() {
        return this.model;
    }

    public int getCores() {
        return this.cores;
    }

    public int getThreads() {
        return this.threads;
    }

    public double getBaseClockSpeed() {
        return this.baseClockSpeed;
    }

    public double getBoostClockSpeed() {
        return this.boostClockSpeed;
    }

    public int getTdp() {
        return this.tdp;
    }

    public String getSocketType() {
        return this.socketType;
    }

    public int getStock() {
        return this.stock;
    }

    public double getPrice() {
        return this.price;
    }

    //Setters
    public void setBrand(String brand) {
        this.brand = brand;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public void setCores(int cores) {
        this.cores = cores;
    }

    public void setThreads(int threads) {
        this.threads = threads;
    }

    public void setBaseClockSpeed(double baseClockSpeed) {
        this.baseClockSpeed = baseClockSpeed;
    }

    public void setBoostClockSpeed(double boostClockSpeed) {
        this.boostClockSpeed = boostClockSpeed;
    }

    public void setTdp(int tdp) {
        this.tdp = tdp;
    }

    public void setSocketType(String socketType) {
        this.socketType = socketType;
    }

    public void setStock(int stock) {
        this.stock = stock;
    }

    public void setPrice(double price) {
        this.price = price;
    }
}
