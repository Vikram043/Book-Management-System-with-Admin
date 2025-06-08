const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'db.json');

function readBooks() {
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
}

function writeBooks(books) {
  fs.writeFileSync(filePath, JSON.stringify(books, null, 2), 'utf-8');
}

module.exports = { readBooks, writeBooks };
