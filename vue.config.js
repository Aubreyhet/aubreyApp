module.exports = {
    devServer: {
        proxy: {
            '/apis': {     //这里最好有一个 /
                target: 'http://47.92.222.168:3000',  // 后台接口域名
                changeOrigin: true,  //是否跨域
                pathRewrite: {
                    '^/apis': ''
                }
            }
        }
    }
}