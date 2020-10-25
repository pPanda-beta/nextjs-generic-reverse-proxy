import React from 'react';
import {ViewProxyBackends} from "../components/proxy-backend-views";

const styles = `
details {
  background: #eee;
  color: #444;
  padding: 0.2rem;
  border: none;
  text-align: left;
  outline: none;
  font-size: 15px;
}
`;

export default () => (
    <>
      <style> {styles} </style>
      <ViewProxyBackends/>
    </>
);