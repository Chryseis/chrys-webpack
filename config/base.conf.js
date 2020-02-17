const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const theme = require(`${process.cwd()}/package.json`).theme || require('../package').theme
const beautyConf = require('../utils/beautyrc')()

module.exports = {
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: [
                    path.resolve(`${process.cwd()}/src`)
                ],
                exclude: [
                    path.resolve(`${process.cwd()}/node_modules`)
                ],
                use: [{
                    loader: 'babel-loader', options: {
                        configFile: path.resolve(__dirname, '../babel.config.js')
                    }
                }]
            },
            {
                test: /^(?!.*global).*\.(css|less)$/,
                use: [beautyConf.isExtractCss ? {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        hmr: process.env.NODE_ENV === 'development'
                    }
                } : 'style-loader', {
                    loader: 'css-loader',
                    options: {
                        modules: beautyConf.isCssModule && {
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
                exclude: [path.resolve(`${process.cwd()}/node_modules`)]
            },
            {
                test: /^(.*global).*\.(css|less)$/,
                use: [beautyConf.isExtractCss ? {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        hmr: process.env.NODE_ENV === 'development'
                    }
                } : 'style-loader', 'css-loader', {
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
                exclude: [path.resolve(`${process.cwd()}/node_modules`)]
            },
            {
                test: /.(css|less)$/,
                use: [beautyConf.isExtractCss ? {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        hmr: process.env.NODE_ENV === 'development'
                    }
                } : 'style-loader', {
                    loader: 'css-loader'
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
                include: [path.resolve(`${process.cwd()}/node_modules`)],
                exclude: [path.resolve(`${process.cwd()}/src`)]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: beautyConf.isCompressImg ? [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: 'img/[name][hash:7].[ext]'
                    }
                }, {
                    loader: 'image-webpack-loader',
                    options: {
                        mozjpeg: {
                            progressive: true,
                            quality: 65
                        },
                        // optipng.enabled: false will disable optipng
                        optipng: {
                            enabled: false,
                        },
                        pngquant: {
                            quality: [0.65, 0.90],
                            speed: 4
                        },
                        gifsicle: {
                            interlaced: false,
                        },
                        // the webp option will enable WEBP
                        webp: {
                            quality: 75
                        }
                    }
                }] : [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: 'img/[name][hash:7].[ext]'
                    }
                }]
            },
            {
                test: /\.(mp4|avi|mp3)(\?.*)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: 'media/[name][hash:7].[ext]'
                    }
                }]
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)\w*/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: 'font/[name][hash:7].[ext]'
                    }
                }]
            }
        ],
    },
    resolve: {
        alias: beautyConf.alias || {
            "@": path.resolve(`${process.cwd()}/src`)
        },
        extensions: [".js", ".json", ".jsx", ".css", ".less"]
    },
    optimization: {
        splitChunks: beautyConf.splitChunks || {
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