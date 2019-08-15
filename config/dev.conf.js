const path = require('path')
const ip = require('ip')
const baseConf = require('./base.conf')
const merge = require('webpack-merge')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = merge(baseConf, {
    mode: 'development',
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
        stats: 'none'
    },
    plugins: [new webpack.DefinePlugin({
        "process.env.BASE_NAME": JSON.stringify('')
    }), new HtmlWebpackPlugin({
        inject: false,
        title: '美栗',
        filename: 'index.html',
        template: path.resolve(`${process.cwd()}/src/document.ejs`) || path.resolve(__dirname, '../src/document.ejs'),
        chunks: ['vendor', 'beauty']
    })]
})