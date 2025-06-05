package com.civiclink.project.Controller;

import com.civiclink.project.DTO.ResidentDTO;
import com.civiclink.project.Service.ResidentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/residents")
public class ResidentController {

    private final ResidentService residentService;

    public ResidentController(ResidentService residentService) {
        this.residentService = residentService;
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerResident(@RequestBody ResidentDTO residentDTO) {
        residentService.registerResident(residentDTO);
        return ResponseEntity.ok("Resident registered successfully");
    }
}
