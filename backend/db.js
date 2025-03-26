import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'your-db-host',
  user: 'your-db-user',
  password: 'your-db-password',
  database: 'your-db-name',
  waitForConnections: true,
  connectionLimit: 5,  // Matches your max limit
  queueLimit: 0
});

export default pool;
