package com.portfolio.backend.service;

import com.portfolio.backend.dto.VaccinePageResponseDTO;
import com.portfolio.backend.dto.VaccineRequestDTO;
import com.portfolio.backend.dto.VaccineResponseDTO;
import com.portfolio.backend.entities.VaccineEntity;
import com.portfolio.backend.exception.DoseIntervalRequiredException;
import com.portfolio.backend.exception.InvalidRestockAmountException;
import com.portfolio.backend.exception.VaccineNotFoundException;
import com.portfolio.backend.repository.VaccineRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class VaccineService {
    private final VaccineRepository vaccineRepository;

    public VaccineService(VaccineRepository vaccineRepository){
        this.vaccineRepository = vaccineRepository;
    }

    /**
     * This method paginates the vaccines by getting the list of vaccines, the number of pages, and the current page.
     * @param currentPage the current page
     * @return returns the list of vaccines as DTOs, the number of pages, and the current page.
     */
    @Transactional(readOnly = true)
    public VaccinePageResponseDTO listVaccines(int currentPage){
        int PAGE_SIZE = 15;

        //Pageable is the interface and PageRequest is the class that implements Pageable
        Pageable limitAndOffset = PageRequest.of(currentPage, PAGE_SIZE);

        //returned the current page of vaccines
        Page<VaccineEntity> page = vaccineRepository.findAll(limitAndOffset);

        List<VaccineResponseDTO> listOfVaccine = new ArrayList<>();

        //Get the list of vaccine as a DTO
        for(VaccineEntity entity : page.getContent()){
            listOfVaccine.add(VaccineResponseDTO.fromEntity(entity));
        }

        //returning the page DTO
        return new VaccinePageResponseDTO(listOfVaccine, page.getTotalPages(), page.getNumber());
    }

    /**
     * This method checks the database to see if the vaccine exist. It uses the repository builtin function.
     * @param id the vaccine that is being looked up.
     * @return a vaccineDTO
     */
    @Transactional(readOnly = true)
    public VaccineResponseDTO getVaccine(int id){
        VaccineEntity vaccine = vaccineRepository.findById(id).orElseThrow(
                () -> new VaccineNotFoundException("Vaccine with ID: " + id + " not found")
        );

        return VaccineResponseDTO.fromEntity(vaccine);
    }

    /**
     * This method registers and new vaccine, validating the values in the VaccineRequestDTO, and then performing some
     * business logic in the service layer. If all passes, then vaccine is created.
     * @param vaccineRequest the vaccine that is intended to be created
     * @return VaccineDTO
     */
    @Transactional
    public VaccineResponseDTO registerVaccine(VaccineRequestDTO vaccineRequest){
        if(vaccineRequest.getDosesRequired() == 2 && vaccineRequest.getDoseInterval() <= 0){
            throw new DoseIntervalRequiredException("Dose interval is required when doses required is 2");
        }
        //TODO create a validation for the vaccine name

        //Built vaccine and dosesReceived must match the quantityRemaining for the constructor
        VaccineEntity vaccine = new VaccineEntity(vaccineRequest.getName(), vaccineRequest.getDosesRequired(), vaccineRequest.getDoseInterval(), vaccineRequest.getDosesReceived(), vaccineRequest.getDosesReceived());

        //Saved vaccine
        VaccineEntity savedVaccine = vaccineRepository.save(vaccine);


        return VaccineResponseDTO.fromEntity(savedVaccine);

    }

    /**
     * This method updates the vaccine with restock amount. Having validation to see if the vaccine exist and that the
     * amount is correct.
     * @param id the vaccine that is being looked up.
     * @param restockAmount the amount being restocked.
     * @return the updated vaccineDTO.
     */
    @Transactional
    public VaccineResponseDTO addStock(int id, int restockAmount){
        VaccineEntity vaccine = vaccineRepository.findById(id).orElseThrow(
                () -> new VaccineNotFoundException("Vaccine with ID " + id + " not found.")
        );

        if(restockAmount < 1) throw new InvalidRestockAmountException("Restock amount must be more than 0");

        vaccine.setQuantityRemaining(vaccine.getQuantityRemaining() + restockAmount);
        vaccine.setTotalDosesReceived(vaccine.getTotalDosesReceived() + restockAmount);

        VaccineEntity savedVaccine = vaccineRepository.save(vaccine);

        return VaccineResponseDTO.fromEntity(savedVaccine);

    }


}
