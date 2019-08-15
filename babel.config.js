const browserConf = require('./utils/browser.conf')

module.exports = function(api) {
    api.cache(true)

    return {
        "presets": [
            ["@babel/preset-env", { targets: browserConf }],
            "@babel/preset-react"
        ],
        "plugins": [
            "@babel/plugin-transform-runtime",
            "@babel/plugin-syntax-dynamic-import",
            "@babel/plugin-syntax-import-meta",
            [
                "@babel/plugin-proposal-decorators",
                {
                    "legacy": true
                }
            ],
            [
                "@babel/plugin-proposal-class-properties",
                {
                    "loose": true
                }
            ],
            "@babel/plugin-proposal-json-strings",
            "@babel/plugin-proposal-optional-chaining"
        ]
    }
}