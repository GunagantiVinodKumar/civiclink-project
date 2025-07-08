import React, { useEffect, useState } from "react";
import { useAuth } from "../components/AuthContext";
import { jwtDecode } from "jwt-decode";

const MyReports = () => {
  const { token } = useAuth();
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    const aadhar = jwtDecode(token).sub;
    console.log("MyReports - Aadhar used:", aadhar); // ✅ Move inside useEffect

    fetch(`http://localhost:8080/api/issues/by-aadhar/${aadhar}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched issues:", data); // ✅ log response
        setIssues(Array.isArray(data) ? data : []);
      })
      .catch((err) => console.error("Failed to load issues", err));
  }, [token]);

  const getFileUrl = (fullPath) => {
    if (!fullPath) return null;
    const parts = fullPath.split("/");
    return `http://localhost:8080/issues/${parts[parts.length - 1]}`;
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">My Reported Issues</h2>
      {issues.length === 0 ? (
        <p>No issues reported yet.</p>
      ) : (
        issues.map((issue) => (
          <div
            key={issue.id}
            className="mb-6 p-4 border rounded shadow-sm bg-white"
          >
            <h3 className="text-xl font-semibold">{issue.title}</h3>
            <p><strong>Category:</strong> {issue.category}</p>
            <p><strong>Ward:</strong> {issue.ward}</p>
            <p><strong>Status:</strong> {issue.status}</p>
            <p><strong>Description:</strong> {issue.description}</p>

            {issue.imagePath && (
              <div className="mt-2">
                <p className="font-medium">Attached Image:</p>
                <img
                  src={getFileUrl(issue.imagePath)}
                  alt="Issue"
                  className="w-64 mt-1 rounded border"
                />
              </div>
            )}

            {issue.videoPath && (
              <div className="mt-2">
                <p className="font-medium">Attached Video:</p>
                <video
                  controls
                  src={getFileUrl(issue.videoPath)}
                  className="w-64 mt-1 rounded border"
                />
              </div>
            )}

            {issue.audioPath && (
              <div className="mt-2">
                <p className="font-medium">Attached Audio:</p>
                <audio
                  controls
                  src={getFileUrl(issue.audioPath)}
                  className="mt-1"
                />
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default MyReports;
