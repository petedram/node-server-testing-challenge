const express = require("express");

const Hobbits = require("../hobbits/hobbitsModel.js");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

server.get("/hobbits", (req, res) => {
  Hobbits.getAll()
    .then(hobbits => {
      res.status(200).json(hobbits);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

server.post('/hobbits', (req, res) => {
  Hobbits.insert(req.body)
  .then(hobbits => {
    res.status(200).json(hobbits);
  })
  .catch(error => {
    res.status(500).json(error);
  });
})

server.delete('/hobbits/:id', (req, res) => {
  Hobbits.remove(req.params.id)
  .then(count => {
    if (count > 0) {
    res.status(200).json({ message: 'has been removed' });
    } else {
    res.status(404).json({ message: 'the specified ID does not exist.' });
    }
  })
  .catch(error => {
    // log error to database
    console.log(error);
    res.status(500).json({ message: 'Could not be removed' });
  }); 
})




module.exports = server;
