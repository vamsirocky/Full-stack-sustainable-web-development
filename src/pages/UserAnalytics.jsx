import React from "react";
import "../styles/global.css";
import UserAnalyticsImage from "../assets/user-analytics.jpg";

const UserAnalytics = () => (
  <div className="user-analytics-container">
    <h1 className="user-analytics-title">User Analytics</h1>
    <div className="user-analytics-image-container">
      <img src={UserAnalyticsImage} alt="User Analytics Overview" className="user-analytics-image" />
    </div>
    <div className="user-analytics-content">
      <p>
        Track your sustainability journey with detailed insights on your impact. 
        See your progress in different activities, including donations, volunteering, and eco-friendly actions.
      </p>
    </div>
    <div className="user-analytics-buttons">
      <button>Donate & Buy</button>
      <button>Volunteer & Lead</button>
      <button>Advocate & Empower</button>
      <button>Strengthen Body & Mind</button>
      <button>Reuse, Reduce, Recycle</button>
      <button>Protect Wildlife</button>
    </div>
    <div className="progress-bar">Overall Progress Bar</div>
  </div>
);

export default UserAnalytics;
