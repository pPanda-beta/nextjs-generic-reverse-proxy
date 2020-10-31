import {LocalStorageBaseBackendRepository,} from "./repositories/proxy-backend-repository";
import {ProxyBackendStore} from "./stores/proxy-backend-store";

export const proxyRepository = new LocalStorageBaseBackendRepository(
    () => localStorage);

export const proxyStore = new ProxyBackendStore(proxyRepository);
