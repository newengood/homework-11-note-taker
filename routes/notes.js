// import libraries
const nr = require('express').Router();
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

// GET route to return saved notes as JSON
nr.get("/", (req, res) => {
    readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

// POST route to add to db and returns new note
nr.post("/", (req, res) => {
    // destructure req.body
    const { title, text } = req.body;

    // if note is complete
    if (title, text) {
        const newNote = {
            title,
            text,
            id: uuid(),
        };

    // add new note to database
    readAndAppend(newNote, "./db/db.json");

    // create response
    const response = {
        status: "success",
        body: newNote,
    };

    // send response
    res.json(response);
    } else {
        res.json("Error in creating new note");
    }
});

// handle delete request of notes
nr.delete("/:id", (req, res) => {
    // read database
    readFromFile("./db/db.json").then((data) => {
        // parse database if exists
        let db = [];
        if (data.length > 0) {
            db = JSON.parse(data);
        }

        // match id of requested note to database and find index
        const remove = db.find(e => e.id === req.params.id);
        const index = db.indexOf(remove);

        // remove note
        db.splice(index, 1);

        // replace database
        writeToFile("./db/db.json", db);
        
        const response = {
            status: "success",
            body: db
        }
        res.json(response);
    })
});

module.exports = nr;