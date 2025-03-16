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
// ✅ Generate Bill API (Dynamically Calculate Total from Orders)
app.post("/bills/generate", async (req, res) => {
  const { customer_id, start_date, end_date } = req.body;

  if (!customer_id || !start_date || !end_date) {
    return res.status(400).json({ error: "All fields are required!" });
  }

  try {
    // Step 1: Fetch orders within the selected date range
    const [orders] = await db.promise().query(
      "SELECT order_details FROM orders WHERE customer_id = ? AND order_date BETWEEN ? AND ?",
      [customer_id, start_date, end_date]
    );

    if (orders.length === 0) {
      return res.status(404).json({ error: "No orders found for this customer in the given date range." });
    }

    // Step 2: Extract ordered items
    let orderedItems = [];
    orders.forEach(order => {
      orderedItems.push(order.order_details);
    });

    // Step 3: Fetch prices from menu table
    let totalAmount = 0;
    for (let item of orderedItems) {
      const [menuItem] = await db.promise().query(
        "SELECT price FROM menu WHERE item_name = ?",
        [item]
      );

      if (menuItem.length > 0) {
        totalAmount += parseFloat(menuItem[0].price);
      }
    }

    // Step 4: Insert the generated bill into `bills` table
    const [result] = await db.promise().query(
      "INSERT INTO bills (customer_id, total_amount, start_date, end_date) VALUES (?, ?, ?, ?)",
      [customer_id, totalAmount, start_date, end_date]
    );

    res.json({
      message: "Bill generated successfully",
      bill_id: result.insertId,
      total_amount: totalAmount,
    });
  } catch (error) {
    console.error("Error generating bill:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

////////////////////////////// User profile API ////////////////////////////////////
// POST API//
app.post("/user-profile", (req, res) => {
  const { user_id, name, email, contact_number, date_of_birth, photo_url } = req.body;

  const query = "INSERT INTO user_profile (user_id, name, email, contact_number, date_of_birth, photo_url) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(query, [user_id, name, email, contact_number, date_of_birth, photo_url], (err, result) => {
      if (err) {
          return res.status(500).json({ error: "Database error: " + err.message });
      }
      res.json({ message: "User profile created successfully", profile_id: result.insertId });
  });
});

// Get profile by ID //
app.get("/user-profile/:id", (req, res) => {
  const { id } = req.params;

  const query = "SELECT * FROM user_profile WHERE user_id = ?";
  db.query(query, [id], (err, result) => {
      if (err) {
          return res.status(500).json({ error: "Database error: " + err.message });
      }
      if (result.length === 0) {
          return res.status(404).json({ message: "User profile not found" });
      }
      res.json(result[0]);
  });
});

// Update User Profile //
app.put("/user-profile/:id", (req, res) => {
  const { id } = req.params;
  const { name, email, contact_number, date_of_birth, photo_url } = req.body;

  const query = "UPDATE user_profile SET name = ?, email = ?, contact_number = ?, date_of_birth = ?, photo_url = ? WHERE user_id = ?";
  db.query(query, [name, email, contact_number, date_of_birth, photo_url, id], (err, result) => {
      if (err) {
          return res.status(500).json({ error: "Database error: " + err.message });
      }
      if (result.affectedRows === 0) {
          return res.status(404).json({ message: "User profile not found" });
      }
      res.json({ message: "User profile updated successfully" });
  });
});

// Delete API //
app.delete("/user-profile/:id", (req, res) => {
  const { id } = req.params;

  const query = "DELETE FROM user_profile WHERE user_id = ?";
  db.query(query, [id], (err, result) => {
      if (err) {
          return res.status(500).json({ error: "Database error: " + err.message });
      }
      if (result.affectedRows === 0) {
          return res.status(404).json({ message: "User profile not found" });
      }
      res.json({ message: "User profile deleted successfully" });
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
