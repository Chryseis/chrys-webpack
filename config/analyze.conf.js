const prodConf = require('./prod.conf')
const merge = require('webpack-merge')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = merge(prodConf, {
    plugins: [
        new BundleAnalyzerPlugin()
    ]
})