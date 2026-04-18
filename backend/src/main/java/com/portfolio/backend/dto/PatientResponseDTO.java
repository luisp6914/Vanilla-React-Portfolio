package com.portfolio.backend.dto;

import com.portfolio.backend.entities.PatientEntity;

import java.time.LocalDate;

public class PatientResponseDTO {
    //Data Fields
    private int id;
    private String patientName;
    private String phoneNumber;
    private String email;
    private String gender;
    private LocalDate dateOfBirth;
    private LocalDate dose1;
    private LocalDate dose2;
    private String vaccineName;

    //Default constructor
    public PatientResponseDTO(){}


    public static PatientResponseDTO fromEntity(PatientEntity patient){
        PatientResponseDTO dto = new PatientResponseDTO();
        dto.id = patient.getId();
        dto.patientName = patient.getFirstName() + " " + patient.getLastName();
        dto.phoneNumber = patient.getPhone();
        dto.email = patient.getEmail();
        dto.gender = patient.getGender();
        dto.dateOfBirth = patient.getDateOfBirth();
        dto.dose1 = patient.getDose1();
        dto.dose2 = patient.getDose2();
        dto.vaccineName = (patient.getVaccine() != null && patient.getVaccine().getVaccineName() != null) ? patient.getVaccine().getVaccineName() : "";

        return dto;
    }

    //Getters
    public int getId(){
        return id;
    }
    public String getPatientName() {
        return patientName;
    }

    public String getPhoneNumber() {
        return phoneNumber;
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

    public String getVaccineName() {
        return vaccineName;
    }
}
