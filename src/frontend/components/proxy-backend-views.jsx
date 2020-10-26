import React, {useEffect} from "react";
import {connect} from "../stores/base-store";
import {proxyStore} from "../beans";

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

const ProxyBackendView = ({proxyBackend}) => (
    <details>
      <summary>{proxyBackend.origin}</summary>
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
