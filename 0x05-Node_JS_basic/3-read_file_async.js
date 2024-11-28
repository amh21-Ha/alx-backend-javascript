const fs = require('fs');

function countStudents(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf-8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }

      try {
        const rows = data.trim().split('\n');
        const header = rows[0].split(',');
        const students = rows
          .slice(1)
          .map((row) => row.split(','))
          .filter((row) => row.length === header.length);

        console.log(`Number of students: ${students.length}`);
        const fields = {};

        students.forEach((student) => {
          const field = student[3];
          const firstname = student[0];

          if (!fields[field]) {
            fields[field] = [];
          }

          fields[field].push(firstname);
        });

        Object.entries(fields).forEach(([field, names]) => {
          console.log(
            `Number of students in ${field}: ${names.length}. List: ${names.join(', ')}`,
          );
        });

        resolve();
      } catch (parseError) {
        reject(new Error('Cannot load the database'));
      }
    });
  });
}

module.exports = countStudents;
