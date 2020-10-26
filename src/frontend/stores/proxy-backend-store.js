import {SimpleStore} from "./base-store";

export class ProxyBackendStore extends SimpleStore {
  constructor(repository) {
    super({
      loading: true,
      proxyBackends: [],
    });
    this.repository = repository;
  }

  actions = {
    fetchAllBackends: async () => {
      this.setState({loading: true});
      this.setState({
        proxyBackends: await this.repository.getAll()
      });
      this.setState({loading: false});
    },

    addBackend: async (proxyBackend) => {
      this.setState({saving: true});
      await this.repository.add(proxyBackend);
      this.setState({saving: false});
      await this.actions.fetchAllBackends();
    }
  }
}
