const mongoose = require('mongoose')

class DatabaseManager {
    uri

    constructor(uri) {
        mongoose.Promise = global.Promise
        this.uri = uri
    }

    async connect() {
        try {
            this.db = await mongoose.connect(this.uri, {useNewUrlParser: true})
            console.log(`Database connection is established. MONGO URL is ${this.uri}`)

            return this.db
        } catch (err) {
            console.error(`Failed to establish database connection. MONGO URL ${this.uri}`)

            throw err;
        }
    }
}

module.exports = DatabaseManager