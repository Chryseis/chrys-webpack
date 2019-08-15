#!/usr/bin/env node

const webpackDevServer = require('webpack-dev-server')
const webpack = require('webpack')
const devConf = require('../config/dev.conf')
const options = devConf.devServer


webpackDevServer.addDevServerEntrypoints(devConf, options)
const compiler = webpack(devConf)
const server = new webpackDevServer(compiler, options)

server.listen(options.port, options.host)

process.on('uncaughtException', function(e) {
    /*处理异常*/
    if (e.code === 'EADDRINUSE') {
        server.listen(options.port + 1, options.host)
    } else {
        console.log(e.message)
    }
})
