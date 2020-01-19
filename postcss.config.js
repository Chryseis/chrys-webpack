const browserConf = require('./utils/browser.conf')
const beautyConf = require('./utils/beautyrc')()

module.exports = ({ file, options, env }) => ({
    plugins: [
        require('autoprefixer')({ overrideBrowserslist: browserConf }),
        beautyConf.isRem && require('postcss-pxtorem')({
            rootValue: beautyConf.rootFontSize,
            propList: ['*', '!letter-spacing']
        })
    ]
})