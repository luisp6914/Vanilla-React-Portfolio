package com.portfolio.backend.controllers;

import com.portfolio.backend.dto.VaccinePageResponseDTO;
import com.portfolio.backend.dto.VaccineRequestDTO;
import com.portfolio.backend.dto.VaccineResponseDTO;
import com.portfolio.backend.service.VaccineService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/vaccines")
public class VaccineController {
    //Field
    private final VaccineService vaccineService;

    //Default constructor for dependency injection
    public VaccineController(VaccineService vaccineService){
        this.vaccineService = vaccineService;
    }

    /**
     * Method passes the current page to the service in order to get back a list of vaccines, or it defaults to the first
     * page if nothing is passed.
     * @param page the current page
     * @return list of vaccines, total pages, and the current page.
     */
    @GetMapping
    public ResponseEntity<VaccinePageResponseDTO> listVaccines(@RequestParam(defaultValue = "0") int page){
        return ResponseEntity.ok(vaccineService.listVaccines(page));
    }

    /**
     * The method passes the vaccine ID to the service, which then varifies if the vaccine exist.
     * @param id the vaccine to be looked up.
     * @return the VaccineDTO of the found vaccine and the HTTP status.
     */
    @GetMapping("/{id}")
    public ResponseEntity<VaccineResponseDTO> getVaccine(@PathVariable int id){
        return ResponseEntity.ok(vaccineService.getVaccine(id));
    }

    /**
     * This method has @Valid annotation in order to trigger the validation annotation in the VaccineRequestDTO. It also
     * passes the vaccine data to the service, and if everything passes, a new vaccine is created.
     * @param vaccine the new vaccine that is planned to be created.
     * @return the newly created vaccine and HTTP status code.
     */
    @PostMapping
    public ResponseEntity<VaccineResponseDTO> registerVaccine(@Valid @RequestBody VaccineRequestDTO vaccine){
        return ResponseEntity.status(HttpStatus.CREATED).body(vaccineService.registerVaccine(vaccine));
    }

    /**
     * This method passes the vaccine id and the restocking amount to the service layer, which then updates the vaccine.
     * @param id the vaccine that is being resupplied and comes from the URL path.
     * @param restockAmount the amount being supplied and this comes from the request parameter.
     * @return the updated vaccine.
     */
    @PatchMapping("/{id}")
    public ResponseEntity<VaccineResponseDTO> addStock(@PathVariable int id, @RequestParam int restockAmount){
        return ResponseEntity.ok(vaccineService.addStock(id, restockAmount));
    }

}
