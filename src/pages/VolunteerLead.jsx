import React from "react";
import "../styles/global.css";
import VolunteerImage from "../assets/volunteer.jpg";

const events = [
  { name: "Tree Plantation Drive", link: "https://forms.gle/MLoTg12GK2DDBwfUA" },
  { name: "Community Cleanup", link: "https://forms.gle/MLoTg12GK2DDBwfUA" },
  { name: "Wildlife Conservation Program", link: "https://forms.gle/MLoTg12GK2DDBwfUA" },
  { name: "Eco-Friendly Awareness Campaign", link: "https://forms.gle/MLoTg12GK2DDBwfUA" }
  // { name: "Sustainability Workshop", link: "https://docs.google.com/forms/d/e/1FAIpQLSf..." },
 
];

const VolunteerLead = () => (
  <div className="volunteer-container">
    <h1 className="volunteer-title">Volunteer & Lead</h1>
    <div className="volunteer-image-container">
      <img src={VolunteerImage} alt="Volunteer Events" className="volunteer-image" />
    </div>
    <div className="volunteer-content">
      <p>Join upcoming sustainability events and make a difference in your community.</p>
    </div>
    <div className="volunteer-grid">
      {events.map((event, index) => (
        <div key={index} className="event-box">
          <h3>{event.name}</h3>
          <a href={event.link} target="_blank" rel="noopener noreferrer">
            <button className="join-button">Join</button>
          </a>
        </div>
      ))}
    </div>
  </div>
);

export default VolunteerLead;