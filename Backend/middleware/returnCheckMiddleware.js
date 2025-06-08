const { readBooks } = require('../models/bookModel');

module.exports = (req, res, next) => {
  const { id } = req.params;
  const books = readBooks();
  const book = books.find(b => b.id == id);

  if (!book || !book.borrowedDate) {
    return res.status(400).json({ error: "Book not found or not borrowed" });
  }

  const borrowedDate = new Date(book.borrowedDate);
  const today = new Date();
  const diffDays = Math.floor((today - borrowedDate) / (1000 * 60 * 60 * 24));

  if (diffDays < 3) {
    return res.status(400).json({ error: "Book cannot be returned within 3 days of borrowing." });
  }

  next();
};
