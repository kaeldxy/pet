<<<<<<< HEAD
module.exports={
    devServer:{
        proxy:"http://localhost:3000"
=======
module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '/api': '',
                }
            },
        }
>>>>>>> b6fcaa6f2bb0b0f63893a53447c0cba1ba5c495a
    }
}