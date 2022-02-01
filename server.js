const express = require("express");
const path = require("path");
const fs = require("fs");
const uuid = require("uuid");
let db = require("./db/db.json");

const PORT = process.env.PORT || 3001;

const app = express();

// Code for Middleware:
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// GET Notes res.json
app.get("/api/notes", (req, res) => {
    res.json(db);
  });

// GET Notes route
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

// else GET Index
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

// POST Notes
app.post("/api/notes", (req, res) => {
  const { id, title, text } = req.body;

  if (title && text) {
    const newNote = {
      id: uuid.v1(),
      title,
      text,
    };

    db.push(newNote);

    fs.writeFile("./db/db.json", JSON.stringify(db), (err) =>
      err
        ? console.error(err)
        : console.log(
            `${newNote.title} has been written to JSON file`
          )
    );

    res.status(201).json(`Note added successfully 🚀`);
  } else {
    res.error("Error in adding new note...");
  }
});

app.listen(PORT, () => console.log(`App listening at PORT: ${PORT} 🚀`));
