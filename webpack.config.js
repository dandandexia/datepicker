var webpack = require('webpack');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
 
module.exports = {
    //插件项
    plugins: [commonsPlugin],
    //页面入口文件配置
    entry: {
        datepicker : './src/js/datepicker.js',
        index: './src/js/index.js'
    },
    //入口文件输出配置
    output: {
        path: 'prd/js/',
        filename: '[name].js'
    },
    module: {
        //加载器配置
        loaders: [
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            { test: /\.js$/, loader: 'jsx-loader?harmony' }
        ]
    },
    //其它解决方案配置
    resolve: {}
};