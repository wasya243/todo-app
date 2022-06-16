const CONFIG = {
    DATABASE: {
        PORT: process.env.DB_PORT || 27017,
        HOST: process.env.DB_HOST || 'localhost',
        DB_NAME: process.env.DB_NAME || 'todo-app'
    },
    SERVER: {
        PORT: process.env.SERVER_PORT || 5000
    },
    NODE_ENV: process.env.NODE_ENV || 'local'
}

module.exports = CONFIG