import React, { useState } from "react";
import "../styles/global.css";
import NPSImage from "../assets/nps.jpg";
import axios from "axios";

const AdvocateEmpower = () => {
  const [score, setScore] = useState(null);
  const [submitted, setSubmitted] = useState(false); // Track submission status
  const [errorMessage, setErrorMessage] = useState("");

  const handleScoreClick = async (selectedScore) => {
    setScore(selectedScore);

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5001/advocate-empower",
        { score: selectedScore },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSubmitted(true); // Show thank you message after submission
    } catch (error) {
      console.error("Error submitting response:", error.response?.data || error.message);
      setErrorMessage("Failed to submit response. Try again.");
    }
  };

  return (
    <div className="nps-container">
      <h1 className="nps-title">Advocate & Empower</h1>
      <div className="nps-image-container">
        <img src={NPSImage} alt="Net Promoter Score" className="nps-image" />
      </div>

      {!submitted ? (
        <>
          <p className="nps-question">On a scale of 0-10, how likely are you to support this initiative to help the cause?</p>
          <div className="nps-scale">
            {[...Array(11).keys()].map((num) => (
              <button key={num} className={score === num ? "selected" : ""} onClick={() => handleScoreClick(num)}>
                {num}
              </button>
            ))}
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </>
      ) : (
        <div className="thank-you-message">
          <h3>Thank you for your response!</h3>
          <p>Your feedback helps us improve our sustainability initiatives.</p>
        </div>
      )}
    </div>
  );
};

export default AdvocateEmpower;
