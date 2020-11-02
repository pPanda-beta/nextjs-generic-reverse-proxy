import {serialize as serializeCookie} from 'cookie';
import {BACKEND_COOKIE_NAME} from "../../configs";
import {ProxyBackend} from "../../models";

export default (req, res) => {
  const serializedBackend = req.query.backend;
  const proxyCookie = serializeCookie(BACKEND_COOKIE_NAME, serializedBackend,
      {httpOnly: true, path: '/'});

  const proxyBackend = ProxyBackend.fromBase64(serializedBackend);
  const stateCookiesForFrontendJS = Object.entries(proxyBackend.cookies).map(
      ([k, v]) => serializeCookie(k, v, {path: '/'}));

  res.setHeader('Set-Cookie', [proxyCookie, ...stateCookiesForFrontendJS]);
  res.redirect('/');
};