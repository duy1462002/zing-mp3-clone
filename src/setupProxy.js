const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://api-zingmp3-vercel.vercel.app/', // Địa chỉ máy chủ backend
      changeOrigin: true,
    })
  );
};