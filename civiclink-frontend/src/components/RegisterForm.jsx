import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    aadharNumber: "",
    password: "",
    phone: "",
    gender: "",
    dateOfBirth: "",
    houseNumber: "",
    street: "",
    ward: "",
    village: "",
    pincode: "",
    occupation: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const formatAadhar = (value) => {
    const digits = value.replace(/\D/g, "");
    const parts = [];
    for (let i = 0; i < digits.length; i += 4) {
      parts.push(digits.slice(i, i + 4));
    }
    return parts.join("-");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedValue = value;

    if (name === "aadharNumber") {
      updatedValue = formatAadhar(value);
    }

    setFormData((prev) => ({ ...prev, [name]: updatedValue }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/residents/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        navigate("/",{
            state: {successMessage: "Registered successfully! Please login"}
            });
      } else {
        const data = await response.json();
        setErrorMessage(data.message || "Registration failed!");
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-100 p-4">
      <div className="bg-white rounded-2xl shadow-lg max-w-4xl w-full p-10">
        <h2 className="text-3xl font-bold text-zinc-800 mb-8 text-center">
          Create Your Account
        </h2>

        <form onSubmit={handleRegister} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
            minLength={3}
            className="px-4 py-3 rounded-lg border border-zinc-300 bg-zinc-50 placeholder-zinc-500 text-zinc-800 text-lg focus:outline-none focus:ring-2 focus:ring-zinc-400"
          />

          {/* Aadhar Number */}
          <input
            type="text"
            name="aadharNumber"
            placeholder="Aadhar Number (XXXX-XXXX-XXXX)"
            maxLength={14}
            value={formData.aadharNumber}
            onChange={handleChange}
            required
            pattern="\d{4}-\d{4}-\d{4}"
            className="px-4 py-3 rounded-lg border border-zinc-300 bg-zinc-50 placeholder-zinc-500 text-zinc-800 text-lg focus:outline-none focus:ring-2 focus:ring-zinc-400"
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password (min 6 characters)"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={6}
            className="px-4 py-3 rounded-lg border border-zinc-300 bg-zinc-50 placeholder-zinc-500 text-zinc-800 text-lg focus:outline-none focus:ring-2 focus:ring-zinc-400"
          />

          {/* Phone */}
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
            pattern="[6-9]\d{9}"
            maxLength={10}
            className="px-4 py-3 rounded-lg border border-zinc-300 bg-zinc-50 placeholder-zinc-500 text-zinc-800 text-lg focus:outline-none focus:ring-2 focus:ring-zinc-400"
          />

          {/* Gender */}
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            className="px-4 py-3 rounded-lg border border-zinc-300 bg-zinc-50 text-zinc-800 text-lg focus:outline-none focus:ring-2 focus:ring-zinc-400"
          >
            <option value="" disabled>
              Select Gender
            </option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>

          {/* Date of Birth */}
          <input
            type="date"
            name="dateOfBirth"
            placeholder="Date of Birth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
            className="px-4 py-3 rounded-lg border border-zinc-300 bg-zinc-50 text-zinc-800 text-lg focus:outline-none focus:ring-2 focus:ring-zinc-400"
          />

          {/* Address Fields */}
          <input
            type="text"
            name="houseNumber"
            placeholder="House Number"
            value={formData.houseNumber}
            onChange={handleChange}
            required
            className="px-4 py-3 rounded-lg border border-zinc-300 bg-zinc-50 text-zinc-800 text-lg focus:outline-none focus:ring-2 focus:ring-zinc-400"
          />
          <input
            type="text"
            name="street"
            placeholder="Street"
            value={formData.street}
            onChange={handleChange}
            required
            className="px-4 py-3 rounded-lg border border-zinc-300 bg-zinc-50 text-zinc-800 text-lg focus:outline-none focus:ring-2 focus:ring-zinc-400"
          />
          <input
            type="text"
            name="ward"
            placeholder="Ward"
            value={formData.ward}
            onChange={handleChange}
            required
            className="px-4 py-3 rounded-lg border border-zinc-300 bg-zinc-50 text-zinc-800 text-lg focus:outline-none focus:ring-2 focus:ring-zinc-400"
          />
          <input
            type="text"
            name="village"
            placeholder="Village"
            value={formData.village}
            onChange={handleChange}
            required
            className="px-4 py-3 rounded-lg border border-zinc-300 bg-zinc-50 text-zinc-800 text-lg focus:outline-none focus:ring-2 focus:ring-zinc-400"
          />
          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            value={formData.pincode}
            onChange={handleChange}
            required
            pattern="\d{6}"
            maxLength={6}
            className="px-4 py-3 rounded-lg border border-zinc-300 bg-zinc-50 text-zinc-800 text-lg focus:outline-none focus:ring-2 focus:ring-zinc-400"
          />
          <input
            type="text"
            name="occupation"
            placeholder="Occupation"
            value={formData.occupation}
            onChange={handleChange}
            required
            minLength={2}
            className="px-4 py-3 rounded-lg border border-zinc-300 bg-zinc-50 text-zinc-800 text-lg focus:outline-none focus:ring-2 focus:ring-zinc-400"
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="md:col-span-2 bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-4 rounded-xl transition duration-300"
          >
            Register
          </button>
        </form>

        {errorMessage && (
          <div className="mt-4 md:col-span-2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-sm">
            {errorMessage}
          </div>
        )}
      </div>
    </div>
  );
}
