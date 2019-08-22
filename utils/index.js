const fs = require('fs')
const path = require('path')

module.exports = {
    readCompileFiles: function() {
        if (fs.existsSync(`${process.cwd()}/src/index.jsx`)) {
            return {
                beauty: `${process.cwd()}/src/index`
            }
        } else {
            let rootPath = `${process.cwd()}/src`
            let files = fs.readdirSync(rootPath)
            return files.reduce((entry, fileName) => {
                let stats = fs.statSync(`${rootPath}/${fileName}`)
                if (stats.isDirectory()) {
                    entry[fileName] = `${rootPath}/${fileName}`
                }
                return entry
            }, {})
        }
    },
    readTemplateFile: function() {
        if (fs.existsSync(`${process.cwd()}/src/document.ejs`)) {
            return `${process.cwd()}/src/document.ejs`
        } else {
            return path.resolve(__dirname, '../src/document.ejs')
        }
    }
}