const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres', // PostgreSQL username
  host: 'localhost', // Server hostname
  database: 'PACE_System', // Replace with your database name
  password: 'Vamsi@123', // PostgreSQL password
  port: 5433, // Default PostgreSQL port
});

module.exports = pool;
