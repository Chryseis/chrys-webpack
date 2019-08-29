const path = require('path')
const ip = require('ip')
const baseConf = require('./base.conf')
const merge = require('webpack-merge')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { readCompileFiles, readTemplateFile } = require('../utils')
const beautyConf = require('../utils/beautyrc')()

let entry = readCompileFiles()
let htmlWebpackPlugin = Object.keys(entry).map(chunkName => {
    return new HtmlWebpackPlugin({
        inject: false,
        title: '美栗',
        filename: `${chunkName === 'beauty' ? 'index' : chunkName}.html`,
        template: readTemplateFile(),
        chunks: beautyConf.chunks || ['vendor', chunkName]
    })
})
let miniCssExtractPlugin = beautyConf.isExtractCss ? new MiniCssExtractPlugin({
    filename: 'css/[name].css',
    chunkFilename: 'css/[name].css'
}) : []

module.exports = merge(baseConf, {
    mode: 'development',
    entry: beautyConf.entry || entry,
    devtool: 'source-map',
    output: beautyConf.output || {
        path: path.resolve(`${process.cwd()}/dist`),
        publicPath: beautyConf.publicPath || '/',
        filename: 'js/[name].js',
        chunkFilename: 'js/[name].js',
        sourceMapFilename: '[file].map'
    },
    devServer: beautyConf.devServer || {
        contentBase: [path.resolve(`${process.cwd()}/dist`), path.resolve(`${process.cwd()}/public`)],
        compress: true,
        host: ip.address(),
        port: 9000,
        publicPath: beautyConf.publicPath || '/',
        hot: true,
        historyApiFallback: true,
        stats: 'minimal'
    },
    plugins: [new webpack.DefinePlugin(beautyConf.define || {})].concat(htmlWebpackPlugin, miniCssExtractPlugin)
})