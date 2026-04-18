package com.portfolio.backend.controllers;

import com.portfolio.backend.dto.PatientPageResponseDTO;
import com.portfolio.backend.dto.PatientRequestDTO;
import com.portfolio.backend.dto.PatientResponseDTO;
import com.portfolio.backend.service.PatientService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/patients")
public class PatientController {
    //Field
    private final PatientService patientService;

    //Default constructor to do dependency injection
    public PatientController(PatientService patientService){
        this.patientService = patientService;
    }

    /**
     * This method calls the service to get the list of patient, where the default value is 0, so users do not always have
     * to send a value. The @GetMapping does not need a path, since the base URL interprets that we are page of patients.
     * @param page the current page
     * @return the status and patientDTO
     */
    @GetMapping
    public ResponseEntity<PatientPageResponseDTO> listPatients(@RequestParam(defaultValue = "0") int page){
        return ResponseEntity.ok(patientService.listPatients(page));
    }

    /**
     * This method passes the Patient ID to look for in the service. Instead of using @RequestParameter, @PathVariable will
     * be used. Since the id is actually used in the endpoint path
     * @param id the Patient
     * @return PatientDTO and the HTTP status
     */
    @GetMapping("/{id}")
    public ResponseEntity<PatientResponseDTO> getPatient(@PathVariable int id){
        return ResponseEntity.ok(patientService.getPatient(id));
    }

    /**
     * This method registers a new patient and just like the listPatients method, the Mapping does not include a path,
     * since it is interpreted by the base URL and the HTTP method. The @Valid annotation is used in order for the validation
     * annotations in the PatientRequestDTO to be triggered.
     * @param patient is the new patient that will be added to the database if nothing fails.
     * @return the recently added patient.
     */
    @PostMapping
    public ResponseEntity<PatientResponseDTO> registerPatient(@Valid @RequestBody PatientRequestDTO patient){
        return ResponseEntity.status(HttpStatus.CREATED).body(patientService.registerPatient(patient));
    }

    /**
     * This method passes the patient ID to the service, where it will update the patient if it is found. This one does
     * need a path for the mapping, since it will pass the id as a path variable.
     * @param id is the patient that will be updated
     * @return the patient with the updated field.
     */
    @PatchMapping("/{id}")
    public ResponseEntity<PatientResponseDTO> patientSecondDose(@PathVariable int id){
        return ResponseEntity.ok(patientService.patientSecondDose(id));
    }
}
