import React, { useState, useEffect } from "react";
import "../styles/global.css"; // ✅ Import CSS
import axios from "axios";

const UserAnalytics = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchAllData = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("User not logged in");

      const response = await axios.get("http://localhost:5001/analytics/all", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setData(response.data);
    } catch (err) {
      console.error("Error fetching analytics data:", err.response?.data || err.message);
      setError("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  return (
    <div className="user-analytics-container">
      <h1 className="user-analytics-title">User Analytics Dashboard</h1>

      {loading && <p className="loading-message">Loading...</p>}
      {error && <p className="error-message">{error}</p>}

      {data && (
        <div className="analytics-grid">
          {/* Donations & Purchases */}
          <div className="analytics-card">
            <h2>Donations & Purchases</h2>
            <ul>
              {data.donateBuy.length ? (
                data.donateBuy.map((item, index) => (
                  <li key={index}>
                    <strong>Amount:</strong> {item.donation_amount} | 
                    <strong> Transaction:</strong> {item.transaction_id}
                  </li>
                ))
              ) : (
                <p>No donations recorded.</p>
              )}
            </ul>
          </div>

          {/* Volunteer Activities */}
          <div className="analytics-card">
            <h2>Volunteer Activities</h2>
            <ul>
              {data.volunteerLead.length ? (
                data.volunteerLead.map((event, index) => (
                  <li key={index}>
                    <strong>Event:</strong> {event.event_name} | 
                    <strong> Date:</strong> {new Date(event.event_date).toLocaleDateString()}
                  </li>
                ))
              ) : (
                <p>No volunteer records found.</p>
              )}
            </ul>
          </div>

          {/* Advocacy Responses */}
          <div className="analytics-card">
            <h2>Advocacy Responses</h2>
            <p><strong>Net Promoter Score (NPS):</strong> {data.nps}</p>
            <p><strong>User Classification:</strong> {data.classification}</p>
            <ul>
              {data.advocateEmpower.length ? (
                data.advocateEmpower.map((response, index) => (
                  <li key={index}>
                    <strong>Response Score:</strong> {response.user_response} | 
                    <strong> Date:</strong> {new Date(response.response_date).toLocaleDateString()}
                  </li>
                ))
              ) : (
                <p>No responses recorded.</p>
              )}
            </ul>
          </div>

          {/* Mood Tracking */}
          <div className="analytics-card">
            <h2>Mood Tracking</h2>
            <ul>
              {data.strengthenBodyMindSpirit.length ? (
                data.strengthenBodyMindSpirit.map((mood, index) => (
                  <li key={index}>
                    <strong>Mood:</strong> {mood.user_mood_text} | 
                    <strong> Suggestion:</strong> {mood.clicked_suggestions}
                  </li>
                ))
              ) : (
                <p>No mood entries found.</p>
              )}
            </ul>
          </div>

          {/* Recycling Data */}
          <div className="analytics-card">
            <h2>Recycling Data</h2>
            <ul>
              {data.reuseReduceRecycle.length ? (
                data.reuseReduceRecycle.map((recycle, index) => (
                  <li key={index}>
                    <strong>Recycling Frequency:</strong> {recycle.recycling_frequency} | 
                    <strong> Items:</strong> {recycle.item_types}
                  </li>
                ))
              ) : (
                <p>No recycling data recorded.</p>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserAnalytics;
