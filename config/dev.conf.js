const path = require('path')
const ip = require('ip')
const baseConf = require('./base.conf')
const merge = require('webpack-merge')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { readCompileFiles, readTemplateFile, isSpa } = require('../utils')
const beautyConf = require('../utils/beautyrc')()

let entry = readCompileFiles()
let htmlWebpackPlugin
if (isSpa) {
    htmlWebpackPlugin = new HtmlWebpackPlugin({
        inject: false,
        title: beautyConf.title || '美栗',
        filename: 'index.html',
        template: readTemplateFile(),
        chunks: beautyConf.chunks || ['vendor', 'beauty']
    })
} else {
    htmlWebpackPlugin = Object.keys(beautyConf.entry || entry).map(chunkName => {
        return new HtmlWebpackPlugin({
            inject: false,
            title: beautyConf.title || '美栗',
            filename: `${chunkName === 'beauty' ? 'index' : chunkName}.html`,
            template: readTemplateFile(),
            chunks: beautyConf.chunks || ['vendor', chunkName]
        })
    })
}

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
        port: beautyConf.port || 9000,
        publicPath: beautyConf.publicPath || '/',
        hot: true,
        historyApiFallback: true,
        stats: 'minimal',
        open: baseConf.open || false
    },
    plugins: [new webpack.DefinePlugin(beautyConf.define || {})].concat(htmlWebpackPlugin, miniCssExtractPlugin)
})