import React, {useEffect} from "react";
import {connect} from "../stores/base-store";
import {proxyStore} from "../beans";

const ProxyBackendView = ({proxyBackend}) => (
    <details>
      <summary>Section 1</summary>
      <ul>
        <li>Origin: {proxyBackend.origin}</li>
        <pre>
        {JSON.stringify(proxyBackend)}
        </pre>
      </ul>
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
