import {ProxyBackend} from "../../models";
import {lazyInitialize} from "core-decorators";

const TODO = () => {
  throw new Error("NOT IMPLEMENTED or ABSTRACT");
};

export class ProxyBackendRepository {
  getAll = async () => TODO();

  add = async (proxyBackend) => TODO();
}

// We should switch to https://www.npmjs.com/package/browserfs
export class LocalStorageBaseBackendRepository extends ProxyBackendRepository {
  static LOCAL_STORAGE_KEY = "__proxy_backends"; // Careful, it is visible to proxied frontend js
  _localStorageProvider;
  @lazyInitialize
  _localStorage = this._localStorageProvider();

  constructor(localStorageProvider) {
    super();
    this._localStorageProvider = localStorageProvider;
  }

  getAll = async () => this._getBackends();

  add = async (proxyBackend) => this._setBackends(
      [...this._getBackends(), proxyBackend]);

  _getBackends = () => (
      JSON.parse(this._localStorage.getItem(
          LocalStorageBaseBackendRepository.LOCAL_STORAGE_KEY)) || []
  ).map(obj => ProxyBackend.createFromObject(obj));

  _setBackends = (backends) => this._localStorage.setItem(
      LocalStorageBaseBackendRepository.LOCAL_STORAGE_KEY,
      JSON.stringify(backends));
}
