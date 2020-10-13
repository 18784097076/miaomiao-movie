module.exports = {
    devServer: {
        proxy: {
            '/ajax' : {
                target: 'http://m.maoyan.com',
                changeOrigin: true
            },
            '/dianying' : {
                target: 'https://m.maoyan.com',
                changeOrigin: true
            },
            '/gateway': {
                target: 'https://m.maizuo.com',
                changeOrigin: true
            }
        }
    }
}