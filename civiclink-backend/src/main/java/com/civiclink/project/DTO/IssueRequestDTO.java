package com.civiclink.project.DTO;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class IssueRequestDTO {
    private String title;
    private String description;
    private String location;
    private Long residentId; // To map who reported it
}

