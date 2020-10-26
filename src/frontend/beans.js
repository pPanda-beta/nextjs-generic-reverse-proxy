import {ProxyBackendRepository} from "./repositories/proxy-backend-repository";
import {ProxyBackendStore} from "./stores/proxy-backend-store";

export const proxyRepository = new ProxyBackendRepository();
export const proxyStore = new ProxyBackendStore(proxyRepository);
