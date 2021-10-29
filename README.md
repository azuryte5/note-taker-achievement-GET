# Note Taker Starter Code

AS A small business owner
I WANT to be able to write and save notes
SO THAT I can organize my thoughts and keep track of tasks I need to complete

Acceptance Criteria
GIVEN a note-taking application
WHEN I open the Note Taker
THEN I am presented with a landing page with a link to a notes page
WHEN I click on the link to the notes page
THEN I am presented with a page with existing notes listed in the left-hand column, plus empty fields to enter a new note title and the note’s text in the right-hand column
WHEN I enter a new note title and the note’s text
THEN a Save icon appears in the navigation at the top of the page
WHEN I click on the Save icon
THEN the new note I have entered is saved and appears in the left-hand column with the other existing notes
WHEN I click on an existing note in the list in the left-hand column
THEN that note appears in the right-hand column
WHEN I click on the Write icon in the navigation at the top of the page
THEN I am presented with empty fields to enter a new note title and the note’s text in the right-hand column

Things to do
HTML routes for
- get /notes should return notes.html
- get * should return index.html

Create 
- GET /api/notes should read db.json and return ALL saved json.
- POST /api/notes should receive a new note to save to body(!) and add to db.json and then return a new note to the client
- each note will need a unique id.
- add delete requests so add a delete route

Getting grading on 
- All front end connects to backend
- back-end stores notes with unique id's in a json file
- deployed to heroku
- deployed to live url, with no errors


