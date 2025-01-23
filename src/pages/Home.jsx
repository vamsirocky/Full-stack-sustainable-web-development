import React from "react";
import "../styles/global.css";
import HomeImage from "../assets/home-hero.jpg";

const Home = () => (
  <div className="home-container">
    <div className="home-content">
      <h1>Join the Movement for a Sustainable Future</h1>
      <p>
        Support sustainability initiatives, empower communities, and make a difference.
        Join us in creating a greener, healthier planet for future generations.
      </p>
      <button className="cta-button">Get Involved</button>
    </div>
    <div className="home-image-container">
      <img src={HomeImage} alt="Sustainability Movement" className="home-image" />
    </div>
  </div>
);

export default Home;