const path = require('path')
const baseConf = require('./base.conf')
const merge = require('webpack-merge')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const PREFIX = process.env.PREFIX
const CDN_URL = `//web-cdn.meilly.cn/${PREFIX}/`

module.exports = merge(baseConf, {
    mode: 'production',
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: CDN_URL,
        filename: 'js/[name].[hash:8].js',
        chunkFilename: 'js/[name].[hash:8].js',
        sourceMapFilename: '[file].map'
    },
    plugins: [new webpack.DefinePlugin({
        "process.env.BASE_NAME": JSON.stringify(`/${process.env.PREFIX}`)
    }), new HtmlWebpackPlugin({
        inject: false,
        title: '',
        filename: 'index.html',
        template: path.resolve(__dirname, '../src/document.ejs'),
        chunks: ['vendor', 'beauty']
    })]
})