import React, { useState } from "react";
import {jwtDecode}
 from "jwt-decode";
import { useAuth } from "../components/AuthContext";

function ReportIssue() {
    const { token } = useAuth();
      const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "",
        ward: "",
      });
      const [message, setMessage] = useState("");

      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        const aadhar = jwtDecode(token).sub;

        try {
          const response = await fetch("http://localhost:8080/api/issues", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
              aadhar: aadhar,
            },
            body: JSON.stringify(formData),
          });

          const text = await response.text();
          setMessage(text);
          setFormData({ title: "", description: "", category: "", ward: "" });
        } catch (error) {
          console.error("Error reporting issue:", error);
          setMessage("Failed to report issue.");
        }
      };

      return (
        <div className="p-4 max-w-xl mx-auto">
          <h2 className="text-xl font-bold mb-4">Report an Issue</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input name="title" value={formData.title} onChange={handleChange} placeholder="Title" required className="w-full border p-2 rounded" />
            <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" required className="w-full border p-2 rounded" />
            <input name="category" value={formData.category} onChange={handleChange} placeholder="Category" required className="w-full border p-2 rounded" />
            <input name="ward" value={formData.ward} onChange={handleChange} placeholder="Ward" required className="w-full border p-2 rounded" />
            <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">Submit</button>
          </form>
          {message && <p className="mt-4 text-green-600 font-medium">{message}</p>}
        </div>
      );
}
export default ReportIssue;
