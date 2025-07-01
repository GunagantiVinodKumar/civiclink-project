package com.civiclink.project.Entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class IssueReport {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private String category; // e.g., Water, Road, Electricity
    private String ward;
    private String status = "PENDING";

    private String submittedBy; // Aadhar or name

    private LocalDateTime submittedAt;
}


