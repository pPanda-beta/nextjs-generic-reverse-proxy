import {LocalStorageBaseBackendRepository,} from "./repositories/proxy-backend-repository";
import {ProxyBackendStore} from "./stores/proxy-backend-store";
import {UIStore} from "./stores/ui-store";
import {MergedStore} from "./stores/base-store";

export const proxyRepository = new LocalStorageBaseBackendRepository(
    () => localStorage);

export const proxyStore = new ProxyBackendStore(proxyRepository);

export const uiStore = new UIStore();

export const proxyBackendUiStore = new MergedStore([proxyStore, uiStore]);

