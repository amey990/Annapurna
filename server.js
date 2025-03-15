// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");

// dotenv.config();
// const app = express();
// app.use(cors());
// app.use(express.json()); // Parse JSON requests

// // ✅ Test API Route
// app.get("/", (req, res) => {
//   res.send("Backend is running...");
// });

// // Start Server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, "0.0.0.0", () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });


const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mysql = require("mysql2");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json()); // Parse JSON requests

// ✅ MySQL Database Connection (RDS)
const db = mysql.createConnection({
  host: process.env.DB_HOST,  // RDS Endpoint
  user: process.env.DB_USER,  // RDS Username
  password: process.env.DB_PASSWORD,  // RDS Password
  database: process.env.DB_NAME,  // Your Database Name
  port: process.env.DB_PORT || 3306, // MySQL Default Port
});

// ✅ Test Database Connection
db.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err.message);
  } else {
    console.log("✅ Connected to MySQL RDS Database!");
  }
});

// ✅ Test API Route
app.get("/", (req, res) => {
  res.send("Backend is running...");
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
