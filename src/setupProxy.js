const proxy = require('http-proxy-middleware');

if (process.env.REACT_APP_PROXY) {
    module.exports = function (app) {
        app.use(
            '/api',
            proxy({
                target: process.env.REACT_APP_PROXY,
                changeOrigin: true,
                secure: false,
            })
        );
    };
}