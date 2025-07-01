package com.civiclink.project.Repository;

import com.civiclink.project.DTO.IssueReportDTO;
import com.civiclink.project.Entity.IssueReport;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/issues")
public class IssueReportController {
    private final IssueReportRepository issueRepo;

    public IssueReportController(IssueReportRepository repo) {
        this.issueRepo = repo;
    }

    @PostMapping
    public ResponseEntity<?> reportIssue(@RequestBody IssueReportDTO dto, @RequestHeader("aadhar") String aadhar) {
        IssueReport issue = new IssueReport();
        issue.setTitle(dto.getTitle());
        issue.setDescription(dto.getDescription());
        issue.setCategory(dto.getCategory());
        issue.setWard(dto.getWard());
        issue.setSubmittedBy(aadhar);
        issue.setSubmittedAt(LocalDateTime.now());
        issueRepo.save(issue);
        return ResponseEntity.ok("Issue submitted successfully.");
    }
}
