package com.project.pcpartpicker.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "ram")
public class RamEntity {
    //Fields
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "brand")
    private String brand;

    @Column(name = "model")
    private String model;

    @Column(name = "capacity")
    private int capacity;

    @Column(name = "speed")
    private int speed;

    @Column(name = "ddr_type")
    private String ddrType;

    @Column(name = "num_sticks")
    private int numSticks;

    @Column(name = "stock")
    private int stock;

    @Column(name = "price")
    private double price;

    //Default constructor for hibernate
    public RamEntity() {}

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

    public void setSpeed(int speed) {
        this.speed = speed;
    }

    public void setDdrType(String ddrType) {
        this.ddrType = ddrType;
    }

    public void setNumSticks(int numSticks) {
        this.numSticks = numSticks;
    }

    public void setStock(int stock) {
        this.stock = stock;
    }

    public void setPrice(double price) {
        this.price = price;
    }
}
