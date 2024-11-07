connection.query('SELECT * FROM users', (err, results) => {
  if (err) {
    console.error('Query error:', err);
  } else {
    console.log('Query result:', results);
  }
});