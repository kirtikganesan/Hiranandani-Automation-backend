const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// ✅ Create a connection to the database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',  // Update this with your actual MySQL password
  database: 'hiranandani'  // Ensure this database exists
});

// ✅ Connect to the database
db.connect((err) => {
  if (err) {
    console.error('❌ Failed to connect to the database:', err);
    return;
  }
  console.log('✅ Connected to the database');
});

// ✅ Login Route
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide both email and password' });
  }

  db.query('SELECT * FROM admin_users WHERE email = ?', [email], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ message: 'Database error' });
    }

    if (results.length === 0 || results[0].password !== password) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    return res.status(200).json({ message: 'Login successful', userId: results[0].id });
  });
});

// ✅ Employee Details API
app.get('/api/employees', (req, res) => {
  db.query('SELECT * FROM employee_details', (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ error: "Database query failed" });
    }
    res.json(results);
  });
});

app.get('/api/financial-details', (req, res) => {
  db.query('SELECT * FROM financial_details', (err, results) => {
    if (err) {
      console.error('Error fetching financial details:', err);
      return res.status(500).json({ message: 'Database error' });
    }
    res.json(results);
  });
});

app.get('/api/client-details', (req, res) => {
  db.query('SELECT * FROM client_details', (err, results) => {
    if (err) {
      console.error('Error fetching financial details:', err);
      return res.status(500).json({ message: 'Database error' });
    }
    res.json(results);
  });
});

app.post('/api/groups', (req, res) => {
  const { name, members } = req.body;

  const query = 'INSERT INTO groups (name, members) VALUES (?, ?)';
  db.query(query, [name, JSON.stringify(members)], (err, result) => {
    if (err) return res.status(500).json({ error: 'Failed to create group' });
    res.status(200).json({ message: 'Group created successfully', groupId: result.insertId });
  });
});

// Fetch all groups
app.get('/api/groups', (req, res) => {
  const query = 'SELECT * FROM groups';
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch groups' });
    res.status(200).json(results);
  });
});

// Delete a group
app.delete('/api/groups/:id', (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM groups WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Failed to delete group' });
    res.status(200).json({ message: 'Group deleted successfully' });
  });
});

// ✅ Start Server
app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});
