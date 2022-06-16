const CONFIG = require('./config')

function isProduction() {
    return CONFIG.NODE_ENV === 'production'
}

module.exports = {
    isProduction
}