// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/PACE_Logo.png";

const Navbar = () => (
  <nav>
    <ul>
      <li><img src={Logo} alt="PACE Logo" className="logo" /></li>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/services">Services</Link>
        <ul className="dropdown">
          <li><Link to="/donate-buy">Donate & Buy</Link></li>
          <li><Link to="/volunteer-lead">Volunteer & Lead</Link></li>
          <li><Link to="/advocate-empower">Advocate & Empower</Link></li>
          <li><Link to="/strengthen-body-mind">Strengthen Body & Mind</Link></li>
          <li><Link to="/reuse-recycle">Reuse, Reduce, Recycle</Link></li>
          <li><Link to="/protect-wildlife">Protect Wildlife</Link></li>
        </ul>
      </li>
      
      <li><Link to="/dashboard">Dashboard</Link>
        <ul className="dropdown">
          <li><Link to="/dashboard/user-analytics">User Analytics</Link></li>
          <li><Link to="/dashboard/leaderboard">Leaderboard</Link></li>
        </ul>
      </li>
      <li><Link to="/aboutus">About Us</Link></li>
      <li><Link to="/contact-us">Contact Us</Link></li>
    </ul>
  </nav>
);

export default Navbar;
