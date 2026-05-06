package com.project.pcpartpicker.repository;

import com.project.pcpartpicker.entities.PsuEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PsuRepository extends JpaRepository<PsuEntity, Integer> {
}
