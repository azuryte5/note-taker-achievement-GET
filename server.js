const fs = require('fs');
const express = require('express');
const { fstat } = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;
const notes = require('./db/db.json');
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
const { nanoid } = require('nanoid')
// function createNewNote(body, noteArray) {
//   const note= body;
//   noteArray.push(note);
//   fs.writeFileSync(path.join(__dirname, '.db/db.json'),
//   JSON.stringify({noteTitle: noteArray}, null, 2)
//   );
//   return note;  
// }

function makeNewNote (body, notesArray){
const note = body
note.id = nanoid()
notesArray.push(note)
fs.writeFileSync(
  path.join(__dirname, './db/db.json'),
  JSON.stringify(notesArray, null, 2));

  return note;
}

app.post('/notes' , (req, res) => {
  const note = makeNewNote(req.body, notes);
  res.json(note);
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/notes.html'))
  
});

app.get('/api/notes', (req, res) => {
res.json(notes);
});



app.get('/', (req,res) =>{
  res.sendFile(path.join(__dirname, 'public/index.html'));
});


app.get('/api/notes', (req, res) => {
  const chosen = req.body;

  console.log(res.json(chosen));
});

app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
  console.log(notes)
});
