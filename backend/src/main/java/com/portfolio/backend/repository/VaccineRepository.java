package com.portfolio.backend.repository;

import com.portfolio.backend.entities.VaccineEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VaccineRepository extends JpaRepository<VaccineEntity, Integer> {
}
