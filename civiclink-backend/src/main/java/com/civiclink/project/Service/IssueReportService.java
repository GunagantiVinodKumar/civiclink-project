package com.civiclink.project.Service;

import com.civiclink.project.DTO.IssueReportDTO;
import com.civiclink.project.Entity.IssueReport;
import com.civiclink.project.Entity.Resident;
import com.civiclink.project.Exception.IssueNotFoundException;
import com.civiclink.project.Repository.IssueReportRepository;
import com.civiclink.project.Repository.ResidentRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class IssueReportService {

    private final ResidentRepository residentRepo;
    private final IssueReportRepository issueRepo;

    public IssueReportService(IssueReportRepository issueRepo,ResidentRepository residentRepo) {
        this.issueRepo = issueRepo;
        this.residentRepo= residentRepo;
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
    public List<IssueReport> getAllIssues(){
        return issueRepo.findAll();
    }

    public List<Resident> getAllResidents() {
        return residentRepo.findAll();
    }

    public String deleteByProvidingId(Long id) {
        if(!issueRepo.existsById(id)){
            throw new IssueNotFoundException("issue with Id"+ id +"Not found");
        }
        issueRepo.deleteById(id);
        return "Issue with Id "+ id +" deleted successfully.";
    }
}
