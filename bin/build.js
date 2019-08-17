#!/usr/bin/env node

const webpack = require('webpack')
const prodConf = require('../config/prod.conf')
const log = require('../utils/log')


webpack([prodConf], (err, multiStats) => {
    if (err) {
        process.stdout.write(err)
        return
    }

    multiStats.stats.forEach(stats => {
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
        log.success(`Build ${stats.compilation.name} Page Success!`)
    })

})
