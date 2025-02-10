const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const pool = require("./db"); // Database connection
const bcrypt = require("bcrypt"); // Password hashing
const jwt = require("jsonwebtoken"); // JWT token generation
const nodemailer = require("nodemailer"); // Import Nodemailer
const Stripe = require("stripe");
require("dotenv").config(); // Load environment variables

console.log("Stripe Secret Key Loaded:", process.env.STRIPE_SECRET_KEY ? "✅ Yes" : "❌ No");

const stripe = Stripe(process.env.STRIPE_SECRET_KEY); // Load Stripe Secret Key
const app = express();

// Test database connection
pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Database connection error:", err.message);
  } else {
    console.log("Database connected at:", res.rows[0].now);
  }
});

// Middleware
app.use(cors({ 
  origin: "http://localhost:3000", 
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true 
}));
app.use(express.json());
app.use(bodyParser.json());

// Default Route
app.get("/", (req, res) => {
  res.send("Welcome to the backend server!");
});

// **JWT Token Verification Middleware**
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(403).json({ error: "Invalid token." });
  }
};

// **Signup Route**
app.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await pool.query(
      "INSERT INTO Users (name, email, password_hash, role) VALUES ($1, $2, $3, 'Customer') RETURNING *",
      [name, email, hashedPassword]
    );

    res.status(201).json(newUser.rows[0]);
  } catch (err) {
    if (err.code === '23505') { 
      return res.status(400).json({ error: 'Email already exists' });
    }
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// **Login Route**
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await pool.query("SELECT * FROM Users WHERE email = $1", [email]);
    if (user.rows.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const validPassword = await bcrypt.compare(password, user.rows[0].password_hash);
    if (!validPassword) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.rows[0].user_id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ error: "Server error. Please try again." });
  }
});

// **Create Payment Intent API**
app.post("/create-payment-intent", async (req, res) => {
  try {
    const { amount, user_id, item_details } = req.body;
    if (!amount || !user_id) return res.status(400).json({ error: "Amount and User ID are required" });

    // Step 1: Create Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: "eur",
      payment_method_types: ["card"],
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Stripe Error:", error);
    res.status(500).json({ error: "Payment failed, please try again" });
  }
});

// **Store Successful Payment in DB**
app.post("/save-donation", async (req, res) => {
  try {
    const { user_id, donation_amount, transaction_id, item_details } = req.body;
    if (!user_id || !donation_amount || !transaction_id) {
      return res.status(400).json({ error: "Missing required donation details" });
    }

    const donation_date = new Date().toISOString();

    const insertQuery = `
      INSERT INTO donate_buy (user_id, donation_amount, transaction_id, donation_date, item_details) 
      VALUES ($1, $2, $3, $4, $5) RETURNING *;
    `;

    const result = await pool.query(insertQuery, [user_id, donation_amount, transaction_id, donation_date, item_details]);

    res.status(201).json({ message: "Donation saved successfully!", data: result.rows[0] });
  } catch (error) {
    console.error("Error saving donation:", error);
    res.status(500).json({ error: "Failed to save donation. Try again later." });
  }
});

// **Fetch User Donations**
app.get("/donations", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await pool.query(
      "SELECT donation_amount, transaction_id, donation_date, item_details FROM donate_buy WHERE user_id = $1",
      [userId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching donations:", error);
    res.status(500).json({ error: "Failed to fetch donations." });
  }
});

// **Leaderboard: Top 5 Donors**
app.get("/leaderboard/top5", async (req, res) => {
  try {
    const topUsers = await pool.query(`
      SELECT 
        u.name, 
        COALESCE(SUM(d.donation_amount), 0) AS total_donations
      FROM Users u
      LEFT JOIN donate_buy d ON u.user_id = d.user_id
      GROUP BY u.name
      ORDER BY total_donations DESC
      LIMIT 5;
    `);

    res.json(topUsers.rows);
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    res.status(500).json({ error: "Failed to fetch leaderboard." });
  }
});

// **Send Email API**
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465, // Secure SSL
  secure: true, // Use SSL
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.post("/send-email", async (req, res) => {
  const { firstName, lastName, email, phoneNumber, message } = req.body;

  if (!firstName || !lastName || !email || !phoneNumber || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER, 
    subject: "New Contact Form Submission",
    text: `
      Name: ${firstName} ${lastName}
      Email: ${email}
      Phone: ${phoneNumber}
      
      Message:
      ${message}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email. Please try again." });
  }
});

// **Start Server**
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}).on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    process.exit(1);
  } else {
    console.error("Server error:", err);
  }
});
