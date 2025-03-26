const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const multer = require("multer");
const fs = require("fs");
const path = require("path");
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors({ 
  origin: 'http://localhost:5173',
}));
app.use(express.json());

app.use(express.urlencoded({ extended: true }));



// ✅ Create a connection to the database
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
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

app.get('/api/employee-names', (req, res) => {
  db.query('SELECT employee_name FROM employee_details', (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ error: "Database query failed" });
    }
    res.json(results);
  });
});

app.get('/api/financial-details', (req, res) => {
  const { billingFirm } = req.query;
  let query = 'SELECT * FROM financial_details';

  if (billingFirm) {
    query += ` WHERE billing_firm = '${billingFirm}'`;
  }

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching financial details:', err);
      return res.status(500).json({ message: 'Database error' });
    }
    res.json(results);
  });
});

app.get("/api/client-details", (req, res) => {
  const searchQuery = req.query.search; // Get search term from query params

  let sqlQuery = "SELECT * FROM client_details"; // Adjust table name if needed
  let queryParams = [];

  if (searchQuery) {
    sqlQuery += " WHERE client_name LIKE ?";
    queryParams.push(`%${searchQuery}%`);
  }

  db.execute(sqlQuery, queryParams, (error, results) => {
    if (error) {
      console.error("Error fetching clients:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.json(results);
  });
});

app.post('/api/client-details', (req, res) => {
  const {
    client_name,
    full_name,
    client_group,
    branch,
    email,
    phone,
    constitution,
    client_code,
    client_pan,
    client_tan,
    client_gstin,
    industry,
    date_of_incorporation,
    address_line_1,
    address_line_2,
    area,
    city,
    state,
    district,
    pincode,
    services
  } = req.body;

  const sql = `
    INSERT INTO client_details (
      client_name,
      full_name,
      client_group,
      branch,
      email,
      phone,
      constitution,
      client_code,
      client_pan,
      client_tan,
      client_gstin,
      industry,
      date_of_incorporation,
      address_line_1,
      address_line_2,
      area,
      city,
      state,
      district,
      pincode,
      services
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    client_name,
    full_name,
    client_group,
    branch,
    email,
    phone,
    constitution,
    client_code,
    client_pan,
    client_tan,
    client_gstin,
    industry,
    date_of_incorporation,
    address_line_1,
    address_line_2,
    area,
    city,
    state,
    district,
    pincode,
    services 
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(201).json({ id: result.insertId, ...req.body });
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

app.get("/api/all-services", (req, res) => {
  const { alloted_to } = req.query;

  let sql = "SELECT * FROM all_services";
  const params = [];

  if (alloted_to) {
    sql += " WHERE alloted_to = ?";
    params.push(alloted_to);
  }

  db.query(sql, params, (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(result);
  });
});


// API endpoint to fetch employee details
app.get('/api/employee-details', (req, res) => {
    const query = `
        SELECT 
            *
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

app.put('/api/appointments/:id', (req, res) => {
  const appointmentId = req.params.id;
  const {
    appointment_date,
    client_name,
    to_meet,
    from_time,
    to_time,
    financial_year,
    enter_location,
    service_name,
    meeting_purpose,
    status
  } = req.body;

  const sql = `
    UPDATE appointment
    SET appointment_date = ?, client_name = ?, to_meet = ?, from_time = ?, to_time = ?,
        financial_year = ?, enter_location = ?, service_name = ?,
        meeting_purpose = ?, status = ?
    WHERE id = ?
  `;
  const values = [
    appointment_date,
    client_name,
    to_meet,
    from_time,
    to_time,
    financial_year,
    enter_location,
    service_name,
    meeting_purpose,
    status,
    appointmentId
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Appointment not found' });
    }
    res.status(200).json({ message: 'Appointment updated successfully' });
  });
});

// DELETE endpoint to delete an appointment
app.delete('/api/appointments/:id', (req, res) => {
  const appointmentId = req.params.id;
  const sql = 'DELETE FROM appointment WHERE id = ?';

  db.query(sql, [appointmentId], (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Appointment not found' });
    }
    res.status(200).json({ message: 'Appointment deleted successfully' });
  });
});


app.post("/api/manual-assignment", (req, res) => {
  const {
    financialYear,
    mainCategory,
    triggerDate,
    clientId,
    services,
    targetDate,
    priority,
    feesPeriod,
    workReportingHead,
    remark,
    employee, // This will be stored in `alloted_to`
    sop
  } = req.body;

  const query = `INSERT INTO all_services 
    (services, alloted_to, due_date, status, udin, created_at, main_category, trigger_date, client_id, target_date, priority, fees_period, work_reporting_head, remark, sop_instructions, financial_year)
    VALUES (?, ?, ?, ?, "N/A", NOW(), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(query, [
    services, employee, targetDate, "Pending", "", 
    mainCategory, triggerDate, clientId, targetDate, priority, 
    feesPeriod, workReportingHead, remark, sop, financialYear // Added financialYear
  ], (err, result) => {
    if (err) {
      console.error("Error inserting data:", err);
      res.status(500).json({ error: "Failed to save data" });
    } else {
      res.status(200).json({ message: "Data saved successfully" });
    }
  });
});


app.put("/api/update-service/:id", async (req, res) => {
  const { id } = req.params;
  const { services, alloted_to, due_date, status, udin } = req.body;

  if (!services || !alloted_to || !due_date || !status || !udin) {
      return res.status(400).json({ error: "All fields are required" });
  }

  try {
      const query = `
          UPDATE all_services 
          SET services = ?, alloted_to = ?, due_date = ?, status = ?, udin = ?
          WHERE id = ?
      `;
      const values = [services, alloted_to, due_date, status, udin, id];

      db.query(query, values, (err, result) => {
          if (err) {
              console.error("Error updating service:", err);
              return res.status(500).json({ error: "Database update failed" });
          }
          res.json({ message: "Service updated successfully" });
      });
  } catch (error) {
      console.error("Server error:", error);
      res.status(500).json({ error: "Internal server error" });
  }
});

app.get('/books', (req, res) => {
  db.query("SELECT * FROM books", (err, result) => {
      if (err) return res.json({ error: err });
      res.json(result);
  });
});

app.post('/addBook', (req, res) => {
  const { category, name, year, publisher, type, cdDvdAvailable } = req.body;
  const query = "INSERT INTO books (category, name, year, publisher, type, cdDvdAvailable) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(query, [category, name, year, publisher, type, cdDvdAvailable], (err, result) => {
      if (err) return res.json({ error: err });
      res.json({ message: "Book added successfully" });
  });
});


app.put('/updateBook/:id', (req, res) => {
  const { id } = req.params;
  const { category, name, year, publisher, type, cdDvdAvailable } = req.body;
  const query = "UPDATE books SET category=?, name=?, year=?, publisher=?, type=?, cdDvdAvailable=? WHERE id=?";
  db.query(query, [category, name, year, publisher, type, cdDvdAvailable, id], (err, result) => {
      if (err) return res.json({ error: err });
      res.json({ message: "Book updated successfully" });
  });
});

app.delete('/deleteBook/:id', (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM books WHERE id=?", [id], (err, result) => {
      if (err) return res.json({ error: err });
      res.json({ message: "Book deleted successfully" });
  });
});

app.get('/api/knowledge_base', (req, res) => {
  const sql = 'SELECT * FROM knowledge_base';

  db.query(sql, (err, results) => {
      if (err) {
          return res.status(500).json({ error: err.message });
      }
      res.json(results);
  });
});


app.post('/api/knowledge_base', async (req, res) => {
  const { category, title, link } = req.body;
  const sql = 'INSERT INTO knowledge_base (category, title, link) VALUES (?, ?, ?)';
  db.query(sql, [category, title, link], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Entry added successfully' });
  });
});

app.post("/api/apply-leave", (req, res) => {
  const { employee_id, leave_type, start_date, end_date, reason, leave_duration } = req.body;
  const sql = `INSERT INTO leaves (employee_id, leave_type, start_date, end_date, reason, leave_duration) VALUES (?, ?, ?, ?, ?, ?)`;

  db.query(sql, [employee_id, leave_type, start_date, end_date, reason, leave_duration], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Leave applied successfully", leaveId: result.insertId });
  });
});

app.get("/api/leaves", (req, res) => {
  const query = `
    SELECT l.id, e.employee_name, l.leave_type, l.start_date, l.end_date, 
           l.reason, l.leave_duration 
    FROM leaves l
    JOIN employee_details e ON l.employee_id = e.id
    ORDER BY l.start_date DESC;
  `;

  db.query(query, (err, result) => {
    if (err) {
      console.error("Error fetching leaves:", err);
      return res.status(500).json({ error: "Database error fetching leaves" });
    }
    res.json(result);
  });
});

app.get('/api/digital-signatures', (req, res) => {
  const { page = 1, limit = 10, status } = req.query;
  const offset = (page - 1) * limit;

  let sql = 'SELECT * FROM digital_signature';
  let values = [];

  if (status === 'live') {
    sql += ' WHERE date_of_expiry > CURDATE()';
  } else if (status === 'expired') {
    sql += ' WHERE date_of_expiry < CURDATE()';
  }

  sql += ' LIMIT ? OFFSET ?';
  values.push(parseInt(limit), parseInt(offset));

  db.query(sql, values, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post('/api/digital-signatures', (req, res) => {
  const {
    client,
    member_name,
    location,
    date_of_received,
    date_of_expiry,
    password,
    received_by
  } = req.body;

  // Check if the digital signature for the selected client already exists
  const checkSql = 'SELECT * FROM digital_signature WHERE client = ?';
  db.query(checkSql, [client], (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    if (result.length > 0) {
      return res.status(409).json({ error: 'Selected client\'s digital signature already exists' });
    }

    // Insert the new digital signature
    const insertSql = `
      INSERT INTO digital_signature (
        client,
        member_name,
        location,
        date_of_received,
        date_of_expiry,
        password,
        received_by
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      client,
      member_name,
      location,
      date_of_received,
      date_of_expiry,
      password,
      received_by
    ];

    db.query(insertSql, values, (err, result) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.status(201).json({ id: result.insertId, ...req.body });
    });
  });
});

app.delete('/api/digital-signatures/:id', (req, res) => {
  const signatureId = req.params.id;
  const query = 'DELETE FROM digital_signature WHERE id = ?';

  db.query(query, [signatureId], (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Digital Signature not found' });
    }
    res.status(200).json({ message: 'Digital Signature deleted successfully' });
  });
});


app.get('/api/clients', (req, res) => {
  const sql = 'SELECT client_name FROM client_details';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Endpoint to fetch reconciliation data
app.get('/api/reconciliation', (req, res) => {
  const { clientName, startDate, endDate, reconciliationType } = req.query;
  const sql = `
    SELECT * FROM reconciliation
    WHERE client_name = ?
    AND date BETWEEN ? AND ?
    AND reconciliation_type = ?
  `;
  const values = [clientName, startDate, endDate, reconciliationType];
  db.query(sql, values, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Files will be saved in 'uploads/' folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// API to handle form + file upload
app.post("/api/notices", upload.single("document"), (req, res) => {
  const {
    client_name,
    notice_no,
    financial_year,
    notice_date,
    act,
    date_of_receipt,
    section,
    date_submitted,
    title,
    submission_mode,
    assessing_officer,
    brief_issues,
    hearing_date,
    hearing_time,
    required_documents,
    service_category,
    service_name,
    letter_of_authority,
    fees,
  } = req.body;

  const documentPath = req.file ? req.file.path : null; // Store file path

  const sql = `INSERT INTO notice 
    (client_name, notice_no, financial_year, notice_date, act, date_of_receipt, section, date_submitted, title, submission_mode, assessing_officer, brief_issues, hearing_date, hearing_time, documents_required, service_category, service_name, letter_of_authority, fees, document_path) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(
    sql,
    [
      client_name,
      notice_no,
      financial_year,
      notice_date,
      act,
      date_of_receipt,
      section,
      date_submitted,
      title,
      submission_mode,
      assessing_officer,
      brief_issues,
      hearing_date,
      hearing_time,
      required_documents,
      service_category,
      service_name,
      letter_of_authority,
      fees,
      documentPath,
    ],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error saving notice");
      }
      res.status(200).json({ message: "Notice saved successfully" });
    }
  );
});

app.get('/api/notices', (req, res) => {
  const sql = `
    SELECT
      client_name, notice_no, financial_year, notice_date, act,
      date_of_receipt, section, date_submitted, title, submission_mode,
      assessing_officer, brief_issues, hearing_date, hearing_time,
      documents_required, service_category, service_name,
      letter_of_authority, fees, document_path
    FROM notice
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching notices:', err);
      return res.status(500).json({ error: 'Error fetching notices' });
    }
    res.json(results);
  });
});

app.get('/api/claims', (req, res) => {
  const sql = 'SELECT * FROM claims';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching claims:', err);
      return res.status(500).json({ error: 'Error fetching claims' });
    }
    res.json(results);
  });
});

// Endpoint to save a new claim
app.post('/api/claims', upload.single('billUpload'), (req, res) => {
  const {
    claim_date,
    travel_from,
    bill_no,
    claim_type,
    travel_to,
    bill_date,
    nature_of_claim,
    kms,
    claim_amount,
    particulars,
    challan_no,
    claim_submitted_for
  } = req.body;

  const bill_upload_path = req.file ? req.file.path : null;

  const sql = `
    INSERT INTO claims (
      claim_date, travel_from, bill_no, claim_type, travel_to,
      bill_date, nature_of_claim, kms, claim_amount, particulars,
      challan_no, claim_submitted_for, bill_upload_path
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      claim_date,
      travel_from,
      bill_no,
      claim_type,
      travel_to,
      bill_date,
      nature_of_claim,
      kms,
      claim_amount,
      particulars,
      challan_no,
      claim_submitted_for,
      bill_upload_path
    ],
    (err, result) => {
      if (err) {
        console.error('Error saving claim:', err);
        return res.status(500).json({ error: 'Error saving claim' });
      }
      res.status(200).json({ message: 'Claim saved successfully' });
    }
  );
});

app.get('/api/documents', (req, res) => {
  db.query('SELECT * FROM document_management', (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ error: 'Database query failed' });
    }
    res.json(results);
  });
});

// POST endpoint to save document management data
app.post('/api/documents', upload.array('files'), (req, res) => {
  const { date, branch, client_name, documents } = req.body;

  // Prepare the documents data for insertion
  const documentsData = documents.map((doc, index) => [
    date,
    branch,
    client_name,
    doc.particulars,
    doc.type,
    doc.mode,
    doc.stored,
    doc.quantity,
    doc.returnable,
    req.files[index] ? req.files[index].path : null
  ]);

  // Insert data into the database
  const sql = 'INSERT INTO document_management (date, branch, client_name, particulars, document_type, mode_of_inward, stored_in, quantity, returnable, document_path) VALUES ?';
  db.query(sql, [documentsData], (err, result) => {
    if (err) {
      console.error('Database insert error:', err);
      return res.status(500).json({ error: 'Database insert failed' });
    }
    res.json({ message: 'Documents saved successfully' });
  });
});

app.post('/api/employees', (req, res) => {
  const {
    employee_name, role, phone, email, todays_working_status, branch, reports_to
  } = req.body;

  const sql = `
    INSERT INTO employee_details (
      employee_name, role, phone, email, todays_working_status, branch, reports_to
    ) VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [employee_name, role, phone, email, todays_working_status, branch, reports_to],
    (err, result) => {
      if (err) {
        console.error('Error adding employee:', err);
        return res.status(500).json({ error: 'Error adding employee' });
      }
      res.status(201).json({ message: 'Employee added successfully', id: result.insertId });
    }
  );
});

app.put('/api/employees/:id', (req, res) => {
  const { id } = req.params;
  const {
    employee_name, role, phone, email, todays_working_status, branch, reports_to
  } = req.body;

  const sql = `
    UPDATE employee_details SET
      employee_name = ?, role = ?, phone = ?, email = ?, todays_working_status = ?, branch = ?, reports_to = ?
    WHERE id = ?
  `;

  db.query(
    sql,
    [employee_name, role, phone, email, todays_working_status, branch, reports_to, id],
    (err, result) => {
      if (err) {
        console.error('Error updating employee:', err);
        return res.status(500).json({ error: 'Error updating employee' });
      }
      res.status(200).json({ message: 'Employee updated successfully' });
    }
  );
});


app.delete('/api/employees/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM employee_details WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error deleting employee:', err);
      return res.status(500).json({ error: 'Error deleting employee' });
    }
    res.status(200).json({ message: 'Employee deleted successfully' });
  });
});

app.get('/api/unique-options', (req, res) => {
  const query = `
    SELECT
      DISTINCT Client_Name AS clients,
      Main_Category AS mainCategories,
      Service_Name AS services
    FROM single_invoice;
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching unique options:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    const uniqueOptions = {
      clients: [...new Set(results.map(row => row.clients))],
      mainCategories: [...new Set(results.map(row => row.mainCategories))],
      services: [...new Set(results.map(row => row.services))]
    };

    res.json(uniqueOptions);
  });
});

// Endpoint to fetch filtered data
app.post('/api/filtered-data', (req, res) => {
  const { client, serviceMainCategory, services } = req.body;

  let query = 'SELECT * FROM single_invoice WHERE 1=1';
  const params = [];

  if (client) {
    query += ' AND Client_Name = ?';
    params.push(client);
  }

  if (serviceMainCategory) {
    query += ' AND Main_Category = ?';
    params.push(serviceMainCategory);
  }

  if (services) {
    query += ' AND Service_Name = ?';
    params.push(services);
  }

  db.query(query, params, (err, results) => {
    if (err) {
      console.error('Error fetching filtered data:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json(results);
  });
});

app.post('/api/birthday-report', (req, res) => {
  const { displayFor, branch, startDate, endDate, searchTerm } = req.body;

  let query = '';
  const params = [];

  if (displayFor === 'clients') {
    query = 'SELECT * FROM birthday_report WHERE 1=1';

    if (startDate && endDate) {
      const startMonthDay = startDate.slice(5); // Extract MM-DD
      const endMonthDay = endDate.slice(5); // Extract MM-DD
      query += ' AND (DATE_FORMAT(Date_of_Birth, "%m-%d") BETWEEN ? AND ?)';
      params.push(startMonthDay, endMonthDay);
    }
    if (searchTerm) {
      query += ' AND Name_of_Client LIKE ?';
      params.push(`%${searchTerm}%`);
    }
  } else if (displayFor === 'employees') {
    query = `
      SELECT
        employee_name,
        date_of_birth,
        phone,
        email,
        role,
        branch,
        status,
        todays_working_status,
        designation
      FROM employee_details
      WHERE 1=1
    `;
    
    if (startDate && endDate) {
      const startMonthDay = startDate.slice(5); // Extract MM-DD
      const endMonthDay = endDate.slice(5); // Extract MM-DD
      query += ' AND (DATE_FORMAT(date_of_birth, "%m-%d") BETWEEN ? AND ?)';
      params.push(startMonthDay, endMonthDay);
    }
    if (searchTerm) {
      query += ' AND employee_name LIKE ?';
      params.push(`%${searchTerm}%`);
    }
  }

  db.query(query, params, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json(results);
  });
});

app.get('/api/client-report', (req, res) => {
  const { branch, name } = req.query;

  let query = 'SELECT * FROM client_details WHERE 1=1';


  if (name && name !== 'All') {
    query += ` AND client_name = '${name}'`;
  }


  db.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json(results);
  });
});


app.get('/api/dsc-expiry', (req, res) => {
  const { startDate, endDate } = req.query;

  const query = `
    SELECT client, member_name, date_of_expiry
    FROM digital_signature
    WHERE date_of_expiry BETWEEN ? AND ?
  `;

  db.query(query, [startDate, endDate], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json(results);
  });
});

app.get('/api/unique-services', (req, res) => {
  const sql = 'SELECT DISTINCT Service_Name FROM single_invoice';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching services:', err);
      return res.status(500).json({ error: 'Error fetching services' });
    }
    res.json(results);
  });
});

app.get('/api/udin-report', (req, res) => {
  const { fromDate, toDate } = req.query;

  // Ensure fromDate and toDate are in the correct format
  const query = `
    SELECT * FROM udin_report
    WHERE Service_Completion_Date BETWEEN ? AND ?
  `;

  db.query(query, [fromDate, toDate], (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ error: "Database query failed" });
    }
    res.json(results);
  });
});

app.get('/api/billing-firms', (req, res) => {
  const query = 'SELECT DISTINCT Billing_Firm FROM tds_reconciliation_report';
  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.get('/api/financial-billing-firms', (req, res) => {
  const query = 'SELECT DISTINCT billing_firm FROM financial_details';
  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Endpoint to get financial year options
app.get('/api/financial-years', (req, res) => {
  const years = [];
  for (let year = 2024; year >= 2012; year--) {
    years.push(`${year}-${year + 1}`);
  }
  res.json(years);
});

// Endpoint to get filtered data
app.get('/api/tds-report', (req, res) => {
  const { billingFirm, financialYear } = req.query;
  let query = 'SELECT * FROM tds_reconciliation_report WHERE 1=1';

  if (billingFirm) {
    query += ` AND Billing_Firm = '${billingFirm}'`;
  }

  if (financialYear) {
    query += ` AND FY_from_which_bf = '${financialYear}'`;
  }

  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.get('/api/unique-clients-in-reconciliation', (req, res) => {
  const query = 'SELECT DISTINCT Client AS client_name FROM tds_reconciliation_report';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching clients:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.json(results);
  });
});

app.get('/api/tds-reconciliation', (req, res) => {
  const { clientName, startDate, endDate } = req.query;
  let query = 'SELECT * FROM tds_reconciliation_report WHERE 1=1';

  if (clientName) {
    query += ` AND Client = '${clientName}'`;
  }

  if (startDate && endDate) {
    query += ` AND Date BETWEEN '${startDate}' AND '${endDate}'`;
  }

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching reconciliation data:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.json(results);
  });
});

app.get('/api/sac-summary-report', (req, res) => {
  const query = 'SELECT * FROM sac_summary_report';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching SAC summary report:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json(results);
  });
});

app.get('/api/gst-summary-report', (req, res) => {
  const { billingFirm, startDate, endDate } = req.query;

  const query = `
    SELECT * FROM gst_summary_report
    WHERE Billing_Firm = ?
    AND Invoice_Date BETWEEN ? AND ?
  `;

  db.query(query, [billingFirm, startDate, endDate], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json(results);
  });
});

app.get('/api/agewise-analysis', (req, res) => {
  const { branch, billingProfile, asOnDate } = req.query;

  // Ensure the asOnDate is in the correct format
  const formattedAsOnDate = new Date(asOnDate).toISOString().split('T')[0];

  const query = `
    SELECT * FROM agewise_analysis
    WHERE Branch = ?
    AND Billing_Profile = ?
    AND Invoice_Date < ?
  `;

  db.query(query, [branch, billingProfile, formattedAsOnDate], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json(results);
  });
});

app.get('/api/all-client-outstanding', (req, res) => {
  const { billingFirm } = req.query;

  const query = `
    SELECT * FROM all_client_outstanding
    WHERE Billing_Firm = ?
  `;

  db.query(query, [billingFirm], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json(results);
  });
});


app.get('/api/client-dashboard', (req, res) => {
  const query = `SELECT * FROM client_dashboard`;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json(results);
  });
});

app.get('/api/invoices', (req, res) => {
  const { startDate, endDate, client, status, billingFirm } = req.query;
  let sql = 'SELECT * FROM invoices_or_outstanding WHERE 1=1';

  if (startDate && endDate) {
    sql += ` AND Date BETWEEN '${startDate}' AND '${endDate}'`;
  }
  if (client && client !== 'All') {
    sql += ` AND Client = '${client}'`;
  }
  if (status) {
    if (status === 'outstanding') {
      sql += ' AND Outstanding_Amount > 0';
    } else if (status === 'settled') {
      sql += ' AND Outstanding_Amount = 0';
    }
  }
  if (billingFirm) {
    sql += ` AND Billing_Firm = '${billingFirm}' ORDER BY Invoice_No DESC`;
  }

  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.get('/api/unique-invoice-clients', (req, res) => {
  const sql = 'SELECT DISTINCT Client AS client_name FROM invoices_or_outstanding';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.get('/api/billed-but-not-received', (req, res) => {
  const { startDate, endDate, client, billingFirm } = req.query;
  let sql = `
    SELECT * FROM invoices_or_outstanding
    WHERE Outstanding_Amount > 0
  `;

  if (startDate && endDate) {
    sql += ` AND Date BETWEEN '${startDate}' AND '${endDate}'`;
  }
  if (client && client !== 'All') {
    sql += ` AND Client = '${client}'`;
  }
  if (billingFirm && billingFirm !== 'All') {
    sql += ` AND Billing_Firm = '${billingFirm}'`;
  }

  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.get('/api/cancelled-invoices', (req, res) => {
  const { startDate, endDate, client, status, billingFirm } = req.query;
  let sql = `
    SELECT * FROM cancelled_invoice_list
    WHERE 1=1
  `;

  if (startDate && endDate) {
    sql += ` AND Date BETWEEN '${startDate}' AND '${endDate}'`;
  }
  if (client && client !== 'All') {
    sql += ` AND Client = '${client}'`;
  }
  if (status === 'outstanding') {
    sql += ' AND Outstanding_Amount > 0';
  } else if (status === 'settled') {
    sql += ' AND Outstanding_Amount = 0';
  }
  if (billingFirm && billingFirm !== 'All') {
    sql += ` AND Billing_Firm = '${billingFirm}'`;
  }

  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.get('/api/unique-non-billable-clients', (req, res) => {
  const sql = 'SELECT DISTINCT client_name FROM non_billable_services';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching unique clients:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    const clients = results.map(row => row.client_name);
    res.json(clients);
  });
});

// Endpoint to fetch unique main categories
app.get('/api/unique-non-billable-main-categories', (req, res) => {
  const sql = 'SELECT DISTINCT main_category FROM non_billable_services';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching unique main categories:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    const mainCategories = results.map(row => row.main_category);
    res.json(mainCategories);
  });
});

// Endpoint to fetch unique services
app.get('/api/unique-non-billable-services', (req, res) => {
  const sql = 'SELECT DISTINCT service_name FROM non_billable_services';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching unique services:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    const services = results.map(row => row.service_name);
    res.json(services);
  });
});

// Endpoint to fetch filtered data
app.get('/api/non-billable-services', (req, res) => {
  const { client, serviceMainCategory, services, startDate, endDate } = req.query;
  let sql = 'SELECT * FROM non_billable_services WHERE 1=1';

  if (client) {
    sql += ` AND client_name = '${client}'`;
  }
  if (serviceMainCategory) {
    sql += ` AND main_category = '${serviceMainCategory}'`;
  }
  if (services) {
    sql += ` AND service_name = '${services}'`;
  }
  if (startDate && endDate) {
    sql += ` AND completion_date BETWEEN '${startDate}' AND '${endDate}'`;
  }

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching filtered data:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json(results);
  });
});

app.get('/api/services-triggered-but-not-allotted-count', (req, res) => {
  const sql = 'SELECT COUNT(*) AS count FROM services_triggered_but_not_alloted';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching services triggered but not allotted count:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json(results[0]);
  });
});

// Endpoint to get the count of all services
app.get('/api/single-invoice-count', (req, res) => {
  const sql = 'SELECT COUNT(*) AS count FROM single_invoice';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching all services count:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json(results[0]);
  });
});

app.get('/api/cancelled-receipts', (req, res) => {
  const query = 'SELECT * FROM cancelled_receipt_list';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching cancelled receipts:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json(results);
  });
});

app.get('/api/unique-cancelled-list-clients', (req, res) => {
  const query = 'SELECT DISTINCT Client_Name FROM cancelled_receipt_list';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching unique clients:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    // Map the results to an array of client names
    const clients = results.map(row => row.Client_Name);
    res.json(clients);
  });
});

app.get('/api/unique-receipt-clients', (req, res) => {
  const query = `SELECT DISTINCT client_name FROM receipt_list ORDER BY client_name ASC`;

  db.query(query, (err, results) => {
      if (err) {
          console.error("Error fetching unique clients:", err);
          return res.status(500).json({ error: "Internal Server Error" });
      }
      res.json(results);
  });
});

app.get('/api/receipt-list', (req, res) => {
  const { startDate, endDate, clients, billingFirm } = req.query;

  let query = 'SELECT * FROM receipt_list WHERE 1=1';

  const params = [];

  if (startDate) {
    query += ' AND date >= ?';
    params.push(startDate);
  }

  if (endDate) {
    query += ' AND date <= ?';
    params.push(endDate);
  }

  if (clients) {
    query += ' AND client_name = ?';
    params.push(clients);
  }

  if (billingFirm) {
    query += ' AND billing_firm = ?';
    params.push(billingFirm);
  }

  query += ' ORDER BY date DESC';

  db.query(query, params, (err, results) => {
    if (err) {
      console.error("Error fetching receipt list:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.json(results);
  });
});

app.get('/api/unique-occupancy-employees', (req, res) => {
  const query = 'SELECT DISTINCT Name_of_the_Employee FROM staff_occupancy_report';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    const employees = results.map(row => row.Name_of_the_Employee);
    res.json(employees);
  });
});

app.get('/api/unique-occupancy-clients', (req, res) => {
  const query = 'SELECT DISTINCT Client_Name FROM staff_occupancy_report';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    const clients = results.map(row => row.Client_Name);
    res.json(clients);
  });
});

app.get('/api/staff-occupancy', (req, res) => {
  const { employee, client } = req.query;
  let query = 'SELECT * FROM staff_occupancy_report WHERE 1=1';
  if (employee) {
    query += ` AND Name_of_the_Employee = '${employee}'`;
  }
  if (client) {
    query += ` AND Client_Name = '${client}'`;
  }
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});


app.post('/api/save-icai-data', (req, res) => {
  const {
    letterName,
    clientName,
    financialYear,
    noteX,
    frn,
    firmName,
    personForSign,
    dateOfSignature,
    placeOfSignature,
    designation,
    udinNumber
  } = req.body;

  const query = `
    INSERT INTO icai (
      letterName, clientName, financialYear, noteX, frn, firmName,
      personForSign, dateOfSignature, placeOfSignature, designation, udinNumber
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [
      letterName,
      clientName,
      financialYear,
      noteX,
      frn,
      firmName,
      personForSign,
      dateOfSignature,
      placeOfSignature,
      designation,
      udinNumber
    ],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: 'Data saved successfully', results });
    }
  );
});

app.get('/api/icai-data', (req, res) => {
  const { letterName } = req.query;
  const query = 'SELECT * FROM icai WHERE letterName = ?';

  db.query(query, [letterName], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

app.put('/api/client-details/:clientCode', (req, res) => {
  const { clientCode } = req.params;
  const { client_name, client_group, branch, email, phone, constitution, client_pan, client_tan, client_gstin, industry, date_of_incorporation, address_line_1, address_line_2, area, city, state, district, pincode, services } = req.body;

  const query = `
    UPDATE client_details
    SET client_name = ?, client_group = ?, branch = ?, email = ?, phone = ?, constitution = ?, client_pan = ?, client_tan = ?, client_gstin = ?, industry = ?, date_of_incorporation = ?, address_line_1 = ?, address_line_2 = ?, area = ?, city = ?, state = ?, district = ?, pincode = ?, services = ?
    WHERE client_code = ?;
  `;

  db.query(query, [client_name, client_group, branch, email, phone, constitution, client_pan, client_tan, client_gstin, industry, date_of_incorporation, address_line_1, address_line_2, area, city, state, district, pincode, services, clientCode], (err, result) => {
    if (err) {
      console.error('Error updating client:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    res.json({ message: 'Client updated successfully' });
  });
});

// Delete client
app.delete('/api/client-details/:id', (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM client_details WHERE id = ?';

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error deleting client:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    res.json({ message: 'Client deleted successfully' });
  });
});

// Add new service
app.post('/api/add-service', (req, res) => {
  const { serviceName } = req.body;

  const query = 'INSERT INTO single_invoice (Service_Name) VALUES (?)';

  db.query(query, [serviceName], (err, result) => {
    if (err) {
      console.error('Error adding service:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    res.json({ serviceName });
  });
});

app.get('/api/max-receipt-no', (req, res) => {
  const billingFirm = req.query.billingFirm;

  if (!billingFirm) {
    return res.status(400).json({ error: 'Billing firm is required' });
  }

  // Get prefix for the billing firm
  let prefix = '';
  if (billingFirm === 'HIRANANDANI AND ASSOCIATES') {
    prefix = 'HA';
  } 
  else if (billingFirm === 'Hiranandani And Co') {
    prefix = 'HC';
  }
    else if (billingFirm === 'Oyster Management Consultants Private Limited') {
      prefix = 'O';
    }
      else if (billingFirm === 'RIA ENTERPRISES') {
        prefix = 'RE';
    }

    else if (billingFirm === 'ANJANA ENTERPRISES') {
      prefix = 'AE';
  }
  else {
    // Create a prefix from the first letters of each word
    prefix = billingFirm.split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  }

  // Count the number of receipts for this billing firm
  const query = `
    SELECT COUNT(*) AS receiptCount
    FROM receipt_list
    WHERE billing_firm = ?
  `;

  db.query(query, [billingFirm], (err, results) => {
    if (err) {
      console.error('Error counting receipts:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    // Get the count from the results
    const count = results[0].receiptCount || 0;
    
    // The new receipt number will be the count + 1
    let nextNumber=0;
    if(billingFirm === 'RIA ENTERPRISES'){
      nextNumber = count + 2;
    }
    else{
      nextNumber = count + 1;
    }
    
    // Format it with the prefix and zero-padding
    const newReceiptNo = `${prefix}-${nextNumber.toString().padStart(2, '0')}`;
    
    res.json({ maxReceiptNo: newReceiptNo, prefix, count: nextNumber });
  });
});


app.get('/api/service-main', (req, res) => {
  db.query('SELECT * FROM service_main_category', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// Add a new service
app.post('/api/service-main', (req, res) => {
  const { service_name, dependent_services, gst_billing_categories } = req.body;
  db.query(
    'INSERT INTO service_main_category (service_name, dependent_services, gst_billing_categories) VALUES (?, ?, ?)',
    [service_name, dependent_services, gst_billing_categories],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: 'Service added successfully' });
    }
  );
});

// Update a service
app.put('/api/service-main/:id', (req, res) => {
  const { service_name } = req.body;
  db.query(
    'UPDATE service_main_category SET service_name = ? WHERE id = ?',
    [service_name, req.params.id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: 'Service updated successfully' });
    }
  );
});

// Delete a service
app.delete('/api/service-main/:id', (req, res) => {
  db.query('DELETE FROM service_main_category WHERE id = ?', [req.params.id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Service deleted successfully' });
  });
});

app.get("/api/categories", (req, res) => {
  const sql = "SELECT * FROM gst_billing_categories";
  db.query(sql, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(result);
    }
  });
});

// Add a new GST Billing Category
app.post("/api/categories", (req, res) => {
  const { gst_billing_category, sac_code, igst_18, cgst_9, sgst_9 } = req.body;
  
  if (!gst_billing_category || !sac_code || !igst_18 || !cgst_9 || !sgst_9) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const sql =
    "INSERT INTO gst_billing_categories (gst_billing_category, sac_code, igst_18, cgst_9, sgst_9) VALUES (?, ?, ?, ?, ?)";
  db.query(sql, [gst_billing_category, sac_code, igst_18, cgst_9, sgst_9], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ message: "Added successfully" });
    }
  });
});

// Update an existing GST Billing Category
app.put("/api/categories/:id", (req, res) => {
  const { id } = req.params;
  const { gst_billing_category, sac_code, igst_18, cgst_9, sgst_9 } = req.body;

  const sql =
    "UPDATE gst_billing_categories SET gst_billing_category = ?, sac_code = ?, igst_18 = ?, cgst_9 = ?, sgst_9 = ? WHERE id = ?";
  db.query(
    sql,
    [gst_billing_category, sac_code, igst_18, cgst_9, sgst_9, id],
    (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({ message: "Updated successfully" });
      }
    }
  );
});

// Delete a GST Billing Category
app.delete("/api/categories/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM gst_billing_categories WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ message: "Deleted successfully" });
    }
  });
});

app.get('/api/billing-profiles', (req, res) => {
  const sql = 'SELECT * FROM billing_profile';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching billing profiles:', err);
      res.status(500).json({ error: 'Error fetching billing profiles' });
      return;
    }
    res.json(results);
  });
});

// Get a single billing profile by ID
app.get('/api/billing-profiles/:id', (req, res) => {
  const { id } = req.params;
  const sql = `
    SELECT 
      id,
      firm_type AS firmType, 
      name, 
      contact_number AS contactNumber, 
      email_id AS emailId, 
      partner_email_id AS partnerEmailId, 
      address_line1 AS addressLine1, 
      address_line2 AS addressLine2, 
      city, 
      state, 
      district, 
      pincode, 
      pan, 
      gst, 
      cin, 
      udyam_registration AS udyamRegistration, 
      msme_category AS msmeCategory, 
      reminder_days AS reminderDays, 
      credit_period AS creditPeriod, 
      account_no AS accountNo, 
      ifsc_code AS ifscCode, 
      bank_name AS bankName, 
      branch, 
      upi_id AS upiId, 
      billing_series AS billingSeries, 
      financial_year AS financialYear, 
      receipt_no_starts_at AS receiptNoStartsAt, 
      width_of_numerical_part AS widthOfNumericalPart, 
      prefill_with_zero AS prefillWithZero, 
      prefix, 
      suffix, 
      prefix_applicable_from AS prefixApplicableFrom, 
      suffix_applicable_from AS suffixApplicableFrom,
      status
    FROM billing_profile 
    WHERE id = ?
  `;

  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error('Error fetching billing profile:', err);
      res.status(500).json({ error: 'Error fetching billing profile' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: 'Billing profile not found' });
      return;
    }
    res.json(results[0]);
  });
});

// Create a new billing profile
app.post('/api/billing-profiles', (req, res) => {
  const {
    firmType, name, contactNumber, emailId, partnerEmailId, addressLine1, addressLine2, city, state, district, pincode, pan, gst, cin, udyamRegistration, msmeCategory, reminderDays, creditPeriod, accountNo, ifscCode, bankName, branch, upiId, billingSeries, financialYear, receiptNoStartsAt, widthOfNumericalPart, prefillWithZero, prefix, suffix, prefixApplicableFrom, suffixApplicableFrom
  } = req.body;

  const sql = `INSERT INTO billing_profile (firm_type, name, contact_number, email_id, partner_email_id, address_line1, address_line2, city, state, district, pincode, pan, gst, cin, udyam_registration, msme_category, reminder_days, credit_period, account_no, ifsc_code, bank_name, branch, upi_id, billing_series, financial_year, receipt_no_starts_at, width_of_numerical_part, prefill_with_zero, prefix, suffix, prefix_applicable_from, suffix_applicable_from) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(sql, [firmType, name, contactNumber, emailId, partnerEmailId, addressLine1, addressLine2, city, state, district, pincode, pan, gst, cin, udyamRegistration, msmeCategory, reminderDays, creditPeriod, accountNo, ifscCode, bankName, branch, upiId, billingSeries, financialYear, receiptNoStartsAt, widthOfNumericalPart, prefillWithZero, prefix, suffix, prefixApplicableFrom, suffixApplicableFrom], (err, result) => {
    if (err) {
      console.error('Error creating billing profile:', err);
      res.status(500).json({ error: 'Error creating billing profile' });
      return;
    }
    res.status(201).json({ id: result.insertId, ...req.body });
  });
});

// Update a billing profile
app.put('/api/billing-profiles/:id', (req, res) => {
  const { id } = req.params;
  const {
    firmType, name, contactNumber, emailId, partnerEmailId, addressLine1, addressLine2, city, state, district, pincode, pan, gst, cin, udyamRegistration, msmeCategory, reminderDays, creditPeriod, accountNo, ifscCode, bankName, branch, upiId, billingSeries, financialYear, receiptNoStartsAt, widthOfNumericalPart, prefillWithZero, prefix, suffix, prefixApplicableFrom, suffixApplicableFrom
  } = req.body;

  const sql = `UPDATE billing_profile SET firm_type = ?, name = ?, contact_number = ?, email_id = ?, partner_email_id = ?, address_line1 = ?, address_line2 = ?, city = ?, state = ?, district = ?, pincode = ?, pan = ?, gst = ?, cin = ?, udyam_registration = ?, msme_category = ?, reminder_days = ?, credit_period = ?, account_no = ?, ifsc_code = ?, bank_name = ?, branch = ?, upi_id = ?, billing_series = ?, financial_year = ?, receipt_no_starts_at = ?, width_of_numerical_part = ?, prefill_with_zero = ?, prefix = ?, suffix = ?, prefix_applicable_from = ?, suffix_applicable_from = ? WHERE id = ?`;

  db.query(sql, [firmType, name, contactNumber, emailId, partnerEmailId, addressLine1, addressLine2, city, state, district, pincode, pan, gst, cin, udyamRegistration, msmeCategory, reminderDays, creditPeriod, accountNo, ifscCode, bankName, branch, upiId, billingSeries, financialYear, receiptNoStartsAt, widthOfNumericalPart, prefillWithZero, prefix, suffix, prefixApplicableFrom, suffixApplicableFrom, id], (err, result) => {
    if (err) {
      console.error('Error updating billing profile:', err);
      res.status(500).json({ error: 'Error updating billing profile' });
      return;
    }
    res.json({ id, ...req.body });
  });
});

// Delete a billing profile
app.delete('/api/billing-profiles/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM billing_profile WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error deleting billing profile:', err);
      res.status(500).json({ error: 'Error deleting billing profile' });
      return;
    }
    res.json({ message: 'Billing profile deleted successfully' });
  });
});

app.get('/api/services', (req, res) => {
  // Extract query parameters
  const {
    serviceMainCategory = '',
    searchTerm = ''
  } = req.query;

  // Construct the base query
  let query = `
    SELECT * FROM services
    WHERE 1=1
  `;
  const queryParams = [];

  // Add financial year filter

  // Add service main category filter
  if (serviceMainCategory) {
    query += ' AND ServiceMainCategory = ?';
    queryParams.push(serviceMainCategory);
  }

  // Add search term filter
  if (searchTerm) {
    query += ' AND ServiceName LIKE ?';
    queryParams.push(`%${searchTerm}%`);
  }

  // Execute the query
  db.query(query, queryParams, (err, results) => {
    if (err) {
      console.error('Error fetching services:', err);
      res.status(500).json({ error: 'Failed to fetch services' });
      return;
    }
    res.json(results);
  });
});


// Endpoint to add a new service
app.post('/api/services', (req, res) => {
  const {
    serviceMainCategory,
    serviceName,
    gstBillingCategory,
    dueDate,
    udin,
    noOfClients = 0,
  } = req.body;

  const query = `
    INSERT INTO services
    (ServiceMainCategory, ServiceName, GSTBillingCategory,
     DueDate, UDIN, NoOfClients)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  const values = [
    serviceMainCategory,
    serviceName,
    gstBillingCategory,
    dueDate ? 'YES' : 'NO',
    udin ? 'YES' : 'NO',
    noOfClients,
  ];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error adding service:', err);
      res.status(500).json({ error: 'Failed to add service' });
      return;
    }

    res.status(201).json({
      id: result.insertId,
      ...req.body
    });
  });
});

// Endpoint to update a service
app.put('/api/services/:id', (req, res) => {
  const { id } = req.params;
  const {
    serviceMainCategory,
    serviceName,
    gstBillingCategory,
    dueDate,
    udin,
  } = req.body;

  const query = `
    UPDATE services
    SET
      ServiceMainCategory = ?,
      ServiceName = ?,
      GSTBillingCategory = ?,
      DueDate = ?,
      UDIN = ?
    WHERE id = ?
  `;

  const values = [
    serviceMainCategory,
    serviceName,
    gstBillingCategory,
    dueDate ? 'YES' : 'NO',
    udin ? 'YES' : 'NO',
    id
  ];

  db.query(query, values, (err) => {
    if (err) {
      console.error('Error updating service:', err);
      res.status(500).json({ error: 'Failed to update service' });
      return;
    }

    res.json({ message: 'Service updated successfully' });
  });
});


// Endpoint to delete a service
app.delete('/api/services/:id', (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM services WHERE id = ?';

  db.query(query, [id], (err) => {
    if (err) {
      console.error('Error deleting service:', err);
      res.status(500).json({ error: 'Failed to delete service' });
      return;
    }

    res.json({ message: 'Service deleted successfully' });
  });
});


app.get('/api/services/main-categories', (req, res) => {
  const query = `
    SELECT DISTINCT ServiceMainCategory FROM services
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching service main categories:', err);
      res.status(500).json({ error: 'Failed to fetch service main categories' });
      return;
    }
    res.json(results.map(result => result.ServiceMainCategory));
  });
});

app.get('/api/services/gst-categories', (req, res) => {
  const query = `
    SELECT DISTINCT GSTBillingCategory FROM services
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching GST billing categories:', err);
      res.status(500).json({ error: 'Failed to fetch GST billing categories' });
      return;
    }
    res.json(results.map(result => result.GSTBillingCategory));
  });
});

// In your backend routes/controllers
app.get('/api/generate-invoice-number', (req, res) => {
  const { billingFirm } = req.query;

  // Map of billing firms to their invoice number prefixes
  const firmPrefixes = {
    'HIRANANDANI AND ASSOCIATES': 'A/24-25/',
    'Hiranandani And Co': 'A/24-25/',
    'Oyster Management Consultants Private Limited': 'OYS/24-25/',
    'RIA ENTERPRISES': 'R/24-25/'
  };

  // If billing firm is not in the predefined list, return manual entry flag
  if (!firmPrefixes[billingFirm]) {
    return res.json({ manualEntry: true });
  }

  // Construct the prefix
  const prefix = firmPrefixes[billingFirm];

  // Query to find the maximum invoice number for the specific billing firm
  const query = `
    SELECT MAX(CAST(SUBSTRING_INDEX(Invoice_No, '/', -1) AS UNSIGNED)) as maxNumber
    FROM invoices_or_outstanding 
    WHERE Invoice_No LIKE ? AND Billing_Firm = ?
  `;

  db.query(query, [`${prefix}%`, billingFirm], (err, results) => {
    if (err) {
      console.error('Error generating invoice number:', err);
      return res.status(500).json({ error: 'Could not generate invoice number' });
    }

    // Calculate the next invoice number
    const maxNumber = results[0] ? results[0].maxNumber || 0 : 0;
    const nextNumber = maxNumber + 1;
    const invoiceNumber = `${prefix}${nextNumber}`;

    res.json({ 
      invoiceNumber, 
      manualEntry: false 
    });
  });
});

app.post('/api/save-invoice', (req, res) => {
  const {
    Date,
    Invoice_No,
    Client,
    PAN_No,
    Gross_Amount,
    Discount_Amount,
    Service_Amount,
    Taxable_Claim_Amount,
    Total_Taxable_Amount,
    CGST,
    SGST,
    IGST,
    Non_Taxable_Amount,
    Total_Bill_Amount,
    Outstanding_Amount,
    Settled_Amount,
    Billing_Firm
  } = req.body;

  // SQL query to insert invoice
  const query = `
    INSERT INTO invoices_or_outstanding (
      date,
      Invoice_No,
      Client,
      PAN_No,
      Gross_Amount,
      Discount_Amount,
      Service_Amount,
      Taxable_Claim_Amount,
      Total_Taxable_Amount,
      CGST,
      SGST,
      IGST,
      Non_Taxable_Amount,
      Total_Bill_Amount,
      Outstanding_Amount,
      Settled_Amount,
      Billing_Firm
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  // Values array for parameterized query
  const values = [
    Date,
    Invoice_No,
    Client,
    PAN_No,
    Gross_Amount,
    Discount_Amount,
    Service_Amount,
    Taxable_Claim_Amount,
    Total_Taxable_Amount,
    CGST,
    SGST,
    IGST,
    Non_Taxable_Amount,
    Total_Bill_Amount,
    Outstanding_Amount,
    Settled_Amount,
    Billing_Firm
  ];

  // Execute the query
  db.query(query, values, (error, results) => {
    if (error) {
      console.error('Error saving invoice:', error);
      return res.status(500).json({ 
        success: false, 
        message: 'Failed to save invoice',
        error: error.message 
      });
    }

    res.json({ 
      success: true, 
      message: 'Invoice saved successfully', 
      invoiceId: results.insertId 
    });
  });
});


app.put('/api/invoices/:id', (req, res) => {
  const invoiceId = req.params.id;
  const { Date, Invoice_No, Client, Gross_Amount, Discount_Amount, Service_Amount, Taxable_Claim_Amount, Total_Taxable_Amount, CGST, SGST, IGST, Non_Taxable_Amount, Total_Bill_Amount, Outstanding_Amount, Settled_Amount } = req.body;
  const query = `
    UPDATE invoices_or_outstanding
    SET Date = ?, Invoice_No = ?, Client = ?, Gross_Amount = ?, Discount_Amount = ?, Service_Amount = ?, Taxable_Claim_Amount = ?, Total_Taxable_Amount = ?, CGST = ?, SGST = ?, IGST = ?, Non_Taxable_Amount = ?, Total_Bill_Amount = ?, Outstanding_Amount = ?, Settled_Amount = ?
    WHERE id = ?
  `;

  db.query(query, [Date, Invoice_No, Client, Gross_Amount, Discount_Amount, Service_Amount, Taxable_Claim_Amount, Total_Taxable_Amount, CGST, SGST, IGST, Non_Taxable_Amount, Total_Bill_Amount, Outstanding_Amount, Settled_Amount, invoiceId], (err, result) => {
    if (err) {
      res.status(500).send('Error updating invoice');
      return;
    }
    res.json({ id: invoiceId, ...req.body });
  });
});

// Delete an invoice by ID
app.delete('/api/invoices/:id', (req, res) => {
  const invoiceId = req.params.id;
  const query = 'DELETE FROM invoices_or_outstanding WHERE id = ?';

  db.query(query, [invoiceId], (err, result) => {
    if (err) {
      res.status(500).send('Error deleting invoice');
      return;
    }
    res.status(204).send();
  });
});
// ✅ Start Server
app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});
