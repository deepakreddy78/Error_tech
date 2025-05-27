const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();

// ✅ Middleware to parse JSON bodies
app.use(cors());
app.use(express.json());

const { N8N_WEBHOOK_URL } = process.env;

app.post("/api/leads", async (req, res) => {
  console.log("Received body:", req.body); // Add this debug line
  const { name, email, company, message } = req.body;

  // Basic validation
  if (!name || !email || !/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({ error: "Invalid name or email" });
  }

  try {
    // Send to n8n webhook
    await axios.post(N8N_WEBHOOK_URL, { name, email, company, message });

    res.status(200).json({ message: "Lead submitted successfully" });
  } catch (err) {
    console.error("Failed to send to n8n:", err.message);
    res.status(500).json({ error: "Server error forwarding to n8n" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
