// 结合html-webpack-plugin使用, 在html-webpack-plugin-before-html-processing阶段去除匹配的script标签
class MyPlugin {
    constructor(options) {
        this.options = Object.assign({
            matchReg:undefined
        }, options)
    }
    apply(compiler) {
        let self = this;
        compiler.plugin('compilation', function(compilation) {
            compilation.plugin('html-webpack-plugin-before-html-processing', function(htmlPluginData, callback) {
                htmlPluginData.html = self.getRemoveScriptFileStr(htmlPluginData.html);
                callback(null, htmlPluginData);
            })
        })
    }
    getRemoveScriptFileStr(html) {
        let matchReg = this.options.matchReg;
        let allScripts = [];
        let result = [];
        let regexp = /<script.*?>.*?<\/script>/gi;
        try{
            while(( result = regexp.exec(html)) != null) {
                if(matchReg.test(result[0])) {  
                    allScripts.push(result[0]);
                }
                if(matchReg.global) {
                    matchReg.lastIndex = 0;
                }
            }
            while(allScripts.length > 0) {
                const itemScript = allScripts[allScripts.length - 1];
                if(matchReg.test(itemScript)) {
                    html = html.replace(itemScript, '');
                }
                if(matchReg.global) {
                    matchReg.lastIndex = 0;
                }
                allScripts.pop();
            }
            return html;
        }catch(e){
            console.log(e);
        }
    }
}

module.exports = MyPlugin;