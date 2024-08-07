// Create the table element
const table = document.createElement('table');
table.style.border = '3px solid black'; // set table border
table.style.width = '98%'; // set table width
table.style.marginTop = '50PX'
// Create the table headers
const headers = [
  'Student Name',
  'User ID',
  'Branch',
  'Course',
  'College Name',
  'Phone Number',
  'E-mail ID'
];

// Create the table header row
const headerRow = document.createElement('tr');
headers.forEach((header) => {
  const th = document.createElement('th');
  th.textContent = header;
  th.style.border = '1px solid black'; // set header cell border
  th.style.height = '2.5rem'; // set header cell height
  headerRow.appendChild(th);
});

// Add the header row to the table
table.appendChild(headerRow);

// Fetch data from backend API
fetch('https://example.com/api/students')
  .then(response => response.json())
  .then(data => {
    // Loop through the data and create table rows
    data.forEach(student => {
      const row = document.createElement('tr');
      headers.forEach((header, index) => {
        const td = document.createElement('td');
        td.textContent = student[index];
        td.style.border = '1px solid black'; // set cell border
        row.appendChild(td);
      });
      table.appendChild(row);
    });
  })
  .catch(error => console.error('Error fetching data:', error));

// Add the table to the page
// document.body.appendChild(table);
var userDetailsDiv = document.getElementById('userDetails');
    userDetailsDiv.appendChild(table);