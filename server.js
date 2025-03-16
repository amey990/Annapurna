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

//////////////////////////////// Orders API //////////////////////////////////////
// ✅ Add Order API
app.post("/orders", (req, res) => {
  const { customer_id, order_details, order_time, order_date, notes } = req.body;
  if (!customer_id || !order_details || !order_time || !order_date) {
    return res.status(400).json({ error: "❌ Missing required fields!" });
  }

  const sql = `INSERT INTO orders (customer_id, order_details, order_time, order_date, notes) VALUES (?, ?, ?, ?, ?)`;
  db.query(sql, [customer_id, order_details, order_time, order_date, notes], (err, result) => {
    if (err) {
      console.error("❌ Error placing order:", err.message);
      return res.status(500).json({ error: "❌ Failed to place order!" });
    }
    res.status(201).json({ message: "✅ Order placed successfully!", order_id: result.insertId });
  });
});

// ✅ Get All Orders API
app.get("/orders", (req, res) => {
  const sql = `SELECT orders.*, customers.name AS customer_name 
               FROM orders 
               JOIN customers ON orders.customer_id = customers.id 
               ORDER BY orders.created_at DESC`;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("❌ Error fetching orders:", err.message);
      return res.status(500).json({ error: "❌ Failed to fetch orders!" });
    }
    res.status(200).json(results);
  });
});

// ✅ Get Order by ID API
app.get("/orders/:id", (req, res) => {
  const orderId = req.params.id;
  const sql = `SELECT orders.*, customers.name AS customer_name 
               FROM orders 
               JOIN customers ON orders.customer_id = customers.id 
               WHERE orders.id = ?`;

  db.query(sql, [orderId], (err, result) => {
    if (err) {
      console.error("❌ Error fetching order:", err.message);
      return res.status(500).json({ error: "❌ Failed to fetch order!" });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: "❌ Order not found!" });
    }
    res.status(200).json(result[0]);
  });
});

// ✅ Update Order API
app.put("/orders/:id", (req, res) => {
  const orderId = req.params.id;
  const { customer_id, order_details, order_time, order_date, notes } = req.body;

  if (!customer_id || !order_details || !order_time || !order_date) {
    return res.status(400).json({ error: "❌ Missing required fields!" });
  }

  const sql = `UPDATE orders SET customer_id = ?, order_details = ?, order_time = ?, order_date = ?, notes = ? WHERE id = ?`;
  db.query(sql, [customer_id, order_details, order_time, order_date, notes, orderId], (err, result) => {
    if (err) {
      console.error("❌ Error updating order:", err.message);
      return res.status(500).json({ error: "❌ Failed to update order!" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "❌ Order not found!" });
    }
    res.status(200).json({ message: "✅ Order updated successfully!" });
  });
});

// ✅ Delete Order API
app.delete("/orders/:id", (req, res) => {
  const orderId = req.params.id;
  const sql = `DELETE FROM orders WHERE id = ?`;

  db.query(sql, [orderId], (err, result) => {
    if (err) {
      console.error("❌ Error deleting order:", err.message);
      return res.status(500).json({ error: "❌ Failed to delete order!" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "❌ Order not found!" });
    }
    res.status(200).json({ message: "✅ Order deleted successfully!" });
  });
});

///////////////////////////// Bills API ////////////////////////////////////////
// ✅ Add Bill API
app.post("/bills", (req, res) => {
  const { customer_id, total_amount, start_date, end_date } = req.body;

  if (!customer_id || !total_amount || !start_date || !end_date) {
    return res.status(400).json({ error: "❌ Missing required fields!" });
  }

  const sql = `INSERT INTO bills (customer_id, total_amount, start_date, end_date) VALUES (?, ?, ?, ?)`;
  db.query(sql, [customer_id, total_amount, start_date, end_date], (err, result) => {
    if (err) {
      console.error("❌ Error adding bill:", err.message);
      return res.status(500).json({ error: "❌ Failed to add bill!" });
    }
    res.status(201).json({ message: "✅ Bill added successfully!", bill_id: result.insertId });
  });
});

// ✅ Get All Bills API
app.get("/bills", (req, res) => {
  const sql = `SELECT bills.*, customers.name AS customer_name 
               FROM bills 
               JOIN customers ON bills.customer_id = customers.id 
               ORDER BY bills.created_at DESC`;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("❌ Error fetching bills:", err.message);
      return res.status(500).json({ error: "❌ Failed to fetch bills!" });
    }
    res.status(200).json(results);
  });
});

// ✅ Get Bill by ID API
app.get("/bills/:id", (req, res) => {
  const billId = req.params.id;
  const sql = `SELECT bills.*, customers.name AS customer_name 
               FROM bills 
               JOIN customers ON bills.customer_id = customers.id 
               WHERE bills.id = ?`;

  db.query(sql, [billId], (err, result) => {
    if (err) {
      console.error("❌ Error fetching bill:", err.message);
      return res.status(500).json({ error: "❌ Failed to fetch bill!" });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: "❌ Bill not found!" });
    }
    res.status(200).json(result[0]);
  });
});

// ✅ Update Bill API
app.put("/bills/:id", (req, res) => {
  const billId = req.params.id;
  const { customer_id, total_amount, start_date, end_date } = req.body;

  if (!customer_id || !total_amount || !start_date || !end_date) {
    return res.status(400).json({ error: "❌ Missing required fields!" });
  }

  const sql = `UPDATE bills SET customer_id = ?, total_amount = ?, start_date = ?, end_date = ? WHERE id = ?`;
  db.query(sql, [customer_id, total_amount, start_date, end_date, billId], (err, result) => {
    if (err) {
      console.error("❌ Error updating bill:", err.message);
      return res.status(500).json({ error: "❌ Failed to update bill!" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "❌ Bill not found!" });
    }
    res.status(200).json({ message: "✅ Bill updated successfully!" });
  });
});

// ✅ Delete Bill API
app.delete("/bills/:id", (req, res) => {
  const billId = req.params.id;
  const sql = `DELETE FROM bills WHERE id = ?`;

  db.query(sql, [billId], (err, result) => {
    if (err) {
      console.error("❌ Error deleting bill:", err.message);
      return res.status(500).json({ error: "❌ Failed to delete bill!" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "❌ Bill not found!" });
    }
    res.status(200).json({ message: "✅ Bill deleted successfully!" });
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
