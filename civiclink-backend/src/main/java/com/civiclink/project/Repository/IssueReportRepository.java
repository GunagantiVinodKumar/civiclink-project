package com.civiclink.project.Repository;

import com.civiclink.project.Entity.IssueReport;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface IssueReportRepository extends JpaRepository<IssueReport, Long> {
    List<IssueReport> findAllByOrderByReportedAtDesc();
}
