const mongoose = require('mongoose')

class DatabaseManager {
    db
    port
    host
    dbName

    constructor(dbConfig = {}) {
        mongoose.Promise = global.Promise
        this.port = dbConfig.PORT
        this.dbName = dbConfig.DB_NAME
        this.host = dbConfig.HOST
    }

    _getConnectionUrl() {
        return `mongodb://${this.host}:${this.port}/${this.dbName}`
    }

    async connect() {
        const url = this._getConnectionUrl()
        try {
            this.db = await mongoose.connect(url, {useNewUrlParser: true})
            console.log(`Database connection is established. MONGO URL is ${url}`)

            return this.db
        } catch (err) {
            console.error(`Failed to establish database connection. MONGO URL ${url}`)

            throw err;
        }
    }
}

module.exports = DatabaseManager