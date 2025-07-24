package com.civiclink.project.Controller;

import com.civiclink.project.Config.JwtUtil;
import com.civiclink.project.Entity.Feedback;
import com.civiclink.project.Repository.FeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import jakarta.servlet.http.HttpServletRequest;
import java.util.*;

@RestController
@RequestMapping("/api/resident/feedback")
public class FeedbackController {

    @Autowired
    private FeedbackRepository feedbackRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/analyze")
    public ResponseEntity<Map<String, Object>> analyzeAndSaveFeedback(
            @RequestBody Map<String, String> request,
            HttpServletRequest httpRequest) {

        String feedbackText = request.get("feedback");
        if (feedbackText == null || feedbackText.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Feedback is empty"));
        }

        // Extract JWT and get Aadhar
        String token = extractTokenFromHeader(httpRequest);
        String submittedBy = "Anonymous";
        if (token != null && jwtUtil.validateToken(token)) {
            submittedBy = jwtUtil.extractAadhar(token);
        }

        // Call Python ML API
        RestTemplate restTemplate = new RestTemplate();
        String pythonUrl = "http://localhost:5001/sentiment";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        Map<String, String> payload = Map.of("feedback", feedbackText);
        HttpEntity<Map<String, String>> entity = new HttpEntity<>(payload, headers);

        try {
            ResponseEntity<Map> response = restTemplate.postForEntity(pythonUrl, entity, Map.class);
            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                // Save feedback
                Feedback fb = new Feedback();
                fb.setSubmittedBy(submittedBy);
                fb.setFeedbackText(feedbackText);
                fb.setSentiment((String) response.getBody().get("sentiment"));
                fb.setScore(Double.parseDouble(response.getBody().get("score").toString()));

                feedbackRepository.save(fb);

                return ResponseEntity.ok(Map.of(
                        "sentiment", fb.getSentiment(),
                        "score", fb.getScore()
                ));
            }

            return ResponseEntity.status(HttpStatus.BAD_GATEWAY)
                    .body(Map.of("error", "ML service error"));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Exception: " + e.getMessage()));
        }
    }

    private String extractTokenFromHeader(HttpServletRequest request) {
        String header = request.getHeader("Authorization");
        if (header != null && header.startsWith("Bearer ")) {
            return header.substring(7);
        }
        return null;
    }
}
