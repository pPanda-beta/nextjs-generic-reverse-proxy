export class ProxyBackendRepository {
  backends = [{
    origin: 'https://www.google.com',
    headers: [],
    cookies: [],
  }];

  constructor() {
  }

  getAll = async () => [...this.backends];
}

