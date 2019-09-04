const path = require('path')
const baseConf = require('./base.conf')
const merge = require('webpack-merge')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const pkg = require(`${process.cwd()}/package.json`)
const { readCompileFiles, readTemplateFile, isSpa } = require('../utils')
const beautyConf = require('../utils/beautyrc')()

const PREFIX = process.env.PREFIX || pkg.name
const CDN_URL = `//web-cdn.meilly.cn/${PREFIX}/`

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
    filename: 'css/[name].[hash:8].css',
    chunkFilename: 'css/[name].[hash:8].css'
}) : []

module.exports = merge(baseConf, {
    name: 'beauty',
    mode: 'production',
    entry: beautyConf.entry || entry,
    output: beautyConf.output || {
        path: path.resolve(`${process.cwd()}/dist`),
        publicPath: beautyConf.publicPath || CDN_URL,
        filename: 'js/[name].[hash:8].js',
        chunkFilename: 'js/[name].[hash:8].js',
        sourceMapFilename: '[file].map'
    },
    plugins: [new webpack.DefinePlugin(beautyConf.define || {}), new CleanWebpackPlugin()].concat(htmlWebpackPlugin, miniCssExtractPlugin)
})