const { readBooks, writeBooks } = require('../models/bookModel');
const transactionLogger = require('../middleware/transactionLogger');

exports.getAvailableBooks = (req, res) => {
  const books = readBooks();
  const availableBooks = books.filter(book => book.status === 'available');
  res.json(availableBooks);
};

exports.borrowBook = (req, res) => {
  const { id } = req.params;
  const { readerName } = req.body;
  const books = readBooks();
  const book = books.find(b => b.id == id);

  if (!book) return res.status(404).json({ error: "Book not found" });
  if (book.status === "borrowed") return res.status(400).json({ error: "Book already borrowed" });

  book.status = "borrowed";
  book.borrowedBy = readerName;
  book.borrowedDate = new Date().toISOString().split('T')[0];

  writeBooks(books);
  transactionLogger.log(`${readerName} borrowed "${book.title}"`);
  res.json({ message: "Book borrowed successfully", book });
};

exports.returnBook = (req, res) => {
  const { id } = req.params;
  const books = readBooks();
  const book = books.find(b => b.id == id);

  if (!book) return res.status(404).json({ error: "Book not found" });

  book.status = "available";
  delete book.borrowedBy;
  delete book.borrowedDate;

  writeBooks(books);
  transactionLogger.log(`${req.body.readerName} returned "${book.title}"`);
  res.json({ message: "Book returned successfully", book });
};
