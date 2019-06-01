const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
    devServer: {
        port: 8888,     // 端口
    },
    css: { // 配置css模块
    	loaderOptions: { // 向预处理器 Loader 传递配置选项
        	less: { // 配置less（其他样式解析用法一致）
            		javascriptEnabled: true // 设置为true
        	}
    	}
	},
    configureWebpack: config => {
      if (process.env.NODE_ENV === 'production') {
        return {
            
            plugins:[
                new CopyWebpackPlugin([{
                    from:'node_modules/@aspnet/signalr/dist/browser/signalr.min.js',
                    to:'dist'
                },{
                    from:'node_modules/abp-web-resources/Abp/Framework/scripts/libs/abp.signalr-client.js',
                    to:'dist'
                },{
                    from:'src/lib/abp.js',
                    to:'dist'
                }])
            ]
        }
      } else {
        return {
            plugins:[
                new CopyWebpackPlugin([{
                    from:'node_modules/@aspnet/signalr/dist/browser/signalr.min.js',
                    to:'dist'
                },{
                    from:'node_modules/abp-web-resources/Abp/Framework/scripts/libs/abp.signalr-client.js',
                    to:'dist'
                },{
                    from:'src/lib/abp.js',
                    to:'dist'
                }])
            ]
        }
      }
    }
}