import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Feedback() {
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!feedback.trim()) return;

    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/api/feedback/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ feedback }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      if (!data || data.score === undefined) {
        throw new Error("Invalid response from backend");
      }

      navigate("/feedback/result", { state: { result: data } });
    } catch (err) {
      console.error("Error analyzing sentiment:", err);
      alert("Failed to submit feedback. Please check backend and try again.");
    }
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Share Your Feedback</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <textarea
          rows="4"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Type your feedback here..."
          style={styles.textarea}
        />
        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? "Analyzing..." : "Submit Feedback"}
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: "#f4f6f8",
    padding: "2rem",
    minHeight: "100vh",
    fontFamily: "Segoe UI, sans-serif",
    color: "#222",
  },
  heading: {
    fontSize: "24px",
    marginBottom: "1rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  textarea: {
    resize: "none",
    padding: "1rem",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontSize: "16px",
    marginBottom: "1rem",
    backgroundColor: "#fff",
    color: "#000",
  },
  button: {
    padding: "0.75rem 1.5rem",
    fontSize: "16px",
    backgroundColor: "#007bff",
    border: "none",
    borderRadius: "6px",
    color: "#fff",
    cursor: "pointer",
    alignSelf: "flex-start",
  },
};

export default Feedback;
