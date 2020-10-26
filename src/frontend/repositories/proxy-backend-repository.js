import {ProxyBackend} from "../../models";

export class ProxyBackendRepository {
  backends = [new ProxyBackend({
    origin: 'https://www.google.com',
    headers: {
      'accept': ['application/json']
    },
    cookies: {
      abc: 456
    },
  })];

  getAll = async () => [...this.backends];

  add = async (proxyBackend) => this.backends.push(proxyBackend);
}

