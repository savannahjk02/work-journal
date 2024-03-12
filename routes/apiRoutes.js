const express = require('express');
const router = express.Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// Read notes from the db.json file
router.get('/notes', (req, res) => {
  const notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
  res.json(notes);
});

// Add a new note to the db.json file
router.post('/notes', (req, res) => {
  const newNote = req.body;
  newNote.id = uuidv4();

  const notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
  notes.push(newNote);

  fs.writeFileSync('./db/db.json', JSON.stringify(notes));
  
  res.json(newNote);
});

module.exports = router;


// DELETE a note with a specific id
router.delete('/notes/:id', (req, res) => {
    const noteId = req.params.id;
  
    let notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
    notes = notes.filter(note => note.id !== noteId);
  
    fs.writeFileSync('./db/db.json', JSON.stringify(notes));
    
    res.json({ message: 'Note deleted successfully' });
  });
  