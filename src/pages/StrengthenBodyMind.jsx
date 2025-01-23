import React, { useState } from "react";
import "../styles/global.css";
import StrengthenImage from "../assets/strengthen.jpg";

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

  return (
    <div className="strengthen-container">
      <h1 className="strengthen-title">Strengthen Body & Mind</h1>
      <div className="strengthen-image-container">
        <img src={StrengthenImage} alt="Strengthen Body and Mind" className="strengthen-image" />
      </div>
      <p className="strengthen-question">Select your current mood to get motivation and support:</p>
      <div className="mood-scale">
        {moodOptions.map((mood) => (
          <button key={mood.number} className={selectedMood === mood ? "selected" : ""} onClick={() => setSelectedMood(mood)}>
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
    </div>
  );
};

export default Strengthen;