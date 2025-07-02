package com.civiclink.project.Service;

import com.civiclink.project.DTO.IssueReportDTO;
import com.civiclink.project.Entity.IssueReport;
import com.civiclink.project.Repository.IssueReportRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class IssueReportService {

    private final IssueReportRepository issueRepo;

    public IssueReportService(IssueReportRepository issueRepo) {
        this.issueRepo = issueRepo;
    }

    public String submitIssue(IssueReportDTO dto, String aadhar) {
        IssueReport issue = new IssueReport();
        issue.setTitle(dto.getTitle());
        issue.setDescription(dto.getDescription());
        issue.setCategory(dto.getCategory());
        issue.setWard(dto.getWard());
        issue.setSubmittedBy(aadhar);
        issue.setSubmittedAt(LocalDateTime.now());

        issueRepo.save(issue);
        return "Issue submitted successfully.";
    }
}
