package com.civiclink.project.DTO;

import lombok.Data;

@Data
public class IssueReportDTO {
    private String title;
    private String description;
    private String category;
    private String ward;
}
