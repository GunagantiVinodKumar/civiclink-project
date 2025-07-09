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
            // Step 1: Call ML API for prediction
            String predictedTitle = "";
            String predictedCategory = "";

            try {
                String mlResponse = callMLPredictAPI(dto.getDescription());

                // Parse JSON manually
                String cleaned = mlResponse.replaceAll("[{}\"]", "");
                for (String part : cleaned.split(",")) {
                    String[] keyValue = part.split(":", 2);
                    if (keyValue.length == 2) {
                        String key = keyValue[0].trim();
                        String value = keyValue[1].trim();
                        if (key.equals("title")) predictedTitle = value;
                        else if (key.equals("category")) predictedCategory = value;
                    }
                }
            } catch (Exception e) {
                System.err.println("ML prediction failed, falling back to form values: " + e.getMessage());
                predictedTitle = dto.getTitle(); // fallback
                predictedCategory = dto.getCategory();
            }

            // Step 2: Save media files
            String imagePath = saveFile(dto.getImage());
            String videoPath = saveFile(dto.getVideo());
            String audioPath = saveFile(dto.getAudio());

            // Step 3: Build and save entity
            IssueReport issue = new IssueReport();
            issue.setTitle(predictedTitle);
            issue.setDescription(dto.getDescription());
            issue.setCategory(predictedCategory);
            issue.setWard(dto.getWard());
            issue.setSubmittedBy(aadhar);
            issue.setSubmittedAt(LocalDateTime.now());
            issue.setStatus("PENDING");
            issue.setImagePath(imagePath);
            issue.setVideoPath(videoPath);
            issue.setAudioPath(audioPath);

            issueRepo.save(issue);
            return "Issue submitted successfully.";

        } catch (IOException e) {
            return "Failed to submit issue: " + e.getMessage();
        }
    }

    private String callMLPredictAPI(String description) throws IOException, InterruptedException {
        String json = "{\"description\": \"" + description.replace("\"", "\\\"") + "\"}";

        java.net.http.HttpRequest request = java.net.http.HttpRequest.newBuilder()
                .uri(java.net.URI.create("http://localhost:5001/predict"))
                .header("Content-Type", "application/json")
                .POST(java.net.http.HttpRequest.BodyPublishers.ofString(json))
                .build();

        java.net.http.HttpClient client = java.net.http.HttpClient.newHttpClient();
        java.net.http.HttpResponse<String> response = client.send(request, java.net.http.HttpResponse.BodyHandlers.ofString());

        return response.body();
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

    public List<IssueReport> getIssuesByAadhar(String aadhar) {
        return issueRepo.findBySubmittedBy(aadhar);
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
