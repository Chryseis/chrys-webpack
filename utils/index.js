const fs = require('fs')
const path = require('path')
const beautyConf = require('./beautyrc')()

module.exports = {
    isSpa: fs.existsSync(`${process.cwd()}/src/index.jsx`) || fs.existsSync(`${process.cwd()}/src/index.js`),
    readCompileFiles: function () {
        if (fs.existsSync(`${process.cwd()}/src/index.jsx`) || fs.existsSync(`${process.cwd()}/src/index.js`)) {
            return {
                beauty: ['@babel/polyfill', `${process.cwd()}/src/index`]
            }
        } else {
            let rootPath = `${process.cwd()}/src`
            let files = fs.readdirSync(rootPath)
            if (beautyConf.outputFiles) {
                files = files.filter(f => beautyConf.outputFiles.includes(f))
            }

            return files.reduce((entry, fileName) => {
                let stats = fs.statSync(`${rootPath}/${fileName}`)
                if (stats.isDirectory()) {
                    entry[fileName] = ['@babel/polyfill', `${rootPath}/${fileName}`]
                }
                return entry
            }, {})
        }
    },
    readTemplateFile: function () {
        if (fs.existsSync(`${process.cwd()}/src/document.ejs`)) {
            return `${process.cwd()}/src/document.ejs`
        } else {
            return path.resolve(__dirname, '../src/document.ejs')
        }
    }
}