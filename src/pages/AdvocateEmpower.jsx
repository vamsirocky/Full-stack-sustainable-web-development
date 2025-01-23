import React, { useState } from "react";
import "../styles/global.css";
import NPSImage from "../assets/nps.jpg";

const AdvocateEmpower = () => {
  const [score, setScore] = useState(null);
  const [responses, setResponses] = useState([]);

  const handleScoreClick = (selectedScore) => {
    setScore(selectedScore);
    setResponses([...responses, selectedScore]);
  };

  const calculateNPS = () => {
    const promoters = responses.filter((s) => s >= 9).length;
    const passives = responses.filter((s) => s >= 7 && s <= 8).length;
    const detractors = responses.filter((s) => s <= 6).length;
    const totalResponses = responses.length;

    if (totalResponses === 0) return 0;
    return Math.round(((promoters - detractors) / totalResponses) * 100);
  };

  return (
    <div className="nps-container">
      <h1 className="nps-title">Advocate & Empower</h1>
      <div className="nps-image-container">
        <img src={NPSImage} alt="Net Promoter Score" className="nps-image" />
      </div>
      <p className="nps-question">On a scale of 0-10, how likely are you to support this initiative to help the cause?</p>
      <div className="nps-scale">
        {[...Array(11).keys()].map((num) => (
          <button key={num} className={score === num ? "selected" : ""} onClick={() => handleScoreClick(num)}>
            {num}
          </button>
        ))}
      </div>
      <div className="nps-result">
        <h3>Net Promoter Score (NPS): {calculateNPS()}</h3>
        <p>Promoters (9-10), Passives (7-8), Detractors (0-6)</p>
      </div>
    </div>
  );
};

export default AdvocateEmpower;