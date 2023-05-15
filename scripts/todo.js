const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Create a global array to store our to-do list items
let todoList = [];

// Middleware to parse incoming JSON data
app.use(bodyParser.json());

// Handle root URL ("/")
app.get('/', (req, res) => {
  res.send('Welcome to the Todo API!');
});

// Get all items from the to-do list
app.get('/todos', (req, res) => {
  res.json(todoList);
});

// Get a specific item from the to-do list
app.get('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todoItem = todoList.find(item => item.id === id);

  if (todoItem) {
    res.json(todoItem);
  } else {
    res.status(404).send('Todo item not found');
  }
});

// Add a new item to the to-do list
app.post('/todos', (req, res) => {
  const todoItem = {
    id: todoList.length + 1,
    task: req.body.task,
    completed: false
  };
  
  todoList.push(todoItem);
  res.status(201).json(todoItem);
});

// Update an existing item in the to-do list
app.put('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todoItem = todoList.find(item => item.id === id);

  if (todoItem) {
    todoItem.task = req.body.task || todoItem.task;
    todoItem.completed = req.body.completed || todoItem.completed;
    res.json(todoItem);
  } else {
    res.status(404).send('Todo item not found');
  }
});

// Delete an item from the to-do list
app.delete('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  todoList = todoList.filter(item => item.id !== id);
  res.sendStatus(204);
});

// Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
