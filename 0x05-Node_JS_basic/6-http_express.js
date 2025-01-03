const express = require('express');

// Create an Express application
const app = express();

// Define the endpoint for "/"
app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

// Make the server listen on port 1245
app.listen(1245, () => {
  console.log('Server is running on http://localhost:1245');
});

// Export the app
module.exports = app;
