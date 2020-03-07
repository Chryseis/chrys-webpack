const fs = require('fs')

const defaultConfig = {
    isCssModule: true,
    isRem: true,
    rootFontSize: 75,
    isCompressImg: false,
    htmlPluginsOptions:{}
}

module.exports = function() {
    if (fs.existsSync(`${process.cwd()}/.beautyrc.js`)) {
        return Object.assign(defaultConfig, require(`${process.cwd()}/.beautyrc.js`))
    } else {
        return defaultConfig
    }
}
