import React from "react";
import "../styles/global.css";
import ServicesImage from "../assets/services.jpg";

const Services = () => (
  <div className="services-container">
    <h1 className="services-title">Our Sustainability Services</h1>
    <div className="services-image-container">
      <img src={ServicesImage} alt="Our Services" className="services-image" />
    </div>
    <div className="services-content">
      <p>
        Explore our sustainability services and take action! Whether it’s donating,
        volunteering, advocating for eco-friendly causes, or protecting wildlife, you can
        make a difference.
      </p>
    </div>
    <div className="services-grid">
      <div className="service-box">Donate & Buy</div>
      <div className="service-box">Volunteer & Lead</div>
      <div className="service-box">Advocate & Empower</div>
      <div className="service-box">Strengthen Body & Mind</div>
      <div className="service-box">Reuse, Reduce, Recycle</div>
      <div className="service-box">Protect Wildlife</div>
    </div>
  </div>
);

export default Services;