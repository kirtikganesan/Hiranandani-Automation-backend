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

app.get('/api/all-services', (req, res) => {
  const query = 'SELECT * FROM all_services';
  db.query(query, (err, results) => {
      if (err) {
          console.error('Error fetching data:', err);
          return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.json(results);
  });
});

// API endpoint to fetch employee details
app.get('/api/employee-details', (req, res) => {
    const query = `
        SELECT 
            employee_name, 
            role, 
            phone, 
            email, 
            todays_working_status, 
            branch, 
            reports_to, 
            status 
        FROM employee_details
    `;

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching employee data:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json(results);
    });
});

app.put("/api/employee-details/:id/deactivate", (req, res) => {
  const employeeId = req.params.id;

  const sql = "UPDATE employee_details SET status = 'Inactive' WHERE id = ?";
  
  db.query(sql, [employeeId], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json({ message: "Employee deactivated successfully" });
  });
});

app.get("/api/services-triggered-but-not-alloted", (req, res) => {
  const query = "SELECT * FROM services_triggered_but_not_alloted";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});

app.post("/api/assign-service", (req, res) => {
  const { services, alloted_to, due_date } = req.body;
  const formattedDueDate = due_date.split("/").reverse().join("-");
  try {
     db.query(
      "INSERT INTO all_services (services, alloted_to, due_date, status, udin) VALUES (?, ?, ?, 'Pending', 'N/A')",
      [services, alloted_to, formattedDueDate]
    );
    res.json({ message: "Task assigned successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Database error!" });
  }
});

app.get('/api/timesheet', (req, res) => {
  const query = 'SELECT * FROM timesheet ORDER BY timesheet_date DESC';
  
  db.query(query, (err, results) => {
      if (err) {
          console.error('Error fetching timesheet data:', err);
          return res.status(500).json({ error: 'Database query error' });
      }
      res.json(results);
  });
});

app.post('/api/timesheets', (req, res) => {
  const {
      timesheet_date, worked_at, in_time, out_time, total_time, allotted_client, service,
      non_allotted_services, office_related, notice_appointment
  } = req.body;

  const sql = `INSERT INTO timesheet (timesheet_date, worked_at, in_time, out_time, total_time, allotted_client, service, non_allotted_services, office_related, notice_appointment)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(sql, [
      timesheet_date, worked_at, in_time, out_time, total_time, allotted_client, service,
      non_allotted_services ? 1 : 0,
      office_related ? 1 : 0,
      notice_appointment ? 1 : 0
  ], (err, result) => {
      if (err) {
          console.error("Error inserting timesheet:", err);
          return res.status(500).json({ error: "Database error" });
      }
      res.status(201).json({ message: "Timesheet added successfully" });
  });
});

app.get("/api/appointments", (req, res) => {
  db.query("SELECT * FROM appointment", (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

// Insert new appointment
app.post('/api/appointments', (req, res) => {
  const {
    appointment_date, client_name, to_meet, from_time, to_time, enter_location, meeting_purpose} = req.body;

  const query = `INSERT INTO appointment (appointment_date, client_name, to_meet, from_time, to_time, enter_location, meeting_purpose)
                 VALUES (?, ?, ?, ?, ?, ?, ?)`;

  db.query(query, [appointment_date, client_name, to_meet, from_time, to_time, enter_location, meeting_purpose],
    (err, result) => {
      if (err) {
        console.error('Error inserting appointment:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.status(201).json({ message: 'Appointment saved successfully' });
    }
  );
});
// ✅ Start Server
app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});
