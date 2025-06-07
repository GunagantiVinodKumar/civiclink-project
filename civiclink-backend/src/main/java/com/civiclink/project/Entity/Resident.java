package com.civiclink.project.Entity;
import com.civiclink.project.Enum.Role;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "residents")
public class Resident {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private Role role;

    private String fullName;

    @Column(unique = true, nullable = false)
    private String aadharNumber;

    @Column(nullable = false)
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
