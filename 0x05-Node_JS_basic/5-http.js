const http = require('http');
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
      for (const line of lines) {
        const [firstName, lastName, age, field] = line.split(',');
        if (firstName && lastName && age && field) {
          if (!studentsByField[field]) studentsByField[field] = [];
          studentsByField[field].push(firstName);
        }
      }

      const totalStudents = lines.length;
      let result = `Number of students: ${totalStudents}\n`;

      for (const [field, students] of Object.entries(studentsByField)) {
        result += `Number of students in ${field}: ${students.length}. List: ${students.join(', ')}\n`;
      }

      resolve(result.trim());
    });
  });
}

const app = http.createServer(async (req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('This is the list of our students\n');

    const databasePath = process.argv[2];
    if (!databasePath) {
      res.end('Cannot load the database');
      return;
    }

    try {
      const studentData = await countStudents(databasePath);
      res.end(studentData);
    } catch (error) {
      res.end(error.message);
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

app.listen(1245);

module.exports = app;
