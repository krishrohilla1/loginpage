const mysql = require('mysql2');

// Create a connection to the database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',  // Use 'root' or your MySQL username
  password: 'krish1234',  // MySQL root password
  database: 'loginInfo'  // Your database name
});

// Connect to the MySQL server
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to MySQL database!');
});

// Example query to test the connection
connection.query('SELECT * FROM users', (err, results) => {
  if (err) {
    console.error('Query error:', err);
  } else {
    console.log('Query result:', results);
  }
});

// Close the connection
connection.end();
