const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const notes = require('./db/db.json');

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
    console.log(notes)
  });

app.get('/', (req, res) => {
  res.json(notes)
});

