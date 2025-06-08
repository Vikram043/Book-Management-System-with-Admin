const { readBooks, writeBooks } = require('../models/bookModel');

exports.addBook = (req, res) => {
  const books = readBooks();
  const newBook = { ...req.body, status: "available" };
  books.push(newBook);
  writeBooks(books);
  res.status(201).json({ message: "Book added successfully", book: newBook });
};

exports.getAllBooks = (req, res) => {
  const books = readBooks();
  res.json(books);
};

exports.updateBook = (req, res) => {
  const { id } = req.params;
  const books = readBooks();
  const book = books.find(book => book.id == id);

  if (!book) return res.status(404).json({ error: "Book not found" });

  Object.assign(book, req.body);
  writeBooks(books);
  res.json({ message: "Book updated successfully", book });
};

exports.deleteBook = (req, res) => {
  const { id } = req.params;
  let books = readBooks();
  books = books.filter(book => book.id != id);
  writeBooks(books);
  res.json({ message: "Book deleted successfully" });
};
