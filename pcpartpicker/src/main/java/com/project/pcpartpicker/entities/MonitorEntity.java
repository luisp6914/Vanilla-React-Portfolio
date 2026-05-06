package com.project.pcpartpicker.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "monitor")
public class MonitorEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "brand")
    private String brand;

    @Column(name = "model")
    private String model;

    @Column(name = "screen_size")
    private double screenSize;

    @Column(name = "resolution")
    private String resolution;

    @Column(name = "refresh_rate")
    private int refreshRate;

    @Column(name = "panel_type")
    private String panelType;

    @Column(name = "response_time")
    private double responseTime;

    @Column(name = "stock")
    private int stock;

    @Column(name = "price")
    private double price;

    //Default Constructor for Hibernate
    public MonitorEntity(){}

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

    public double getScreenSize() {
        return screenSize;
    }

    public String getResolution() {
        return resolution;
    }

    public int getRefreshRate() {
        return refreshRate;
    }

    public String getPanelType() {
        return panelType;
    }

    public double getResponseTime() {
        return responseTime;
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

    public void setScreenSize(double screenSize) {
        this.screenSize = screenSize;
    }

    public void setResolution(String resolution) {
        this.resolution = resolution;
    }

    public void setRefreshRate(int refreshRate) {
        this.refreshRate = refreshRate;
    }

    public void setPanelType(String panelType) {
        this.panelType = panelType;
    }

    public void setResponseTime(double responseTime) {
        this.responseTime = responseTime;
    }

    public void setStock(int stock) {
        this.stock = stock;
    }

    public void setPrice(double price) {
        this.price = price;
    }
}
