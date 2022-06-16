const express = require('express')
const path = require('path')
require('dotenv').config({path: './config.env'})

const DbManager = require('./src/db/database-manager')
const Logger = require('./src/lib/logger')
const API = require('./src/api')
const initJobs = require('./src/scheduler')
const {isProduction} = require('./utils')

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
        this.dbManager = new DbManager(config.MONGO_URI)
        this.port = config.SERVER.PORT
    }

    listen() {
        this.server = this.app.listen(this.port, () => {
            console.log(`listening at http://localhost:${this.port}`)
        })
    }

    async run() {
        this.logger.setup()
        await this.dbManager.connect()
        initJobs()
        this.listen()
        this._setUpRoutes()
    }

    _setUpRoutes() {
        this.app.use('/api', this.api.getAPI())

        if (isProduction()) {
            const a = path.join(__dirname, '/client/build')
            console.log('aa', a)
            this.app.use(express.static(path.join(__dirname, '/client/build')))

            this.app.get('*', (req, res) => {
                res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
            })
        }
    }
}

module.exports = Server