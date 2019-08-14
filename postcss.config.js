const browserConf = require('./utils/browser.conf')

module.exports = ({ file, options, env }) => ({
    plugins: [
        require('autoprefixer')({ overrideBrowserslist: browserConf }),
        require('postcss-pxtorem')({
            rootValue: 75,
            propList: ['*', '!letter-spacing']
        })
    ]
})