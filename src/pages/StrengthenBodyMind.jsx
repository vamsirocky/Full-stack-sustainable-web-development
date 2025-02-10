import React, { useState } from "react";
import "../styles/global.css";
import StrengthenImage from "../assets/strengthen.jpg";
import axios from "axios";

const moodOptions = [
  {
    number: 5,
    face: "😡",
    description: "Feeling extremely overwhelmed, sad, or out of control.",
    action: "Seek immediate support, talk to someone, or practice deep breathing.",
    link: ""
  },
  {
    number: 4,
    face: "😠",
    description: "Feeling very angry, anxious, or upset with difficulty controlling emotions.",
    action: "Take a break, find a quiet space, or engage in physical movement.",
    link: ""
  },
  {
    number: 3,
    face: "😐",
    description: "Feeling upset, anxious, or stressed, with noticeable emotional intensity.",
    action: "Use grounding techniques like focused breathing, counting, or walking.",
    link: ""
  },
  {
    number: 2,
    face: "🙂",
    description: "Feeling slightly irritated, frustrated, or upset, but still in control.",
    action: "Take deep breaths, listen to music, or use positive self-talk.",
    link: ""
  },
  {
    number: 1,
    face: "😊",
    description: "Feeling calm, happy, relaxed, or peaceful.",
    action: "Stay engaged in pleasant activities like reading or talking with friends.",
    link: ""
  }
];

const Strengthen = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // ✅ FIXED FUNCTION NAME - Use the correct function reference
  const handleMoodSelect = async (mood) => {
    setSelectedMood(mood);
  
    try {
      const token = localStorage.getItem("token"); // Get JWT token
      const response = await axios.post(
        "http://localhost:5001/strengthen",
        {
          user_mood: mood.number,        // Store as an integer (1-5)
          user_mood_text: mood.description, // Store as a string
          clicked_suggestions: mood.action, // Store the selected suggestion
        },
        { headers: { Authorization: `Bearer ${token}` } } // Send JWT token
      );
  
      console.log("Mood Recorded Successfully:", response.data);
      setSuccessMessage("Mood recorded successfully!");
    } catch (error) {
      console.error("Error recording mood:", error.response?.data || error.message);
      setErrorMessage("Failed to record mood. Please try again.");
    }
  };
  

  return (
    <div className="strengthen-container">
      <h1 className="strengthen-title">Strengthen Body, Mind & Spirit</h1>
      <div className="strengthen-image-container">
        <img src={StrengthenImage} alt="Strengthen Body and Mind" className="strengthen-image" />
      </div>
      <p className="strengthen-question">Select your current mood to get motivation and support:</p>
      
      <div className="mood-scale">
        {moodOptions.map((mood) => (
          <button key={mood.number} className={selectedMood === mood ? "selected" : ""} 
            onClick={() => handleMoodSelect(mood)}> 
            {mood.face} {mood.number}
          </button>
        ))}
      </div>

      {selectedMood && (
        <div className="mood-result">
          <h3>Your Mood: {selectedMood.face} - {selectedMood.description}</h3>
          <p>Recommended Action: {selectedMood.action}</p>
          <a href={selectedMood.link} target="_blank" rel="noopener noreferrer" className="motivation-link">Get Support</a>
        </div>
      )}

      {/* ✅ Display messages correctly */}
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default Strengthen;
