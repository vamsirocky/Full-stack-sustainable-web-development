import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

// Load Stripe with Public Key
const stripePromise = loadStripe("pk_live_51QoCOxP4doiHxdjgFp25TLqCau7NOYYKfSeWXEkMlIYESrDdkFQ4gp6AP6AhfQSUVBEnAdOT2Ui6vLRhQpWS05WF00epSkgHN7"); 

const Donate = () => {
  const [donationAmount, setDonationAmount] = useState(50);
  const [customAmount, setCustomAmount] = useState("");
  const [itemDetails, setItemDetails] = useState("");
  const [userId] = useState(3); // Replace with dynamic user ID from auth

  return (
    <Elements stripe={stripePromise}>
      <div className="donation-container">
        <h1 className="donation-title">Make a Difference with Your Donation</h1>

        {/* Donation Amount Selection */}
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
          <input
            type="text"
            placeholder="Item details (Optional)"
            value={itemDetails}
            onChange={(e) => setItemDetails(e.target.value)}
          />
        </div>

        {/* Payment Method Selection */}
        <div className="payment-section">
          <h3>Payment Method</h3>
          <label>
            <input
              type="radio"
              name="payment"
              value="credit"
              checked
              readOnly
            />
            Credit/Debit Card
          </label>
        </div>

        <StripeCheckout
          amount={customAmount || donationAmount}
          userId={userId}
          itemDetails={itemDetails}
        />
      </div>
    </Elements>
  );
};

// **Stripe Checkout Component**
const StripeCheckout = ({ amount, userId, itemDetails }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;
  
    setLoading(true);
  
    try {
      // Step 1: Create a Payment Intent
      const response = await axios.post("http://localhost:5001/create-payment-intent", {
        amount: parseFloat(amount) || 50,
        user_id: userId,
        item_details: itemDetails,
      });
  
      const { clientSecret } = response.data;
  
      // Step 2: Confirm Payment
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: { name: "Test User", email: "test@example.com" },
        },
      });

      if (error) {
        console.error("Payment error:", error);
        alert("Payment failed. Please try again.");
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        alert("✅ Payment successful! Thank you for your donation.");

        // Step 3: Save donation in database
        await axios.post("http://localhost:5001/save-donation", {
          user_id: userId,
          donation_amount: amount,
          transaction_id: paymentIntent.id,
          item_details: itemDetails,
        });
      }
    } catch (err) {
      console.error("Error processing payment:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe || loading}>
        {loading ? "Processing..." : `Donate €${amount}`}
      </button>
    </form>
  );
};

export default Donate;
