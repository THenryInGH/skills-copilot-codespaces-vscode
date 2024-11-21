// Create web server

// Import modules
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

// Create web server
const app = express();

// Middleware
app.use(bodyParser.json());

// Load comments from file
let comments = [];
fs.readFile('comments.json', 'utf8', (err, data) => {
  if (!err) {
    comments = JSON.parse(data);
  }
});

// Get all comments
app.get('/comments', (req, res) => {
  res.json(comments);
});

// Add new comment
app.post('/comments', (req, res) => {
  const newComment = req.body;
  comments.push(newComment);
  fs.writeFile('comments.json', JSON.stringify(comments), err => {
    if (err) {
      res.status(500).send('Error saving comment');
    } else {
      res.status(201).send(newComment);
    }
  });
});

// Start web server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});