// src/components/Footer.jsx
import React from "react";

const Footer = () => (
  <footer className="footer">
    <div className="footer-content">
      <div className="language-selector">
        <select>
          <option value="en">English (Ireland)</option>
        </select>
      </div>
      <p>© 2025 P.A.C.E System - All Rights Reserved</p>
      <div className="footer-links" style={{ marginTop: "10px" }}>
        <a href="/terms" style={{ margin: "0 10px" }}>Terms</a>
        <a href="/privacy-notice" style={{ margin: "0 10px" }}>Privacy Notice</a>
        <a href="/legal" style={{ margin: "0 10px" }}>Legal</a>
        <a href="/cookie-policy" style={{ margin: "0 10px" }}>Cookie Policy</a>
        <a href="/privacy-choices" style={{ margin: "0 10px" }}>Your Privacy Choices</a>
      </div>
    </div>
  </footer>
);

export default Footer;