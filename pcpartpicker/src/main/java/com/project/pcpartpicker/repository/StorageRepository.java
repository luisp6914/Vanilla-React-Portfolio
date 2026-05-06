package com.project.pcpartpicker.repository;

import com.project.pcpartpicker.entities.StorageEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StorageRepository extends JpaRepository<StorageEntity, Integer> {
}
