package com.portfolio.backend.repository;

import com.portfolio.backend.entities.PatientEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PatientRepository extends JpaRepository<PatientEntity, Integer> {
    boolean existsByPhone(String phoneNumber);
    boolean existsByEmail(String email);
}
