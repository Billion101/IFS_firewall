const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

const correctUser = {
  username: "admin",
  password: "123456"
};

let blockedIps = {};
let ipAttempts = {};

// Middleware: check if IP is blocked
app.use((req, res, next) => {
  const ip = req.ip;
  if (blockedIps[ip]) {
    console.log(`⛔ Blocked request from: ${ip}`);
    return res.status(403).json({ success: false, message: "Your IP is blocked." });
  }
  next();
});

// Login route
app.post('/login', (req, res) => {
  const ip = req.ip;
  const { username, password } = req.body;

  if (username === correctUser.username && password === correctUser.password) {
    ipAttempts[ip] = 0;
    console.log(`✅ Successful login from: ${ip}`);
    return res.json({ success: true, message: "Login successful" });
  } else {
    ipAttempts[ip] = (ipAttempts[ip] || 0) + 1;
    console.log(`❌ Failed login attempt ${ipAttempts[ip]} from: ${ip}`);

    if (ipAttempts[ip] >= 10) {
      blockedIps[ip] = true;
      console.log(`🚫 IP Blocked: ${ip}`);
    }

    return res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});

app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));