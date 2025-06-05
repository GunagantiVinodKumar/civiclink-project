package com.civiclink.project.DTO;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResidentDTO {

    private String fullName;
    private String aadharNumber;
    private String password;
    private String phone;
    private String gender;
    private String dateOfBirth;
    private String houseNumber;
    private String street;
    private String ward;
    private String village;
    private String pincode;
    private String occupation;
}
