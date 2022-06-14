const os = require('os')
const RandomName = require('node-random-name')

const NAME = 'voice'
const LEVEL_LOG = 'log'
const LEVEL_ERROR = 'error'

class Logger {
    name
    nickname
    hostname
    pid
    boundLog
    boundError

    constructor() {
        this.name = NAME
        this.nickname = RandomName({last: true})
        this.hostname = os.hostname()
        this.pid = process.pid
        this.boundLog = null
        this.boundError = null
    }

    _getDateString() {
        return new Date().toISOString();
    }

    _getMessageFields(level, msg) {
        return {
            msg: msg,
            name: this.name,
            nickname: this.nickname,
            level: level,
            hostname: this.hostname,
            pid: this.pid,
            time: this._getDateString()
        }
    }

    _printFields(fields) {
        if (!this.boundLog) {
            console.error('unable to print without overriding console')
            return
        }

        let output = JSON.stringify(fields)
        if (fields.level === LEVEL_LOG) {
            this.boundLog(output)
        } else if (fields.level === LEVEL_ERROR) {
            this.boundError(output)
        }
    }

    _processArgs(args) {
        return args.map(arg => {
            let processedArg
            if (typeof arg === 'object' && !(arg instanceof Error) && arg !== null) {
                processedArg = JSON.stringify(arg);
            } else if (typeof arg === 'undefined') {
                processedArg = 'undefined';
            } else if (arg === null) {
                processedArg = 'null';
            } else {
                processedArg = arg.toString();
            }

            return processedArg;
        })
    }

    log(...args) {
        this._printFields(this._getMessageFields(LEVEL_LOG, this._processArgs(args).join(' ')))
    }

    error(...args) {
        this._printFields(this._getMessageFields(LEVEL_ERROR, this._processArgs(args).join(' ')))
    }

    setup() {
        if (this.boundLog) {
            console.log('already overrode console')
            return
        }

        this.boundLog = console.log.bind(console)
        console.log = (...args) => {
            this.log(...args)
        }

        this.boundError = console.error.bind(console)
        console.error = (...args) => {
            this.error(...args)
        }
    }
}

module.exports = Logger