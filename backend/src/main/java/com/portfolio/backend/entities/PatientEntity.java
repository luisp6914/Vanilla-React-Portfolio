package com.portfolio.backend.entities;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name= "patients")
public class PatientEntity {
    //Data Fields
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name="phone_number")
    private String phone;

    @Column(name="email")
    private String email;

    @Column(name="gender")
    private String gender;

    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;

    @Column(name = "dose1")
    private LocalDate dose1;

    @Column(name = "dose2")
    private LocalDate dose2;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vaccine_id")
    private VaccineEntity vaccine;

    //Default constructor for Hibernate
    public PatientEntity(){}

    //Args constructor when creating patient
    public PatientEntity(String firstName, String lastName, String phone, String email, String gender, LocalDate dateOfBirth, LocalDate dose1, VaccineEntity vaccine) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.email = email;
        this.gender = gender;
        this.dateOfBirth = dateOfBirth;
        this.dose1 = dose1;
        this.vaccine = vaccine;
    }

    //Getters
    public int getId() {
        return id;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getPhone() {
        return phone;
    }

    public String getEmail() {
        return email;
    }

    public String getGender() {
        return gender;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public LocalDate getDose1() {
        return dose1;
    }

    public LocalDate getDose2() {
        return dose2;
    }

    public VaccineEntity getVaccine() {
        return vaccine;
    }

    //Setters
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public void setDose1(LocalDate dose1) {
        this.dose1 = dose1;
    }

    public void setDose2(LocalDate dose2) {
        this.dose2 = dose2;
    }

    public void setVaccine(VaccineEntity vaccine) {
        this.vaccine = vaccine;
    }
}
