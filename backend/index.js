import express from "express";
import {PORT, mongoDBURL} from "./config.js";
import mongoose from "mongoose";
import { toDo } from "./models/todoModel.js";
import cors from "cors";

const app = express()

app.use(express.json());

app.use(cors());

app.get('/', (request, response) => {
    console.log(request)
    return response.status(234).send('Hi');
});

//Route to create new todo

app.post('/todo', async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.category ||
            !request.body.text
        ) {
            return response.status(400).send({
                message: 'All fields are required',
            });
        }
        const newTodo = {
            title: request.body.title,
            category: request.body.category,
            text: request.body.text,
        };
        const todo = await toDo.create(newTodo);
        return response.status(201).send(todo);
    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

// Route to get all todo from database
app.get('/todo', async (request, response) => {
    try {
        const todos = await toDo.find({});
        return response.status(200).json({
            count: todos.length,
            data: todos
        });
    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

// Route to get one ToDo from database by id
app.get('/todo/:id', async (request, response) => {
    try {
        const {id} = request.params;
        const todo = await toDo.findById(id);
        return response.status(200).json(todo);
    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});


// Route to update ToDo
app.put('/todo/:id', async (request, response) => {
    try {
        if (
          !request.body.title ||
          !request.body.category ||
          !request.body.text
        ) {
          return response.status(400).send({
            message: 'Send all required fields',
          });
        }
    
        const { id } = request.params;
    
        const result = await toDo.findByIdAndUpdate(id, request.body);
    
        if (!result) {
          return response.status(404).json({ message: 'Todo not found' });
        }
        return response.status(200).send({ message: 'Todo updated successfully' });
      } 
      catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
      }
});

//Route to delete a todo
app.delete('/todo/:id', async(request, response) => {
    try {
        const {id} = request.params;
        const result = await toDo.findByIdAndDelete(id);
        if (!result) {
            return response.status(404).json({ message: 'Todo not found' });
          }
        return response.status(200).send({ message: 'Todo deleted successfully' });
    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
      }
});

mongoose
    .connect(mongoDBURL) 
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    })