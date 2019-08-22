const path = require('path')
const ip = require('ip')
const baseConf = require('./base.conf')
const merge = require('webpack-merge')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { readCompileFiles, readTemplateFile } = require('../utils')

let entry = readCompileFiles()
let htmlWebpackPlugin = Object.keys(entry).map(chunkName => {
    return new HtmlWebpackPlugin({
        inject: false,
        title: '美栗',
        filename: `${chunkName}.html`,
        template: readTemplateFile(),
        chunks: ['vendor', chunkName]
    })
})

module.exports = merge(baseConf, {
    mode: 'development',
    entry,
    devtool: 'source-map',
    output: {
        path: path.resolve(`${process.cwd()}/dist`),
        publicPath: '/',
        filename: 'js/[name].js',
        chunkFilename: 'js/[name].js',
        sourceMapFilename: '[file].map'
    },
    devServer: {
        contentBase: [path.resolve(`${process.cwd()}/dist`), path.resolve(`${process.cwd()}/public`)],
        compress: true,
        host: ip.address(),
        port: 9000,
        publicPath: '/',
        hot: true,
        historyApiFallback: true,
        stats: 'minimal'
    },
    plugins: [new webpack.DefinePlugin({
        "process.env.BASE_NAME": JSON.stringify('')
    })].concat(htmlWebpackPlugin)
})