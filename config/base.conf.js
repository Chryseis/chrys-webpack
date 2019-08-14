const path = require('path')
const theme = require('../package.json').theme

module.exports = {
    entry: {
        beauty: ['@babel/polyfill', path.resolve(__dirname, '../src/index')]
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: [
                    path.resolve(__dirname, '../src')
                ],
                exclude: [
                    path.resolve(__dirname, '../node_modules')
                ],
                use: ['babel-loader']
            },
            {
                test: /^(?!.*global).*\.(css|less)$/,
                use: ['style-loader', {
                    loader: 'css-loader',
                    options: {
                        modules: {
                            localIdentName: '[local]__[hash:base64:5]'
                        }
                    }
                }, {
                    loader: 'postcss-loader',
                    options: {
                        config: {
                            path: path.resolve(__dirname, '../postcss.config.js')
                        }
                    }
                }, {
                    loader: 'less-loader',
                    options: { javascriptEnabled: true }
                }],
                exclude: [path.resolve(__dirname, '../node_modules')]
            },
            {
                test: /^(.*global).*\.(css|less)$/,
                use: ['style-loader', 'css-loader', {
                    loader: 'postcss-loader',
                    options: {
                        config: {
                            path: path.resolve(__dirname, '../postcss.config.js')
                        }
                    }
                }, {
                    loader: 'less-loader',
                    options: { javascriptEnabled: true, modifyVars: theme }
                }],
                exclude: [path.resolve(__dirname, '../node_modules')]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: 'img/[name][hash:7].[ext]'
                    }
                }]
            },
        ],
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, '../src')
        },
        extensions: [".js", ".json", ".jsx", ".css", ".less"]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    name: 'vendor',
                    chunks: 'all',
                    test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
                }
            }
        }
    }
}