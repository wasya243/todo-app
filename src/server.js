const express = require('express')
require('dotenv').config({ path: './config.env' })

const DbManager = require('./db/database-manager')
const Logger = require('./lib/logger')
const API = require('./api')
const initJobs = require('./scheduler')

class Server {
    app
    api
    server
    dbManager
    port

    constructor(config) {
        const app = express()
        this.api = new API()
        this.app = app
        this.logger = new Logger()
        this.dbManager = new DbManager(config.DATABASE)
        this.port = config.SERVER.PORT
        app.use('/api', this.api.getAPI())
    }

    listen() {
        this.server = this.app.listen(this.port, () => {
            console.log(`listening at http://localhost:${this.port}`)
        })
    }

    async run() {
        await this.dbManager.connect()
        initJobs()
        this.logger.setup()
        this.listen()
    }
}

module.exports = Server