const httpProxyMiddleware = require('next-http-proxy-middleware').default;

export default (req, res) => httpProxyMiddleware(req, res, {
  get target(){
    console.log(req.url);
    return `https://www.google.com`;
  },
  // pathRewrite: { '^/api': '/' },
  changeOrigin: true,
});