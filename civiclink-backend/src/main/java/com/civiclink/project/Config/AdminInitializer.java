package com.civiclink.project.Config;

import com.civiclink.project.Entity.Resident;
import com.civiclink.project.Enum.Role;
import com.civiclink.project.Repository.ResidentRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class AdminInitializer {

    @Bean
    CommandLineRunner createDefaultAdmin(ResidentRepository residentRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            String adminAadhar = "0000-0000-0000";

            if (!residentRepository.existsByAadharNumber(adminAadhar)) {
                Resident admin = Resident.builder()
                        .fullName("Admin")
                        .aadharNumber(adminAadhar)
                        .password(passwordEncoder.encode("admin@123")) // default password
                        .role(Role.ADMIN)
                        .phone("7095603515")
                        .gender("male")
                        .dateOfBirth("2005-03-18")
                        .houseNumber("19")
                        .street("AnganBadi")
                        .ward("06")
                        .village("Bakkamanthulagudem")
                        .pincode("508204")
                        .occupation("Administrator")
                        .build();

                residentRepository.save(admin);
                System.out.println("Default admin created (aadhar: 999999999999, pass: admin@123)");
            }
        };
    }
}
