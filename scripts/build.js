const webpack = require('webpack')
const prodConf = require('../config/prod.conf')
const log = require('../utils/log')


webpack(prodConf, (err, stats) => {
    if (err || stats.hasErrors()) {
        return
    }
    process.stdout.write(stats.toString({
        colors: true,
        displayChunks: true,
        hash: false,
        source: true,
        modules: false,
        children: false,
        chunks: true,
        progress: true,
        chunkModules: false
    }) + '\r\n')

    log('build success!')
})
