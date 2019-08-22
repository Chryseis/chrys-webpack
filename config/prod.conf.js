const path = require('path')
const baseConf = require('./base.conf')
const merge = require('webpack-merge')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const pkg = require(`${process.cwd()}/package.json`)
const { readCompileFiles, readTemplateFile } = require('../utils')

const PREFIX = process.env.PREFIX || pkg.name
const CDN_URL = `//web-cdn.meilly.cn/${PREFIX}/`

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
    name: 'beauty',
    mode: 'production',
    entry,
    output: {
        path: path.resolve(`${process.cwd()}/dist`),
        publicPath: CDN_URL,
        filename: 'js/[name].[hash:8].js',
        chunkFilename: 'js/[name].[hash:8].js',
        sourceMapFilename: '[file].map'
    },
    plugins: [new webpack.DefinePlugin({
        "process.env.BASE_NAME": JSON.stringify(`/${process.env.PREFIX}`)
    }), new CleanWebpackPlugin()].concat(htmlWebpackPlugin)
})