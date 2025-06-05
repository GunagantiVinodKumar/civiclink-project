package com.civiclink.project.DTO;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginRequestDTO {
    private String aadharNumber;
    private String password;
}
