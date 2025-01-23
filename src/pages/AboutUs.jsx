import React from "react";
import "../styles/global.css";
import AboutUsImage from "../assets/about-us.jpg";

const AboutUs = () => (
  <div className="about-container">
    <h1 className="about-title">About P.A.C.E</h1>
    <div className="about-image-container">
      <img src={AboutUsImage} alt="About Us" className="about-image" />
    </div>
    <div className="about-content">
      <p>
        There’s a part of every one of us that dreams of a better world. That spark of inspiration
        to help a person, fix a neighborhood, or even change a nation. At P.A.C.E, we empower
        both individuals and communities to turn sustainability into action. Because that is how
        change happens.
      </p>
      <p>
        With sustainability for all, we are creating a movement where individuals, organizations,
        and nonprofits can champion causes that matter and make a lasting difference. Through
        P.A.C.E, people and groups have the tools they need to share their sustainability efforts
        and harness the power of collective action. We are transforming the way people engage
        with the environment—are you ready to join us?
      </p>
    </div>
  </div>
);

export default AboutUs;