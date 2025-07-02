package com.civiclink.project.Controller;

import com.civiclink.project.DTO.IssueReportDTO;
import com.civiclink.project.Service.IssueReportService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/issues")
public class IssueReportController {

    private final IssueReportService issueReportService;

    public IssueReportController(IssueReportService issueReportService) {
        this.issueReportService = issueReportService;
    }

    @PostMapping
    public ResponseEntity<String> reportIssue(@RequestBody IssueReportDTO dto, @RequestHeader("aadhar") String aadhar) {
        String message = issueReportService.submitIssue(dto, aadhar);
        return ResponseEntity.ok(message);
    }
}
