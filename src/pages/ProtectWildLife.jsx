import React from "react";
import "../styles/global.css";
import WildlifeImage from "../assets/wildlife.jpg";

const ProtectWildlife = () => (
  <div className="wildlife-container">
    <h1 className="wildlife-title">Protect Wildlife</h1>
    <div className="wildlife-image-container">
      <img src={WildlifeImage} alt="Protect Wildlife" className="wildlife-image" />
    </div>
    <div className="wildlife-content">
      <p>
        Wildlife conservation is essential to maintaining biodiversity and preserving natural habitats.
        Our actions today determine the future of countless species and ecosystems. 
        Join us in our mission to protect and nurture wildlife for generations to come.
      </p>
      <p>
        Small actions make a big difference! Reduce pollution, support sustainable practices, 
        and advocate for stronger environmental protection laws.
      </p>
    </div>
  </div>
);

export default ProtectWildlife;