// import libraries
const express = require('express');
const path = require('path');

// import routes
const api = require("./routes/index.js");

// instantiate express
const app = express();
//create port
const PORT = process.env.PORT || 3001;

// parse json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// create api route
app.use("/api", api);

// GET route for notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);

// GET route for homepage
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);

// listen on port
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
