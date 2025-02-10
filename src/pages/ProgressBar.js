import React, { useEffect, useState } from "react";
import axios from "axios";

const ProgressBar = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5001/leaderboard/user-score", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setProgress(response.data.totalScore);
      } catch (err) {
        console.error("Error fetching progress:", err);
      }
    };

    fetchProgress();
  }, []);

  return (
    <div className="progress-container">
      <h2>Overall Progress</h2>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }}>
          {Math.round(progress)}%
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
