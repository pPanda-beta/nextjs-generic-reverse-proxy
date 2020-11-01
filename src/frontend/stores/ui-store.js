import {SimpleStore} from "./base-store";
import {ACTIVATE_PAGE_LOCATION, SETUP_PAGE_LOCATION} from "../../configs";

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
    activateBackend: (proxyBackend) => window.open(
        ACTIVATE_PAGE_LOCATION + "?backend=" + proxyBackend.serialize(),
        "_blank"),
    redirectToSetupPage: () => window.history.replaceState(
        {}, document.title, SETUP_PAGE_LOCATION)
  }
}
