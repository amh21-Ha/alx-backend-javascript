const fs = require('fs');

function countStudents(path) {
  try {
    // Read the file synchronously
    const data = fs.readFileSync(path, 'utf-8').trim();

    // Split file content into rows
    const rows = data.split('\n');

    // Check if the file has a header and data
    if (rows.length < 2) {
      console.log('Number of students: 0');
      return;
    }

    // Extract the header and student data
    const header = rows[0].split(',');
    const students = rows.slice(1).map((row) => row.split(',')).filter((row) => row.length === header.length);

    // Count total students
    console.log(`Number of students: ${students.length}`);

    // Group students by their field
    const fields = {};
    for (const student of students) {
      const field = student[3]; // Assuming the 4th column is the field
      const firstname = student[0]; // Assuming the 1st column is the first name
      if (!fields[field]) {
        fields[field] = [];
      }
      fields[field].push(firstname);
    }

    // Log the number of students and their names per field
    for (const [field, names] of Object.entries(fields)) {
      console.log(`Number of students in ${field}: ${names.length}. List: ${names.join(', ')}`);
    }
  } catch (error) {
    // Handle file read errors
    throw new Error('Cannot load the database');
  }
}

// Export the function for testing or external usage
module.exports = countStudents;
