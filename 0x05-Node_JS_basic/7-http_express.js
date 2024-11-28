const express = require('express');
const fs = require('fs');

function countStudents(databasePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(databasePath, 'utf-8', (err, data) => {
      if (err) {
        return reject(new Error('Cannot load the database'));
      }

      const lines = data.split('\n').filter((line) => line.trim() !== '');
      lines.shift(); // Remove the header row

      const studentsByField = {};
      lines.forEach((line) => {
        const [firstName, lastName, age, field] = line.split(',');
        if (firstName && lastName && age && field) {
          if (!studentsByField[field]) studentsByField[field] = [];
          studentsByField[field].push(firstName);
        }
      });

      const totalStudents = lines.length;
      let result = `Number of students: ${totalStudents}\n`;

      for (const [field, students] of Object.entries(studentsByField)) {
        result += `Number of students in ${field}: ${students.length}. List: ${students.join(', ')}\n`;
      }

      resolve(result.trim());
    });
  });
}

const app = express();

// Define the root route
app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

// Define the /students route
app.get('/students', async (req, res) => {
  const databasePath = process.argv[2];

  if (!databasePath) {
    res.status(500).send('Cannot load the database');
    return;
  }

  try {
    const studentData = await countStudents(databasePath);
    res.send(`This is the list of our students\n${studentData}`);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Start the server
app.listen(1245, () => {
  console.log('Server is running on http://localhost:1245');
});

// Export the app
module.exports = app;
