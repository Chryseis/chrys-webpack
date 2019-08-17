const chalk = require('chalk')

const info = chalk.green
const error = chalk.bold.red
const warning = chalk.keyword('orange')
const success = chalk.bold.green

module.exports = {
    info: (msg) => console.log(info(msg)),
    error: (msg) => console.log(error(msg)),
    warning: (msg) => console.log(warning(msg)),
    success: (msg) => console.log(success(msg))
}
