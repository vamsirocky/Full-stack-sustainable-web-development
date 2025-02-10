import React, { useState } from "react";
import axios from "axios";
import "../styles/global.css";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    message: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await axios.post("http://localhost:5001/send-email", formData);
      setSuccessMessage(response.data.message);
      setFormData({ firstName: "", lastName: "", email: "", phoneNumber: "", message: "" });
    } catch (error) {
      console.error("Error sending email:", error.response?.data || error.message);
      setErrorMessage(error.response?.data?.error || "Failed to send message. Please try again.");
    }
  };

  return (
    <div className="contact-container">
      <h1>Get in Touch</h1>
      <p>Here to Help</p>
      <form className="contact-form" onSubmit={handleSubmit}>
        <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
        <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="tel" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} required />
        <textarea name="message" placeholder="What do you have in mind?" value={formData.message} onChange={handleChange} required></textarea>
        <button type="submit">Submit</button>
      </form>

      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default ContactUs;
