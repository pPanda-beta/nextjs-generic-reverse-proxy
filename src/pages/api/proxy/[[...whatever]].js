import httpProxyMiddleware from "next-http-proxy-middleware";
import {ProxyBackend} from "../../../models";
import {BACKEND_COOKIE_NAME, SETUP_PAGE_LOCATION} from "../../../configs";

export default (req, res) => {
  const serializedBackend = req.cookies[BACKEND_COOKIE_NAME];
  if(!serializedBackend){
    return res.redirect(SETUP_PAGE_LOCATION);
  }
  const backend = ProxyBackend.fromBase64(serializedBackend);
  backend.cookies = {...backend.cookies, ...req.cookies, [BACKEND_COOKIE_NAME]: null}

  return httpProxyMiddleware(req, res, {
    get target() {
      return backend.origin;
    },
    changeOrigin: true,
    headers: backend.getAllHeaders(),
  });
};