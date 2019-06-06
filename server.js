const express = require('express');
const server = express();

// Dummy List
const Dogs = [
  {
    id: '0',
    name: 'Pumpkin',
    age: 7,
    breed: 'Golden Retriver'
  },
  {
    id: '1',
    name: 'Connie',
    age: 2,
    breed: 'Dalmatian'
  },
  {
    id: '2',
    name: 'Dipper',
    age: 11,
    breed: 'Chihuahua'
  }
];

// Get all dogs
server.get('/dogs', async (req, res) => {
  await res.json(Dogs);
});

// Get a specific dog by its id
server.get('/dogs/:id', async (req, res) => {
  await res.json(Dogs[req.params.id]);
});

// Add a new dog to the list
server.post('/dogs/new', async (req, res) => {
  await Dogs.push({
    id: '4',
    name: 'Valentine',
    age: 1,
    breed: 'Pug'
  });

  await res.json(Dogs);
});

// Update a dog already in the list
server.put('/dogs/:id', async (req, res) => {
  // Helper
  function changeName(id, name) {
    for (let dog in Dogs) {
      if (Dogs[dog].id == id) {
        Dogs[dog].name = name;
        break;
      }
    }
  }

  let updatedDogList = changeName(req.params.id, req.body.name);

  res.json(updatedDogList);
});

// Remove a dog from the list :(
server.delete('/dogs/:id', async (req, res) => {
  // Helper
  function removeDog(array, id) {
    return array.filter(function(element) {
      return element != id;
    });
  }

  let newDogList = removeDog(Dogs, req.params.id);

  res.json(newDogList);
});
