import React, { useState } from "react";
import "../styles/global.css";
// import DonationImage from "../assets/donation.jpg";

const Donate = () => {
  const [donationAmount, setDonationAmount] = useState(50);
  const [customAmount, setCustomAmount] = useState("");
  const [tipPercentage, setTipPercentage] = useState(18);
  const [paymentMethod, setPaymentMethod] = useState("paypal");

  return (
    <div className="donation-container">
      <h1 className="donation-title">Make a Difference with Your Donation</h1>
      <div className="donation-image-container">
        {/* <img src={DonationImage} alt="Donation Page" className="donation-image" /> */}
      </div>
      <div className="donation-section">
        <h2>Enter Your Donation</h2>
        <div className="donation-buttons">
          {[50, 100, 200, 300, 500, 1000].map((amount) => (
            <button
              key={amount}
              className={donationAmount === amount ? "selected" : ""}
              onClick={() => setDonationAmount(amount)}
            >
            €{amount}
            </button>
          ))}
        </div>
        <input
          type="number"
          placeholder="Custom Amount (€)"
          value={customAmount}
          onChange={(e) => setCustomAmount(e.target.value)}
        />
      </div>
      <div className="tip-section">
        {/* <h3>Tip for Platform Services</h3>
        <input
          type="range"
          min="0"
          max="50"
          value={tipPercentage}
          onChange={(e) => setTipPercentage(e.target.value)}
        /> */}
        {/* <span>{tipPercentage}%</span> */}
      </div>
      <div className="payment-section">
        <h3>Payment Method</h3>
        <div className="payment-options">
          <label>
            <input
              type="radio"
              name="payment"
              value="paypal"
              checked={paymentMethod === "paypal"}
              onChange={() => setPaymentMethod("paypal")}
            />
            PayPal
          </label>
          <label>
            <input
              type="radio"
              name="payment"
              value="googlepay"
              checked={paymentMethod === "googlepay"}
              onChange={() => setPaymentMethod("googlepay")}
            />
            Google Pay
          </label>
          <label>
            <input
              type="radio"
              name="payment"
              value="credit"
              checked={paymentMethod === "credit"}
              onChange={() => setPaymentMethod("credit")}
            />
            Credit/Debit Card
          </label>
        </div>
      </div>
      <button className="donate-button">Donate Now</button>
    </div>
  );
};

export default Donate;