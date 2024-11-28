import fs from 'fs';

export function readDatabase(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) {
        return reject(new Error('Cannot load the database'));
      }

      const lines = data.split('\n').filter((line) => line.trim() !== '');
      const header = lines.shift(); // Remove the header row
      const studentsByField = {};

      lines.forEach((line) => {
        const [firstname, lastname, age, field] = line.split(',');
        if (firstname && field) {
          if (!studentsByField[field]) {
            studentsByField[field] = [];
          }
          studentsByField[field].push(firstname);
        }
      });

      resolve(studentsByField);
    });
  });
}
