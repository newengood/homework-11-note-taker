// import express
const express = require('express');

// Import our modular routers 
const notesRouter = require('./notes');

//instantiate express
const app = express();

// create route
app.use('/notes', notesRouter);

// export
module.exports = app;
