package com.civiclink.project.DTO;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class IssueReportDTO {
    private String title;
    private String description;
    private String category;
    private String ward;
    private String aadharNumber;

    private MultipartFile image;
    private MultipartFile video;
    private MultipartFile audio;
}
