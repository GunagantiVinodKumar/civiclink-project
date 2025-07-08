import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const getSentimentLabel = (score) => {
  if (score <= -0.6) return "Very Negative 😠";
  if (score < -0.1) return "Negative 🙁";
  if (score <= 0.1) return "Neutral 😐";
  if (score < 0.6) return "Positive 🙂";
  return "Very Positive 😄";
};

function FeedbackResult() {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state?.result;

  if (!result) {
    return (
      <div style={styles.container}>
        <h2>Oops! No result found.</h2>
        <button onClick={() => navigate("/feedback")} style={styles.button}>
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>🎉 Thank you for your feedback!</h2>
      <div style={styles.card}>
        <p><strong>Interpretation:</strong> {getSentimentLabel(result.score)}</p>
        <p><strong>Raw Score:</strong> {result.score}</p>
        <button onClick={() => navigate("/")} style={styles.button}>Go Home</button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: "#f9f9f9",
    minHeight: "100vh",
    padding: "2rem",
    fontFamily: "Segoe UI, sans-serif",
    color: "#222",
  },
  heading: {
    fontSize: "24px",
    marginBottom: "1rem",
  },
  card: {
    backgroundColor: "#e6f7ff",
    border: "1px solid #91d5ff",
    padding: "1.5rem",
    borderRadius: "8px",
  },
  button: {
    marginTop: "1rem",
    padding: "0.5rem 1rem",
    backgroundColor: "#007bff",
    border: "none",
    borderRadius: "6px",
    color: "#fff",
    cursor: "pointer",
  }
};

export default FeedbackResult;
