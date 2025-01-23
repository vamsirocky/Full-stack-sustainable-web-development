import React from "react";
import "../styles/global.css";
// import LeaderboardImage from "../assets/leaderboard.jpg";

const Leaderboard = () => {
  const topContributors = [
    { rank: 1, username: "User1", progress: 80 },
    { rank: 2, username: "User2", progress: 75 },
    { rank: 3, username: "User3", progress: 70 },
    { rank: 4, username: "User4", progress: 65 },
    { rank: 5, username: "User5", progress: 60 },
  ];

  return (
    <div className="leaderboard-container">
      <h1 className="leaderboard-title">Leaderboard</h1>
      <div className="leaderboard-image-container">
        {/* <img src={LeaderboardImage} alt="Leaderboard Overview" className="leaderboard-image" /> */}
      </div>
      <ul className="leaderboard-list">
        {topContributors.map((user) => (
          <li key={user.rank} className="leaderboard-item">
            <span className="rank">#{user.rank}</span>
            <span className="username">{user.username}</span>
            <div className="progress-bar-container">
              <div className="progress-bar" style={{ width: `${user.progress}%` }}>
                {user.progress}%
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;