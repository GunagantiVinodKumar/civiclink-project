package com.civiclink.project.Entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String submittedBy;
    private String feedbackText;
    private String sentiment;
    private double score;
    private LocalDateTime submittedAt;
    @PrePersist
    protected void onCreate() {
        submittedAt = LocalDateTime.now();
    }
}
