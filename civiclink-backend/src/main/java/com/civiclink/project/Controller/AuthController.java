package com.civiclink.project.Controller;

import com.civiclink.project.DTO.LoginRequestDTO;
import com.civiclink.project.DTO.LoginResponseDTO;
import com.civiclink.project.DTO.MessageResponseDTO;
import com.civiclink.project.Service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody LoginRequestDTO loginRequest) {
        return ResponseEntity.ok(authService.login(loginRequest));
    }
}
