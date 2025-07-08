package com.civiclink.project.Controller;

import com.civiclink.project.DTO.IssueReportDTO;
import com.civiclink.project.Service.IssueReportService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/issues")
public class IssueReportController {

    private final IssueReportService issueReportService;

    public IssueReportController(IssueReportService issueReportService) {
        this.issueReportService = issueReportService;
    }

    // @ModelAttribute to support multipart data
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> reportIssue(
            @ModelAttribute IssueReportDTO dto,
            @RequestHeader("aadhar") String aadhar
    ) {
        String message = issueReportService.submitIssue(dto, aadhar);
        return ResponseEntity.ok(message);
    }

    @GetMapping("/by-aadhar/{aadhar}")
    public ResponseEntity<?> getIssuesByAadhar(@PathVariable String aadhar) {
        try {
            return ResponseEntity.ok(issueReportService.getIssuesByAadhar(aadhar));
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to fetch issues: " + e.getMessage());
        }
    }
}
