import React, {useEffect} from "react";
import {connect} from "../stores/base-store";
import {proxyStore} from "../beans";
import {ACTIVATE_PAGE_LOCATION, SETUP_PAGE_LOCATION} from "../../configs";

const TableKeyValue = ({title = '', kvPairs = []}) => (
    <table>
      <thead>
      <tr>
        <td colspan={2}>{title}</td>
      </tr>
      </thead>
      {kvPairs.map(([k, v]) => (
          <tr>
            <td>{k}</td>
            <td>{v}</td>
          </tr>
      ))}
    </table>
);

const copyInstallerLink = (proxyBackend) => navigator.clipboard.writeText(
    SETUP_PAGE_LOCATION + "?backend=" + proxyBackend.serialize(),
);

const activateBackend = (proxyBackend) => window.open(
    ACTIVATE_PAGE_LOCATION + "?backend=" + proxyBackend.serialize(),
    "_blank");

const ProxyBackendViewSummary = ({proxyBackend}) => (
    <summary>
      {proxyBackend.origin}
      <button style={{float: 'right'}}
              onclick={() => copyInstallerLink(proxyBackend)}>
        Copy Installer Link
      </button>
      <button style={{float: 'right'}}
              onclick={() => activateBackend(proxyBackend)}>
        Activate
      </button>
    </summary>
);

const ProxyBackendView = ({proxyBackend}) => (
    <details>
      <ProxyBackendViewSummary proxyBackend={proxyBackend}/>
      <TableKeyValue
          title="Headers"
          kvPairs={Object.entries(proxyBackend.headers)
          .flatMap(([k, values]) => values.map(v => [k, v]))}
      />
      <TableKeyValue
          title="Cookies"
          kvPairs={Object.entries(proxyBackend.cookies)}
      />
    </details>
);

const ViewProxyBackendsComponent = ({proxyBackends, fetchAllBackends}) => {
  useEffect(fetchAllBackends, []);
  console.log("Rendering...", proxyBackends);
  return (
      <div>
        <h1>Installed backends : </h1>
        {proxyBackends.map(t => (<ProxyBackendView proxyBackend={t}/>))}
      </div>
  );
};

export const ViewProxyBackends = connect(proxyStore)(
    ViewProxyBackendsComponent);
