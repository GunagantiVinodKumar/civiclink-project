package com.civiclink.project.Service;

import com.civiclink.project.Config.JwtUtil;
import com.civiclink.project.DTO.LoginRequestDTO;
import com.civiclink.project.DTO.MessageResponseDTO;
import com.civiclink.project.Entity.Resident;
import com.civiclink.project.Exception.*;
import com.civiclink.project.Repository.ResidentRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final ResidentRepository residentRepo;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;


    public AuthService(ResidentRepository residentRepo, BCryptPasswordEncoder passwordEncoder,JwtUtil jwtUtil) {
        this.residentRepo = residentRepo;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = passwordEncoder;
    }

    public MessageResponseDTO login(LoginRequestDTO loginRequest) {
        Resident resident = residentRepo
                .findByAadharNumber(loginRequest.getAadharNumber())
                .orElseThrow(() -> new ResidentNotFoundAtLogin("User not found"));

        if (!passwordEncoder.matches(loginRequest.getPassword(), resident.getPassword())) {
            throw new ResidentWithWrongPasswordAtLogin("Invalid credentials");
        }

        String token = jwtUtil.generateToken(resident);

        return new MessageResponseDTO(token);
    }
}
