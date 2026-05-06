package com.project.pcpartpicker.repository;

import com.project.pcpartpicker.entities.GpuEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GpuRepository extends JpaRepository<GpuEntity, Integer> {
}
