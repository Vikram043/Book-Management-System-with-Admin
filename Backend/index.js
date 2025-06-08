const express = require('express');
const fs = require('fs');
const path = require('path');
const adminRoutes = require('./routes/adminRoutes');
const readerRoutes = require('./routes/readerRoutes');
const loggerMiddleware = require('./middleware/loggerMiddleware');

const app = express();
app.use(express.json());
app.use(loggerMiddleware); 

app.use('/admin', adminRoutes);
app.use('/reader', readerRoutes);

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
