const express = require('express');
const path = require('path');
const fs = require('fs');
const util = require('util');
const { readFromFile, writeToFile, readAndAppend } = require('./helpers/fsUtils.js');

const PORT = process.env.PORT || 3001;

const app = express();

// Code for Middleware:
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// GET Notes route
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// GET Notes res.json from db
app.get('/api/notes', (req, res) => {
    res.json('/db/db.json')
});

// POST Notes
app.post('/api/notes', (req, res) => {
    const { id, title, text } = req.body;

    if (id && title && text) {
        const newNote = {
            id,
            title,
            text,
          };
          // Function to read file, parse json, push to array, stringify array, write file
          readAndAppend(newNote, '/db/db.json');
          res.json(`Note added successfully 🚀`);
        } else {
          res.error('Error in adding tip');
        }
});

// else GET Index, should go last
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at PORT: ${PORT} 🚀`)
);