package com.civiclink.project.Controller;

import com.civiclink.project.DTO.IssueRequestDTO;
import com.civiclink.project.Service.IssueReportService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user") // or just "/api"
public class RegisterIssueController {

    private final IssueReportService issueReportService;

    public RegisterIssueController(IssueReportService issueReportService) {
        this.issueReportService = issueReportService;
    }

    @PostMapping("/report")
    public String reportsResidentIssue(@RequestBody IssueRequestDTO request) {
        issueReportService.reportIssue(request);
        return "Issue reported successfully.";
    }
}

