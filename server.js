const fs = require('fs');
const express = require('express');
const { fstat } = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;
const { nanoid } = require('nanoid');

//redundent somehow
const notes = require('./db/db.json');

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.delete("/api/notes/:id", (req, res) =>{
  const result = notes.filter(function(notes) {
   if (notes.id === req.params.id) {
     return true;
   }})
  res.json(result);
  console.log(result);
 
  console.log(notes)
  fs.writeFileSync(
    path.join(__dirname, './db/db.json'),
    JSON.stringify(notes, null, 2)
    )
});

app.get('/api/notes', (req, res) => {
  let currentNotes = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
  console.log("My Notes ..." + JSON.stringify(currentNotes));
  res.json(currentNotes);
  });

function makeNewNote (body, notesArray){
const note = body;
note.id = nanoid();
notesArray.push(note);
fs.writeFileSync(
  path.join(__dirname, './db/db.json'),
  JSON.stringify(notesArray, null, 2)
  );
  return note;
}

app.post('/api/notes' , (req, res) => {
  const note = makeNewNote(req.body, notes);
  res.json(note);
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/notes.html'))
  
});
app.post('/api/notes', (req, res) => {
  res.json(notes)
  })

// function findById(id, notesArray) {
//   const result = notesArray.filter(notesArray.id === id)[0];
//   return result;
// } 


app.get('/', (req,res) =>{
  res.sendFile(path.join(__dirname, 'public/index.html'));
});


app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
  // console.log(notes)
});
