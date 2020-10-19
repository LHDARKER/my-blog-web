module.exports = {
    publicPath: '/',       // 项目部署的基础路径 我们默认假设你的应用将会部署在域名的根部
    outputDir: 'dist',     // 构建好的文件的输出地址
    assetsDir: 'static',
    devServer: {
        open: true,
        host: 'localhost',
        port: 8082,
        https: false,
        //以上的ip和端口是我们本机的;下面为需要跨域的
        proxy: {  //配置跨域
            '/api': {
                target: 'http://localhost:9000',  //这里后台的地址模拟的;应该填写你们真实的后台接口
                // target: 'http://172.18.9.50:31768/api',
                ws: true,
                changOrigin: true,  //允许跨域
                pathRewrite: {
                    '^/api': ''  //请求的时候使用这个api就可以
                }
            }
        }
    }
}