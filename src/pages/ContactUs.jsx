import React from "react";
import "../styles/global.css";

const ContactUs = () => (
  <div className="contact-container">
    <h1>Contact Us</h1>
    <form className="contact-form">
      <label>Name:</label>
      <input type="text" name="name" required />
      
      <label>Email:</label>
      <input type="email" name="email" required />
      
      <label>Contact Number:</label>
      <input type="tel" name="contact" pattern="[0-9]{10}" required />
      
      <label>Message:</label>
      <textarea name="message" required></textarea>
      
      <button type="submit">Submit</button>
    </form>
  </div>
);

export default ContactUs;
