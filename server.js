const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static frontend files (index.html, CSS, JS, images)
const path = require("path");
app.use(express.static(path.join(__dirname)));

// Root endpoint actually defaults to index.html because of express.static above,
// but we leave this here just in case they visit a specific path
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// MySQL Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "YOUR_PASSWORD", // 👉 put your MySQL password
  database: "eventdb"
});

// Connect DB
db.connect(err => {
  if (err) {
    console.log("❌ DB Error:", err);
  } else {
    console.log("✅ MySQL Connected");

    // Create complaints table if it doesn't exist
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS complaints (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255),
        district VARCHAR(255),
        status VARCHAR(255),
        time VARCHAR(255)
      )
    `;
    db.query(createTableQuery, (err) => {
      if (err) {
        console.log("❌ Error creating table:", err);
      } else {
        console.log("✅ Complaints table ready");
      }
    });

    // Create registrations table if it doesn't exist
    const createRegistrationsTableQuery = `
      CREATE TABLE IF NOT EXISTS registrations (
        regno VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255),
        email VARCHAR(255),
        mobile VARCHAR(255),
        events VARCHAR(255)
      )
    `;
    db.query(createRegistrationsTableQuery, (err) => {
      if (err) {
        console.log("❌ Error creating registrations table:", err);
      } else {
        console.log("✅ Registrations table ready");
      }
    });
  }
});

// ================= COMPLAINT MANAGEMENT =================

// Add a new complaint
app.post("/addComplaint", (req, res) => {
  const { id, name, district, status, time } = req.body;
  const sql = "INSERT INTO complaints (id, name, district, status, time) VALUES (?, ?, ?, ?, ?)";

  db.query(sql, [id, name, district, status, time], (err) => {
    if (err) {
      console.log(err);
      return res.json({ error: "Database error" });
    }
    res.json({ message: "Complaint added successfully ✅" });
  });
});

// Get all complaints
app.get("/getComplaints", (req, res) => {
  const sql = "SELECT * FROM complaints ORDER BY time DESC";
  db.query(sql, (err, results) => {
    if (err) {
      console.log(err);
      return res.json({ error: "Database error" });
    }
    res.json(results);
  });
});

// Get status by ID
app.get("/getStatus/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT status FROM complaints WHERE id = ?";

  db.query(sql, [id], (err, results) => {
    if (err) {
      console.log(err);
      return res.json({ error: "Database error" });
    }
    if (results.length > 0) {
      res.json({ status: results[0].status });
    } else {
      res.json({ error: "Complaint not found" });
    }
  });
});

// ================= EVENT REGISTRATION =================
app.post("/registerEvent", (req, res) => {

  const { regno, name, email, mobile, events } = req.body;

  // Validation: max 3 events
  if (!events || events.length === 0) {
    return res.json({ error: "No event selected" });
  }

  if (events.length > 3) {
    return res.json({ error: "Maximum 3 events allowed" });
  }

  const eventList = events.join(",");

  const sql = "INSERT INTO registrations (regno, name, email, mobile, events) VALUES (?, ?, ?, ?, ?)";

  db.query(sql, [regno, name, email, mobile, eventList], (err) => {
    if (err) {
      console.log(err);
      return res.json({ error: "Database error" });
    }

    res.json({ message: "Registration saved successfully ✅" });
  });

});

// Get all registrations (For viewing purposes)
app.get("/getRegistrations", (req, res) => {
  const sql = "SELECT * FROM registrations";
  db.query(sql, (err, results) => {
    if (err) {
      console.log(err);
      return res.json({ error: "Database error" });
    }
    res.json(results);
  });
});

// ================= START SERVER =================
app.listen(3000, () => {
  console.log("\n🚀 Server running at http://localhost:3000\n");
});
