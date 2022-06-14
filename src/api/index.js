const express = require('express')
const bodyParser = require('body-parser')
const {STATUS_CODES} = require('http')

const Todo = require('./routes/todo')

class API {
    router
    todo

    constructor() {
        this.router = express.Router()
        this.todo = new Todo()
        this.setUpAPI()
    }

    getAPI() {
        return this.router
    }

    _logRequest(req, res, next) {
        console.log({
            url: req.url,
            date: new Date().toISOString(),
            method: req.method
        })

        next()
    }

    _handleError(error, req, res, next) {
        const {status = 500} = error

        console.error('Error occurred:', error)

        const response = {
            status,
            message: STATUS_CODES[status]
        }

        res.status(response.status).send(response)
    }

    setUpAPI() {
        this.router.use(bodyParser.urlencoded({ extended: false}))
        this.router.use(bodyParser.json())
        this.router.use(this._logRequest)
        this.router.use(this.todo.getRouter())
        this.router.use(this._handleError)
    }
}

module.exports = API