package com.civiclink.project.Repository;

import com.civiclink.project.Entity.Resident;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ResidentRepository extends JpaRepository<Resident, Long> {
    boolean existsByAadharNumber(String aadharNumber);
    Optional<Resident> findByAadharNumber(String aadharNumber);  //  Required for login
}
