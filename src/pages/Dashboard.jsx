import React from "react";
import "../styles/global.css";
import DashboardImage from "../assets/dashboard.jpg";

const Dashboard = () => (
  <div className="dashboard-container">
    <h1 className="dashboard-title">Dashboard</h1>
    <div className="dashboard-image-container">
      <img src={DashboardImage} alt="Dashboard Overview" className="dashboard-image" />
    </div>
    <div className="dashboard-content">
      <p>
        Welcome to your sustainability dashboard! Here, you can track your progress, view
        analytics, and see how you rank among other contributors. Stay engaged and make a
        difference.
      </p>
    </div>
  </div>
);

export default Dashboard;