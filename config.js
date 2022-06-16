const CONFIG = {
    MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/test-db',
    SERVER: {
        PORT: process.env.SERVER_PORT || 5000
    },
    NODE_ENV: process.env.NODE_ENV || 'local'
}

module.exports = CONFIG