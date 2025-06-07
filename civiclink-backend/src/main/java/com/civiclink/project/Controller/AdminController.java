package com.civiclink.project.Controller;

import com.civiclink.project.Entity.IssueReport;
import com.civiclink.project.Entity.Resident;
import com.civiclink.project.Service.IssueReportService;
import com.civiclink.project.Repository.ResidentRepository;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")  // This ensures only ADMIN can access all below endpoints
public class AdminController {

    private final ResidentRepository residentRepository;
    private final IssueReportService issueReportService;

    public AdminController(ResidentRepository residentRepository, IssueReportService issueReportService) {
        this.residentRepository = residentRepository;
        this.issueReportService = issueReportService;
    }

    @GetMapping("/residents")
    public List<Resident> getAllResidents() {
        return issueReportService.getAllResidents();
    }

    @GetMapping("/issues")
    public List<IssueReport> getAllIssues() {
        return issueReportService.getAllIssues();
    }

    @DeleteMapping("/issues/{id}")
    public String deleteIssueById(@PathVariable Long id) {
        return issueReportService.deleteByProvidingId(id);
    }
}
