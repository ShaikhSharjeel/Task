const express = require('express'); // Import Express framework
const mysql = require('mysql2'); // Import MySQL library for database connection
const cors = require('cors'); // Import CORS to handle cross-origin requests
const bodyParser = require('body-parser'); // Import Body-Parser to parse JSON bodies

const app = express(); // Create an instance of an Express app
app.use(cors()); // Enable CORS for all requests
app.use(bodyParser.json()); // Parse incoming JSON requests

// MySQL connection setup
const db = mysql.createConnection({
  host: 'localhost', // MySQL host (usually localhost)
  user: 'root', // MySQL username (default is 'root')
  password: '1234', // MySQL password (empty if not set)
  database: 'banner_db' // Name of the database you will use
});

// Connect to MySQL database
db.connect(err => {
  if (err) throw err; // If there's an error, throw it
  console.log('MySQL Connected...');
});

// API endpoint to get the current banner data
app.get('/api/banner', (req, res) => {
  db.query('SELECT * FROM banner WHERE id = 1', (err, result) => {
    if (err) throw err; // If there's an error, throw it
    res.send(result[0]); // Send the first result as the response
  });
});

// API endpoint to update the banner data
app.post('/api/banner', (req, res) => {
  const { description, timer, link, visible } = req.body; // Destructure data from the request body
  db.query(
    'UPDATE banner SET description = ?, timer = ?, link = ?, visible = ? WHERE id = 1',
    [description, timer, link, visible], // Bind parameters to the query
    (err, result) => {
      if (err) throw err; // If there's an error, throw it
      res.send({ message: 'Banner updated successfully' }); // Send success message
    }
  );
});

// Start the server on port 5000
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
