const fs = require('fs')

module.exports = function() {
    if (fs.existsSync(`${process.cwd()}/beautyrc.js`)) {
        return require(`${process.cwd()}/beautyrc.js`)
    } else {
        return {}
    }
}
