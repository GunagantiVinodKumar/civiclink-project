import React, { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../components/AuthContext";
import { useNavigate } from "react-router-dom";

function ReportIssue() {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    ward: "",
    image: null,
    video: null,
    audio: null,
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { sub: aadhar, name } = jwtDecode(token);

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) formDataToSend.append(key, value);
    });

    try {
      const response = await fetch("http://localhost:8080/api/issues", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          aadhar: aadhar,
        },
        body: formDataToSend,
      });

      const text = await response.text();
      setMessage(`✅ Thank you, ${name}, for reporting the issue!`);
      setFormData({
        title: "",
        description: "",
        category: "",
        ward: "",
        image: null,
        video: null,
        audio: null,
      });

      // ✅ Navigate to feedback after 1 second
      setTimeout(() => {
        navigate("/feedback");
      }, 1000);
    } catch (error) {
      console.error("Error reporting issue:", error);
      setMessage("❌ Failed to report issue.");
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Report an Issue</h2>
      <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
        <input name="title" value={formData.title} onChange={handleChange} placeholder="Title" required className="w-full border p-2 rounded" />
        <input name="category" value={formData.category} onChange={handleChange} placeholder="Category" required className="w-full border p-2 rounded" />
        <input name="ward" value={formData.ward} onChange={handleChange} placeholder="Ward" required className="w-full border p-2 rounded" />
        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" required className="w-full border p-2 rounded" />
        <div className="flex flex-col gap-2">
          <label>Attach Image: <input type="file" name="image" accept="image/*" onChange={handleChange} /></label>
          <label>Attach Video: <input type="file" name="video" accept="video/*" onChange={handleChange} /></label>
          <label>Attach Audio: <input type="file" name="audio" accept="audio/*" onChange={handleChange} /></label>
        </div>
        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">Submit</button>
      </form>
      {message && <p className="mt-4 text-green-600 font-medium">{message}</p>}
    </div>
  );
}

export default ReportIssue;
