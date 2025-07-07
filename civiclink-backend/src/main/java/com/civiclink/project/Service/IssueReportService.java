package com.civiclink.project.Service;

import com.civiclink.project.DTO.IssueReportDTO;
import com.civiclink.project.Entity.IssueReport;
import com.civiclink.project.Entity.Resident;
import com.civiclink.project.Exception.IssueNotFoundException;
import com.civiclink.project.Repository.IssueReportRepository;
import com.civiclink.project.Repository.ResidentRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class IssueReportService {

    private final ResidentRepository residentRepo;
    private final IssueReportRepository issueRepo;

    private final String uploadDir = "uploads/issues"; // Store files locally for now

    public IssueReportService(IssueReportRepository issueRepo, ResidentRepository residentRepo) {
        this.issueRepo = issueRepo;
        this.residentRepo = residentRepo;
    }

    public String submitIssue(IssueReportDTO dto, String aadhar) {
        try {
            // Save files and get filenames/paths
            String imagePath = saveFile(dto.getImage());
            String videoPath = saveFile(dto.getVideo());
            String audioPath = saveFile(dto.getAudio());

            IssueReport issue = new IssueReport();
            issue.setTitle(dto.getTitle());
            issue.setDescription(dto.getDescription());
            issue.setCategory(dto.getCategory());
            issue.setWard(dto.getWard());
            issue.setSubmittedBy(aadhar);
            issue.setSubmittedAt(LocalDateTime.now());
            issue.setStatus("PENDING"); // Default status
            issue.setImagePath(imagePath);
            issue.setVideoPath(videoPath);
            issue.setAudioPath(audioPath);

            issueRepo.save(issue);
            return "Issue submitted successfully.";
        } catch (IOException e) {
            return "Failed to submit issue: " + e.getMessage();
        }
    }

    private String saveFile(MultipartFile file) throws IOException {
        if (file == null || file.isEmpty()) return null;

        String originalFilename = file.getOriginalFilename();
        String extension = originalFilename != null && originalFilename.contains(".")
                ? originalFilename.substring(originalFilename.lastIndexOf("."))
                : "";
        String filename = UUID.randomUUID() + extension;

        Path dirPath = Paths.get(uploadDir);
        Files.createDirectories(dirPath); // Ensure directory exists

        Path filePath = dirPath.resolve(filename);
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        return filePath.toString(); // Can later change to a public URL
    }

    public List<IssueReport> getAllIssues() {
        return issueRepo.findAll();
    }

    public List<Resident> getAllResidents() {
        return residentRepo.findAll();
    }

    public String deleteByProvidingId(Long id) {
        if (!issueRepo.existsById(id)) {
            throw new IssueNotFoundException("Issue with ID " + id + " not found");
        }
        issueRepo.deleteById(id);
        return "Issue with ID " + id + " deleted successfully.";
    }
}
