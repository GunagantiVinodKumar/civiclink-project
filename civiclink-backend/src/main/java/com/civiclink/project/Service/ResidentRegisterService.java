package com.civiclink.project.Service;

import com.civiclink.project.DTO.ResidentDTO;
import com.civiclink.project.Entity.Resident;
import com.civiclink.project.Enum.Role;
import com.civiclink.project.Exception.ResidentExistsByAadhaarAtRegistration;
import com.civiclink.project.Repository.ResidentRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class ResidentRegisterService {

    private final ResidentRepository residentRepo;
    private final BCryptPasswordEncoder passwordEncoder;

    public ResidentRegisterService(ResidentRepository residentRepo, BCryptPasswordEncoder passwordEncoder) {
        this.residentRepo = residentRepo;
        this.passwordEncoder = passwordEncoder;
    }

    public Resident registerResident(ResidentDTO dto) {
        if (residentRepo.existsByAadharNumber(dto.getAadharNumber())) {
            throw new ResidentExistsByAadhaarAtRegistration("Aadhar already registered");
        }

        Resident resident = Resident.builder()
                .fullName(dto.getFullName())
                .aadharNumber(dto.getAadharNumber())
                .password(passwordEncoder.encode(dto.getPassword()))
                .phone(dto.getPhone())
                .gender(dto.getGender())
                .dateOfBirth(dto.getDateOfBirth())
                .houseNumber(dto.getHouseNumber())
                .street(dto.getStreet())
                .ward(dto.getWard())
                .village(dto.getVillage())
                .pincode(dto.getPincode())
                .occupation(dto.getOccupation())
                .role(Role.RESIDENT)
                .build();

        return residentRepo.save(resident);
    }
}
