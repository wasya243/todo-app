const express = require('express')

const TodoHandler = require('../handlers/todo')

class Todo {
    router
    todoHandler

    constructor() {
        this.router = express.Router()
        this.todoHandler = new TodoHandler()
        this.setupRoutes()
    }

    getRouter() {
        return this.router
    }

    setupRoutes() {
        this.router.get('/todos/:id', this.todoHandler.getTodos)
        this.router.post('/todos', this.todoHandler.createTodo)
        this.router.delete('/todos/:id', this.todoHandler.deleteTodo)
    }
}

module.exports = Todo