import React, { useState } from "react";
import "../styles/global.css";
import VolunteerImage from "../assets/volunteer.jpg";
import axios from "axios";

const events = [
  { name: "Tree Plantation Drive", date: "2025-02-10" },
  { name: "Community Cleanup", date: "2025-02-15" },
  { name: "Wildlife Conservation Program", date: "2025-02-20" },
  { name: "Eco-Friendly Awareness Campaign", date: "2025-02-25" },
];

const VolunteerLead = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", user_age: "", user_gender: "" });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegister = (eventName, eventDate) => {
    setSelectedEvent({ name: eventName, date: eventDate });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    // Debugging: Check form data before sending request
    console.log("Form Data Before Submission:", formData);

    if (!formData.name || !formData.email || !formData.user_age || !formData.user_gender || !selectedEvent?.name || !selectedEvent?.date) {
      setErrorMessage("All fields are required.");
      return;
    }

    try {
      const token = localStorage.getItem("token"); // Get JWT token
      const response = await axios.post(
        "http://localhost:5001/volunteer",
        {
          email: formData.email,
          name: formData.name,
          event_name: selectedEvent.name,
          event_date: selectedEvent.date,
          user_age: formData.user_age,
          user_gender: formData.user_gender,
        },
        { headers: { Authorization: `Bearer ${token}` } } // Send JWT token
      );

      console.log("Registration Success:", response.data);
      setSuccessMessage(response.data.message);
      setSelectedEvent(null);
      setFormData({ name: "", email: "", user_age: "", user_gender: "" });
    } catch (error) {
      console.error("Registration Error:", error.response?.data || error.message);
      setErrorMessage(error.response?.data?.error || "Failed to register. Please try again.");
    }
  };

  return (
    <div className="volunteer-container">
      <h1 className="volunteer-title">Volunteer & Lead</h1>
      <div className="volunteer-image-container">
        <img src={VolunteerImage} alt="Volunteer Events" className="volunteer-image" />
      </div>
      <div className="volunteer-content">
        <p>Join upcoming sustainability events and make a difference in your community.</p>
      </div>
      <div className="volunteer-grid">
        {events.map((event, index) => (
          <div key={index} className="event-box">
            <h3>{event.name}</h3>
            <button className="join-button" onClick={() => handleRegister(event.name, event.date)}>
              Join
            </button>
          </div>
        ))}
      </div>

      {selectedEvent && (
        <div className="registration-form">
          <h2>Register for {selectedEvent.name}</h2>
          <form onSubmit={handleSubmit}>
            <label>Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />

            <label>Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />

            <label>Age:</label>
            <input type="number" name="user_age" value={formData.user_age} onChange={handleChange} required />

            <label>Gender:</label>
            <select name="user_gender" value={formData.user_gender} onChange={handleChange} required>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>

            <button type="submit">Submit</button>
          </form>
          {successMessage && <p className="success-message">{successMessage}</p>}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
      )}
    </div>
  );
};

export default VolunteerLead;
