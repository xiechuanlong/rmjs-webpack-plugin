const RemoveScriptWebpackConfig = require('../index.js');
const path = require('path');
const baseConfig = {
    entry: {
        'index': path.resolve(__dirname, './index.js')
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'javascript/[name].js'
    },
    plugins: [
        new RemoveScriptWebpackConfig({
            entryPath: path.resolve(__dirname, './test.html'),
            outPath: path.resolve(__dirname,'./dist/template/test.html'),
            matchReg: /pages\//g
        })
    ]
}
module.exports = baseConfig;