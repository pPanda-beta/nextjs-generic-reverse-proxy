import React from 'react';
import {ViewProxyBackends} from "../frontend/components/proxy-backend-views";

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

table {
  border-collapse: collapse;
}

table, th, td {
  border: 0.2rem solid black;
}

`;

export default () => (
    <>
      <style> {styles} </style>
      <ViewProxyBackends/>
    </>
);