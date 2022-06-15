const Server = require('./src/server')
const config = require('./config')

function runServer() {
    process.on('uncaughtException', (err) => {
        console.error('uncaught exception', err)
    })

    process.on('unhandledRejection', (err) => {
        console.error('unhandled promise rejection', err)
    })

    const server = new Server(config)
    server
        .run()
        .catch(e => console.error('error while starting server', e));
}

runServer()