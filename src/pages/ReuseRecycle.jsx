import React from "react";
import "../styles/global.css";
import ReuseReduceImage from "../assets/reuse-reduce.jpg";

const ReuseReduce = () => (
  <div className="reuse-container">
    <h1 className="reuse-title">Reduce, Reuse, Recycle</h1>
    <div className="reuse-image-container">
      <img src={ReuseReduceImage} alt="Reuse and Reduce" className="reuse-image" />
    </div>
    <div className="reuse-content">
      <p>
        Every small action towards reducing waste makes a big impact! By reusing materials and
        recycling efficiently, we can create a sustainable future for generations to come.
        Learn how you can make a difference and contribute to a greener planet.
      </p>
      <h3>Get More Sustainability Insights!</h3>
      <p>
        Install the P.A.C.E Mobile App to explore more features, track your sustainability
        journey, and access exclusive tips on reducing waste.
      </p>
      <a href="https://play.google.com/store/apps" target="_blank" rel="noopener noreferrer" className="app-download-button">
        Download the P.A.C.E App
      </a>
    </div>
  </div>
);

export default ReuseReduce;