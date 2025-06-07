package com.civiclink.project.Service;

import com.civiclink.project.DTO.IssueRequestDTO;
import com.civiclink.project.Entity.IssueReport;
import com.civiclink.project.Entity.Resident;
import com.civiclink.project.Exception.ResidentNotFoundAtReportingIssue;
import com.civiclink.project.Repository.IssueReportRepository;
import com.civiclink.project.Repository.ResidentRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class IssueReportService {

    private final IssueReportRepository issueReportRepository;
    private final ResidentRepository residentRepository;

    public IssueReportService(IssueReportRepository issueReportRepository, ResidentRepository residentRepository){
        this.issueReportRepository = issueReportRepository;
        this.residentRepository = residentRepository;
    }

    public String deleteByProvidingId(Long id){
        issueReportRepository.deleteById(id);
        return "Success fully deleted";
    }

    public List<Resident> getAllResidents() {
        return residentRepository.findAll();
    }

    public List<IssueReport> getAllIssues() {
        return issueReportRepository.findAll();
    }

    public void reportIssue(IssueRequestDTO request){
        Resident resident = residentRepository.findById(request.getResidentId()).orElseThrow(
                () -> new ResidentNotFoundAtReportingIssue("Resident not found")
        );
        IssueReport issue = new IssueReport();
        issue.setTitle(request.getTitle());
        issue.setDescription(request.getDescription());
        issue.setLocation(request.getLocation());
        issue.setReportedAt(LocalDateTime.now());
        issue.setReportedBy(resident);

        issueReportRepository.save(issue);
    }
}
