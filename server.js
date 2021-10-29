const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;
const notes = require('./db/db.json');

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
    console.log(notes)
  });

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/notes.html'))
});

app.get('/', (req,res) =>{
  res.sendFile(path.join(__dirname, 'public/index.html'));

});