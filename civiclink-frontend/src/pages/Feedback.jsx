import React, { useState } from "react";

function Feedback() {
  const [feedback, setFeedback] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const getSentimentLabel = (score) => {
    if (score <= -0.6) return "Very Negative 😠";
    if (score < -0.1) return "Negative 🙁";
    if (score <= 0.1) return "Neutral 😐";
    if (score < 0.6) return "Positive 🙂";
    return "Very Positive 😄";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!feedback.trim()) return;

    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/api/feedback/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ feedback }),
      });

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error("Error analyzing sentiment:", err);
      setResult({ sentiment: "error", score: "N/A" });
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

      {result && (
        <div style={styles.resultBox}>
          <h4 style={styles.resultLabel}>Result:</h4>
          <p><strong>Interpretation:</strong> {getSentimentLabel(result.score)}</p>
          <p><strong>Raw Score:</strong> {result.score}</p>
        </div>
      )}
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
  resultBox: {
    marginTop: "1.5rem",
    padding: "1rem",
    backgroundColor: "#e2f0d9",
    borderRadius: "6px",
    border: "1px solid #b2d8b2",
  },
  resultLabel: {
    marginBottom: "0.5rem",
    fontSize: "18px",
    fontWeight: "bold",
  },
};

export default Feedback;
