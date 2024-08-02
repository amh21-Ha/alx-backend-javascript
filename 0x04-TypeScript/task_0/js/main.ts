interface Student {
  firstName: string;
  lastName: string;
  age: number;
  location: string;
}

const student1: Student = {
  firstName: "John",
  lastName: "Doe",
  age: 20,
  location: "New York"
};

const student2: Student = {
  firstName: "Jane",
  lastName: "Smith",
  age: 22,
  location: "Los Angeles"
};

const studentsList: Student[] = [student1, student2];

const table = document.createElement('table');
const headerRow = document.createElement('tr');

const headers = ['First Name', 'Location'];
headers.forEach(headerText => {
  const header = document.createElement('th');
  const textNode = document.createTextNode(headerText);
  header.appendChild(textNode);
  headerRow.appendChild(header);
});

table.appendChild(headerRow);

studentsList.forEach(student => {
  const row = document.createElement('tr');
  Object.keys(student).forEach(key => {
    if (key === 'firstName' || key === 'location') {
      const cell = document.createElement('td');
      const textNode = document.createTextNode(student[key]);
      cell.appendChild(textNode);
      row.appendChild(cell);
    }
  });
  table.appendChild(row);
});

document.body.appendChild(table);
