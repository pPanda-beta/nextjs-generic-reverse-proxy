import React, {useEffect} from "react";
import {connect} from "../stores/base-store";
import {proxyBackendUiStore} from "../beans";

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

const ProxyBackendViewSummary = ({proxyBackend, activateBackend, copyInstallerLink}) => (
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

const ProxyBackendView = (props) => (
    <details open={!!props.opened}>
      <ProxyBackendViewSummary {...props} />
      <TableKeyValue
          title="Headers"
          kvPairs={Object.entries(props.proxyBackend.headers)
          .flatMap(([k, values]) => values.map(v => [k, v]))}
      />
      <TableKeyValue
          title="Cookies"
          kvPairs={Object.entries(props.proxyBackend.cookies)}
      />
    </details>
);

const ViewProxyBackendsComponent = ({proxyBackends, fetchAllBackends, activateBackend, copyInstallerLink}) => {
  useEffect(fetchAllBackends, []);
  console.log("Rendering...", proxyBackends);
  return (
      <div>
        <h1>Installed backends : </h1>
        {proxyBackends.map(t => (<ProxyBackendView proxyBackend={t} {...{
          activateBackend,
          copyInstallerLink
        }} />))}
      </div>
  );
};

export const ViewProxyBackends = connect(proxyBackendUiStore)(
    ViewProxyBackendsComponent);
