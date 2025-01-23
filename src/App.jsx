import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import UserAnalytics from "./pages/UserAnalytics";
import Leaderboard from "./pages/Leaderboard";
import ContactUs from "./pages/ContactUs";
import DonateBuy from "./pages/DonateBuy";
import VolunteerLead from "./pages/VolunteerLead";
import AdvocateEmpower from "./pages/AdvocateEmpower";
import ReuseRecycle from "./pages/ReuseRecycle";
import StrengthenBodyMind from "./pages/StrengthenBodyMind";
import ProtectWildLife from "./pages/ProtectWildLife";
import AboutUs from "./pages/AboutUs";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import './styles/global.css';
import Services from "./pages/Services";


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      {isAuthenticated ? (
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/user-analytics" element={<UserAnalytics />} />
            <Route path="/dashboard/Leaderboard" element={<Leaderboard />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/donate-buy" element={<DonateBuy />} />
            <Route path="/volunteer-lead" element={<VolunteerLead />} />
            <Route path="/advocate-empower" element={<AdvocateEmpower />} />
            <Route path="/reuse-recycle" element={<ReuseRecycle />} />
            <Route path="/strengthen-body-mind" element={<StrengthenBodyMind />} />
            <Route path="/protect-wildlife" element={<ProtectWildLife />} />
          </Routes>
        </>
      ) : (
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </Router>
  );
};

export default App;