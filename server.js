const fs = require('fs');
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;
const { nanoid } = require('nanoid');

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.delete("/api/notes/:id", (req, res) =>{
  const trashBinArray = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'))

  const result = trashBinArray.filter(function(notes) {
   if (notes.id !== req.params.id) {
     return true;
   }})
  res.json(result);
  console.log(trashBinArray)
  console.log(result);
  fs.writeFileSync(
    path.join(__dirname, './db/db.json'),
    JSON.stringify(result, null, 2)
    )
});

app.get('/api/notes', (req, res) => {
  let currentNotes = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
  res.json(currentNotes);
  });

app.post('/api/notes' , (req, res) => {
  const newNote = req.body
  newNote.id = nanoid();
  let currentNotes = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'))
  currentNotes.push(newNote)
  fs.writeFileSync(
    path.join(__dirname, './db/db.json'),
    JSON.stringify(currentNotes, null, 2)
    )
  res.json(currentNotes);
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/notes.html'))
  
});

app.get('/', (req,res) =>{
  res.sendFile(path.join(__dirname, 'public/index.html'));
});


app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
