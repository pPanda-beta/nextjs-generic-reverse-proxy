import {serialize as serializeCookie} from 'cookie';
import {BACKEND_COOKIE_NAME} from "../../configs";


export default (req, res) => {
  const serializedBackend = req.query.backend;
  const cookie = serializeCookie(BACKEND_COOKIE_NAME, serializedBackend,
      {httpOnly: true, path: '/'});

  res.setHeader('Set-Cookie', cookie);
  res.redirect('/');
};