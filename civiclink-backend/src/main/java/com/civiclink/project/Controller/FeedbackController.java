package com.civiclink.project.Controller;

import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import java.util.*;

@RestController
@RequestMapping("/api/feedback")
public class FeedbackController {

    @PostMapping("/analyze")
    public ResponseEntity<Map<String, Object>> analyzeFeedback(@RequestBody Map<String, String> request) {
        String feedback = request.get("feedback");

        if (feedback == null || feedback.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Feedback is empty"));
        }

        RestTemplate restTemplate = new RestTemplate();
        String pythonApiUrl = "http://localhost:5001/sentiment";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, String> payload = new HashMap<>();
        payload.put("feedback", feedback);

        HttpEntity<Map<String, String>> httpRequest = new HttpEntity<>(payload, headers);

        try {
            ResponseEntity<Map> pythonResponse =
                    restTemplate.postForEntity(pythonApiUrl, httpRequest, Map.class);

            if (pythonResponse.getStatusCode().is2xxSuccessful() && pythonResponse.getBody() != null) {
                Map<String, Object> result = new HashMap<>();
                result.put("sentiment", pythonResponse.getBody().get("sentiment"));
                result.put("score", pythonResponse.getBody().get("score"));
                return ResponseEntity.ok(result);
            } else {
                return ResponseEntity.status(HttpStatus.BAD_GATEWAY)
                        .body(Map.of("error", "Failed to get response from ML service"));
            }

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Error contacting ML service: " + e.getMessage()));
        }
    }
}
