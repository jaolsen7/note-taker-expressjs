const express = require("express");
const path = require("path");
const fs = require("fs");
const uuid = require("uuid");
var db = require("./db/db.json");

const PORT = process.env.PORT || 3001;

const app = express();

// Code for Middleware:
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// GET Notes route
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

// GET Notes res.json from db
app.get("/api/notes", (req, res) => {
  res.json("./db/db.json");
});

// POST Notes (DO I NEED TO PARSE SOMETHING????)
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

// else GET Index, should go last
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

app.listen(PORT, () => console.log(`App listening at PORT: ${PORT} 🚀`));
