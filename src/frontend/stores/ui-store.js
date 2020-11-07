import {SimpleStore} from "./base-store";
import {ACTIVATE_API_LOCATION, SETUP_PAGE_LOCATION,} from "../../configs";
import {LocalStorageBaseBackendRepository} from "../repositories/proxy-backend-repository";

//TODO: Ui client should be extracted to support non-browser react envs (e.g. react native)

export class UIStore extends SimpleStore {
  constructor() {
    super({});
  }

  actions = {
    copyInstallerLink: (proxyBackend) => navigator.clipboard.writeText(
        window.location.origin +
        SETUP_PAGE_LOCATION + "?backend=" + proxyBackend.serialize(),
    ),
    activateBackend: (proxyBackend) => {
      Object.keys(localStorage)
        .filter(key => key !== LocalStorageBaseBackendRepository.LOCAL_STORAGE_KEY)
        .forEach(key => localStorage.removeItem(key));
      proxyBackend.getLocalStoragePairs()
        .filter(([key, _]) => key !== LocalStorageBaseBackendRepository.LOCAL_STORAGE_KEY)
        .forEach(([k, v]) => localStorage.setItem(k, v))

      window.open(
          ACTIVATE_API_LOCATION + "?backend=" + proxyBackend.serialize(),
          "_blank");
    },
    redirectToSetupPage: () => window.history.replaceState(
        {}, document.title, SETUP_PAGE_LOCATION)
  }
}
