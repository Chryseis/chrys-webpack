const webpack = require('webpack')
const analyzeConf = require('../config/analyze.conf')


webpack(analyzeConf, (err, stats) => {
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
})