import React, { useEffect, useState } from "react";
import axios from "axios";

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    const fetchLeaders = async () => {
      try {
        const response = await axios.get("http://localhost:5001/leaderboard/top5");
        setLeaders(response.data);
      } catch (err) {
        console.error("Error fetching leaderboard:", err);
      }
    };
  
    fetchLeaders();
  }, []);
  

  return (
    <div className="leaderboard-container">
      <h1 className="leaderboard-title">🏆 Leaderboard 🏆</h1>
      {leaders.length === 0 ? (
        <p className="no-data-message">No data available. Start participating to appear on the leaderboard!</p>
      ) : (
        <ul className="leaderboard-list">
          {leaders.map((user, index) => (
            <li key={index} className="leaderboard-item">
              <div className="rank-container">
                <span className="rank">#{index + 1}</span>
              </div>
              <span className="username">{user.name}</span>
              <div className="progress-bar-container">
                <div className="progress-bar" style={{ width: `${user.normalized_score}%` }}></div>
              </div>
              <span className="score">
  {isNaN(user.normalized_score) ? "0%" : `${Math.round(user.normalized_score)}%`}
</span>

            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Leaderboard;
