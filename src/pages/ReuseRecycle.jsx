import React, { useState } from "react";
import "../styles/global.css";
import ReuseReduceImage from "../assets/reuse-reduce.jpg";
import axios from "axios";

const ReuseReduce = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleDownloadClick = async () => {
    try {
      const token = localStorage.getItem("token"); // Get JWT token
  
      const requestData = {
        app_downloaded: true, // Ensure Boolean
        recycling_frequency: "Weekly", // Send as text, not number
        item_types: "Plastic, Glass, Paper" // Example data
      };
  
      console.log("Sending Request Data:", requestData); // Debugging log
  
      const response = await axios.post(
        "http://localhost:5001/reuse-reduce-recycle",
        requestData,
        { headers: { Authorization: `Bearer ${token}` } } // Send JWT token
      );
  
      console.log("Response Data:", response.data); // Debugging log
      setSuccessMessage(response.data.message);
    } catch (error) {
      console.error("Error recording app download:", error.response?.data || error.message);
      setErrorMessage("Failed to record activity. Please try again.");
    }
  };
  

  return (
    <div className="reuse-container">
      <h1 className="reuse-title">Reduce, Reuse, Recycle</h1>
      <div className="reuse-image-container">
        <img src={ReuseReduceImage} alt="Reuse and Reduce" className="reuse-image" />
      </div>
      <div className="reuse-content">
        <p>
          Every small action towards reducing waste makes a big impact! By reusing materials and
          recycling efficiently, we can create a sustainable future for generations to come.
          Learn how you can make a difference and contribute to a greener planet.
        </p>
        <h3>Get More Sustainability Insights!</h3>
        <p>
          Install the P.A.C.E Mobile App to explore more features, track your sustainability
          journey, and access exclusive tips on reducing waste.
        </p>
        <a
          href="https://play.google.com/store/apps"
          target="_blank"
          rel="noopener noreferrer"
          className="app-download-button"
          onClick={handleDownloadClick}
        >
          Download the P.A.C.E App
        </a>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default ReuseReduce;
