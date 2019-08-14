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
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/',
        filename: 'js/[name].js',
        chunkFilename: 'js/[name].js',
        sourceMapFilename: '[file].map'
    },
    devServer: {
        contentBase: [path.resolve(__dirname, '../dist'), path.resolve(__dirname, '../public')],
        compress: true,
        host: ip.address(),
        port: 9000,
        hot: true,
        historyApiFallback: true,
        stats: 'minimal'
    },
    plugins: [new webpack.DefinePlugin({
        "process.env.BASE_NAME": JSON.stringify('')
    }), new HtmlWebpackPlugin({
        inject: false,
        title: '美栗',
        filename: 'index.html',
        template: path.resolve(__dirname, '../src/document.ejs'),
        chunks: ['vendor', 'beauty']
    })]
})