export class ProxyBackendRepository {
  backends = [{
    origin: 'https://www.google.com',
    headers: {
      'accept': ['application/json']
    },
    cookies: {
      abc: 456
    },
  }];


  getAll = async () => [...this.backends];
}

