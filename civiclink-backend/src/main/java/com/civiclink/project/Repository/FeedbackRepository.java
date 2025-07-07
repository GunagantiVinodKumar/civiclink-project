package com.civiclink.project.Repository;

import com.civiclink.project.Entity.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeedbackRepository extends JpaRepository<Feedback, Long>{
}
