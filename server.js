const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mysql = require("mysql2");
const customerRoutes = require("./routes/customers");
app.use("/api", customerRoutes);


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


//////////////////////////// Customer APIS /////////////////////////////////////
// ✅ Create a Customer
router.post("/customers", (req, res) => {
  const { name, phone, address, notes } = req.body;
  if (!name || !phone || !address) {
    return res.status(400).json({ error: "Name, phone, and address are required" });
  }

  const sql = "INSERT INTO customers (name, phone, address, notes) VALUES (?, ?, ?, ?)";
  db.query(sql, [name, phone, address, notes], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Customer added", id: result.insertId });
  });
});

// ✅ Get All Customers
router.get("/customers", (req, res) => {
  db.query("SELECT * FROM customers", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// ✅ Get Customer by ID
router.get("/customers/:id", (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM customers WHERE id = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: "Customer not found" });
    res.json(results[0]);
  });
});

// ✅ Update a Customer
router.put("/customers/:id", (req, res) => {
  const { id } = req.params;
  const { name, phone, address, notes } = req.body;

  const sql = "UPDATE customers SET name=?, phone=?, address=?, notes=? WHERE id=?";
  db.query(sql, [name, phone, address, notes, id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ error: "Customer not found" });
    res.json({ message: "Customer updated successfully" });
  });
});

// ✅ Delete a Customer
router.delete("/customers/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM customers WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ error: "Customer not found" });
    res.json({ message: "Customer deleted successfully" });
  });
});

// ✅ Export Router
module.exports = router;


// ✅ Test API Route
app.get("/", (req, res) => {
  res.send("Backend is running...");
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
