import React, {useEffect} from "react";
import {connect} from "../stores/base-store";
import {installationStore} from "../beans";
import {ProxyBackendView} from "./proxy-backend-views";

export const LinkBasedInstallerComponent = ({
  url,
  autoInstallFromBase64, autoInstallInProgress, autoInstallMessage, autoInstallProxyBackend,
  activateBackend, copyInstallerLink
}) => {
  const serializedBackend = url?.query?.backend;
  useEffect(() => serializedBackend && autoInstallFromBase64(serializedBackend),
      [serializedBackend]);

  if (!autoInstallInProgress) {
    return (<></>);
  }
  return (
      <>
        <h1>{autoInstallMessage}</h1>
        <br/>
        <ProxyBackendView opened {...{
          proxyBackend: autoInstallProxyBackend,
          activateBackend,
          copyInstallerLink
        }} />
      </>
  );
};

export const LinkBasedInstaller = connect(installationStore)(
    LinkBasedInstallerComponent);