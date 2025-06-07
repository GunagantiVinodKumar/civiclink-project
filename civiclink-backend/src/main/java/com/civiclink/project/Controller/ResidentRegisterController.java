package com.civiclink.project.Controller;

import com.civiclink.project.DTO.ResidentDTO;
import com.civiclink.project.Service.ResidentRegisterService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/residents")
public class ResidentRegisterController {

    private final ResidentRegisterService residentRegisterService;

    public ResidentRegisterController(ResidentRegisterService residentRegisterService) {
        this.residentRegisterService = residentRegisterService;
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerResident(@RequestBody ResidentDTO residentDTO) {
        residentRegisterService.registerResident(residentDTO);
        return ResponseEntity.ok("Resident registered successfully");
    }
}
