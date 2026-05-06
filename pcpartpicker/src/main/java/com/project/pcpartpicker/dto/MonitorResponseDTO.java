package com.project.pcpartpicker.dto;

import com.project.pcpartpicker.entities.MonitorEntity;

public class MonitorResponseDTO {
    private int id;
    private String brand;
    private String model;
    private double screenSize;
    private String resolution;
    private int refreshRate;
    private String panelType;
    private double responseTime;
    private int stock;
    private double price;

    //Default constructor
    public MonitorResponseDTO() {
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

    public static MonitorResponseDTO fromMonitorEntity(MonitorEntity monitorEntity){
        MonitorResponseDTO monitorDTO = new MonitorResponseDTO();

        monitorDTO.id = monitorEntity.getId();
        monitorDTO.brand = monitorEntity.getBrand();
        monitorDTO.model = monitorEntity.getModel();
        monitorDTO.screenSize = monitorEntity.getScreenSize();
        monitorDTO.resolution = monitorEntity.getResolution();
        monitorDTO.refreshRate = monitorEntity.getRefreshRate();
        monitorDTO.panelType = monitorEntity.getPanelType();
        monitorDTO.responseTime = monitorEntity.getResponseTime();
        monitorDTO.stock = monitorEntity.getStock();
        monitorDTO.price = monitorEntity.getPrice();

        return monitorDTO;
    }
}
