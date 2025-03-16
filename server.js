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

////////////////////////////////Customers API (CRUD Operations) /////////////////////
// 🔹 Get all customers
app.get("/customers", (req, res) => {
  db.query("SELECT * FROM customers", (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// 🔹 Get a single customer by ID
app.get("/customers/:id", (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM customers WHERE id = ?", [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.json(result[0]);
  });
});

// 🔹 Add a new customer
app.post("/customers", (req, res) => {
  const { name, phone, address, notes } = req.body;
  const sql = "INSERT INTO customers (name, phone, address, notes) VALUES (?, ?, ?, ?)";
  db.query(sql, [name, phone, address, notes], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "Customer added successfully", id: result.insertId });
  });
});

// 🔹 Update customer details
app.put("/customers/:id", (req, res) => {
  const { id } = req.params;
  const { name, phone, address, notes } = req.body;
  const sql = "UPDATE customers SET name=?, phone=?, address=?, notes=? WHERE id=?";
  db.query(sql, [name, phone, address, notes, id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "Customer updated successfully" });
  });
});

// 🔹 Delete a customer
app.delete("/customers/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM customers WHERE id = ?", [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "Customer deleted successfully" });
  });
});

/////////////////////////////// Menu API //////////////////////////////////////////
// ✅ Create (Add a new menu item)
app.post("/menu", (req, res) => {
  const { item_name, category, price, quantity_unit, description } = req.body;
  const sql = "INSERT INTO menu (item_name, category, price, quantity_unit, description) VALUES (?, ?, ?, ?, ?)";
  
  db.query(sql, [item_name, category, price, quantity_unit, description], (err, result) => {
      if (err) {
          console.error("❌ Error adding menu item:", err);
          res.status(500).json({ error: "Failed to add menu item" });
      } else {
          res.status(201).json({ message: "✅ Menu item added successfully!", id: result.insertId });
      }
  });
});

// ✅ Read (Get all menu items)
app.get("/menu", (req, res) => {
  db.query("SELECT * FROM menu", (err, results) => {
      if (err) {
          console.error("❌ Error fetching menu:", err);
          res.status(500).json({ error: "Failed to fetch menu" });
      } else {
          res.status(200).json(results);
      }
  });
});

// ✅ Read (Get a single menu item by ID)
app.get("/menu/:id", (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM menu WHERE id = ?", [id], (err, result) => {
      if (err) {
          console.error("❌ Error fetching menu item:", err);
          res.status(500).json({ error: "Failed to fetch menu item" });
      } else if (result.length === 0) {
          res.status(404).json({ error: "Menu item not found" });
      } else {
          res.status(200).json(result[0]);
      }
  });
});

// ✅ Update (Edit a menu item by ID)
app.put("/menu/:id", (req, res) => {
  const { id } = req.params;
  const { item_name, category, price, quantity_unit, description } = req.body;

  const sql = "UPDATE menu SET item_name=?, category=?, price=?, quantity_unit=?, description=? WHERE id=?";
  db.query(sql, [item_name, category, price, quantity_unit, description, id], (err, result) => {
      if (err) {
          console.error("❌ Error updating menu item:", err);
          res.status(500).json({ error: "Failed to update menu item" });
      } else {
          res.status(200).json({ message: "✅ Menu item updated successfully!" });
      }
  });
});

// ✅ Delete (Remove a menu item by ID)
app.delete("/menu/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM menu WHERE id = ?", [id], (err, result) => {
      if (err) {
          console.error("❌ Error deleting menu item:", err);
          res.status(500).json({ error: "Failed to delete menu item" });
      } else {
          res.status(200).json({ message: "✅ Menu item deleted successfully!" });
      }
  });
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
