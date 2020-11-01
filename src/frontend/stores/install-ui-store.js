import {MergedStore} from "./base-store";
import {ProxyBackend} from "../../models";

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export class InstallationStore extends MergedStore {
  constructor(proxyStore, uiStore) {
    super([proxyStore, uiStore], {
      autoInstallInProgress: false,
      autoInstallMessage: null
    });
  }

  get actions() {
    return {
      ...super.actions,
      autoInstall: async (proxyBackend) => {
        this.setState({
          autoInstallInProgress: true,
          autoInstallMessage: 'Installation started ...',
          autoInstallProxyBackend: proxyBackend
        });
        await sleep(2000);

        await super.actions.addBackend(proxyBackend);

        this.setState({
          autoInstallMessage: 'Installation finished, activating ...'
        });
        await sleep(5000);

        super.actions.activateBackend(proxyBackend);

        this.setState({
          autoInstallInProgress: false,
          autoInstallMessage: null,
          autoInstallProxyBackend: null
        });

        super.actions.redirectToSetupPage();

      },

      autoInstallFromBase64: (serializedProxyBackend) => this.actions.autoInstall(
          ProxyBackend.fromBase64(serializedProxyBackend))
    };
  }
}
