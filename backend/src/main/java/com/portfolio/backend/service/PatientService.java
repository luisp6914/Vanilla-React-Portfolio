package com.portfolio.backend.service;

import com.portfolio.backend.dto.PatientPageResponseDTO;
import com.portfolio.backend.dto.PatientRequestDTO;
import com.portfolio.backend.dto.PatientResponseDTO;
import com.portfolio.backend.entities.PatientEntity;
import com.portfolio.backend.entities.VaccineEntity;
import com.portfolio.backend.exception.*;
import com.portfolio.backend.repository.PatientRepository;
import com.portfolio.backend.repository.VaccineRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PatientService {
    private final PatientRepository patientRepository;
    private final VaccineRepository vaccineRepository;

    public PatientService(PatientRepository patientRepository, VaccineRepository vaccineRepository){
        this.patientRepository = patientRepository;
        this.vaccineRepository = vaccineRepository;
    }

    /**
     * This method uses the Pageable object and creates a request condition that then is sent to the repository to
     * then get a list of patients based on the pagination conditions.
     * @param pageNumber the offset of where we want the list to come from
     * @return it will return the list of patients based on the pagination
     */
    @Transactional(readOnly = true)
    public PatientPageResponseDTO listPatients(int pageNumber){
        int PAGE_SIZE = 15;

        Pageable limitAndOffset = PageRequest.of(pageNumber, PAGE_SIZE);

        Page<PatientEntity> page = patientRepository.findAll(limitAndOffset);

        List<PatientResponseDTO> listOfPatients = new ArrayList<>();

        //Transferring entity list to response dto list
        for(PatientEntity patient : page.getContent()){
            listOfPatients.add(PatientResponseDTO.fromEntity(patient));
        }

        return new PatientPageResponseDTO(listOfPatients, page.getTotalPages(), page.getNumber());
    }

    /**
     * This method is set up to return a patient DTO or throw an exception. This Exception will then be handled by the
     * Global Exception Handler. This is done by spring, where it intercepts the exception as it bubbles up the stack.
     * Spring knows to intercept it since the Global Exception handler has the annotation of @ControllerAdvice. The end
     * result of when the user is not found will be that the Exception Handler will return an Exception Response DTO.
     * @param id The id of the user that is being searched
     * @return A DTO of the user data will be returned
     */
    @Transactional(readOnly = true)
    public PatientResponseDTO getPatient(int id){
        Optional<PatientEntity> repositoryResponse = patientRepository.findById(id);
        if(repositoryResponse.isEmpty()){
            throw new PatientNotFoundException("Patient with ID: " + id + " Not Found");
        }

        return PatientResponseDTO.fromEntity(repositoryResponse.get());
    }

    /**
     * This method handles the creating of a new patient. The main ideas that are handled are the @Transactional, where
     * if some part of the operation fails, then the changes made to the database are rolled back. Then there is the
     * handling of request validation, where I manage an incoming requestDTO that has the information to be used in the
     * service layer, but before I get here, SpringBoot validates it. The validation annotations are in the requestDTO.
     * If one of requestDTO fields fails to be validated, then an exception is thrown. This exception will not be thrown
     * by the current method. Instead, it is thrown by SpringBoot, and is handled by it too. I have an exception handler
     * that monitors the exception being thrown. Additionally, the concurrency issue is handled here with @Version annotation
     * on the version field in the vaccine entity. If the version do not match, then JPA throws an exception, and the
     * GlobalHandler will catch it and deal with it. At the end, if no issue arises, then the patient is created and the
     * vaccine is decremented.
     *
     * @param patientRequest this is the data that is passed by the front end to then populate the patient.
     * @return it returns the created patient as a DTO.
     */
    @Transactional
    public PatientResponseDTO registerPatient(PatientRequestDTO patientRequest){
        LocalDate dose1Date = LocalDate.now();

        VaccineEntity vaccine = vaccineRepository.findById(patientRequest.getVaccineId()).orElseThrow(
                () -> new VaccineNotFoundException("Vaccine With ID: " + patientRequest.getVaccineId() + " Not Found")
        );

        if(vaccine.getQuantityRemaining() <= 0) throw new NoDosesRemainingException("There are no doses remaining for " + vaccine.getVaccineName() + " Vaccine");

        vaccine.setQuantityRemaining(vaccine.getQuantityRemaining() - 1);

        PatientEntity patient = new PatientEntity(patientRequest.getFirstName(), patientRequest.getLastName(), patientRequest.getPhoneNumber(), patientRequest.getEmail(), patientRequest.getGender(), patientRequest.getDateOfBirth(), dose1Date, vaccine);
        PatientEntity savedPatient = patientRepository.save(patient);

        return PatientResponseDTO.fromEntity(savedPatient);
    }

    /**
     * This method applied the second dose specific patient. First, it will handle all business logic. For example,
     * checking if the patient exist, making sure the patient still needs a second dose, making sure there is enough doses,
     * and making sure that we are applying the second dose on the correct date. If any of these fail, then we throw an
     * exception, which then is handled by the GlobalExceptionHandler.
     * @param id the id of the patient we are trying to update
     * @return returns a DTO of the updated patient.
     */
    @Transactional
    public PatientResponseDTO patientSecondDose(int id){
        LocalDate dose2Date = LocalDate.now();

        PatientEntity patient = patientRepository.findById(id).orElseThrow(
                () -> new PatientNotFoundException("Patient with ID: " + id + " not found")
        );

        VaccineEntity vaccine = patient.getVaccine();

        if(vaccine.getDosesRequired() <= 1) throw new RequiresTwoDosesException("Vaccine needs to require 2 Doses");
        if(patient.getDose2() != null) throw new DoseTwoExistException("Patient with ID: " + patient.getId() + " already has two doses");

        LocalDate earliestDate = patient.getDose1().plusDays(vaccine.getDoseInterval());
        if( dose2Date.isBefore(earliestDate)) throw new DoseIntervalNotMetException("Current Date is before " + earliestDate);

        if(vaccine.getQuantityRemaining() <= 0) throw new NoDosesRemainingException("There are no doses remaining for " + vaccine.getVaccineName() + " vaccine");

        patient.setDose2(dose2Date);

        PatientEntity savedPatient = patientRepository.save(patient);

        vaccine.setQuantityRemaining(vaccine.getQuantityRemaining() - 1);
        vaccineRepository.save(vaccine);

        return PatientResponseDTO.fromEntity(savedPatient);

    }




}
