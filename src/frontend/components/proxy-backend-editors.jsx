import React, {useState} from "react";
import {connect} from "../stores/base-store";
import {proxyStore} from "../beans";
import {ProxyBackend} from "../../models";

const groupingBy = (keyExtractor, valueExtractor = (t => t)) => [(mergedObj,
    t) => Object.assign(mergedObj, {
  [keyExtractor(t)]: [...(mergedObj[keyExtractor(t)] || []), valueExtractor(t)]
}), {}]

const eventValue = (ev) => ev.target.value;
const withEventValue = (consumer) => (ev) => consumer(eventValue(ev));

const KeyValueEditor = ({kvs, onKVsUpdate, label, addLabel = 'Add \u{2795}', deleteLabel = 'Delete  \u{1f5d1}'}) => {
  const addKV = (t = {key: '', value: ''}) => onKVsUpdate([...kvs, t]);
  const updateKVAtIndex = (index, newIthValue) => onKVsUpdate(
      kvs.map((t, i) => i === index ? newIthValue : t));
  const removeAtIndex = (index) => onKVsUpdate(
      kvs.filter((t, i) => i !== index));

  return (
      <>
        {label} -
        <button onclick={() => addKV()}>{addLabel}</button>
        <br/>
        {kvs.map((t, i) => (
            <>
              {i}.
              <input placeholder="key"
                     value={t.key}
                     onblur={withEventValue(val => updateKVAtIndex(i,
                         {...t, key: val}))}
              />
              <input placeholder="value"
                     value={t.value}
                     onblur={withEventValue(val => updateKVAtIndex(i,
                         {...t, value: val}))}
              />
              <button onclick={() => removeAtIndex(i)}>{deleteLabel}</button>
              <br/>
            </>)
        )}
      </>
  );
}

const AddProxyBackendComponent = ({saving, addBackend}) => {
  const [origin, setOrigin] = useState('https://');
  const [headers, setHeaders] = useState([]);
  const [cookies, setCookies] = useState([]);
  const [localStorage, setLocalstorage] = useState([]);

  const headersAsKeyMultivaluePairs = () => headers.reduce(
      ...groupingBy(t => t.key, t => t.value));

  const installDraftBackend = () => addBackend(new ProxyBackend({
    origin,
    headers: headersAsKeyMultivaluePairs(),
    cookies: Object.fromEntries(cookies.map(t => [t.key, t.value])),
    localStorageItems: Object.fromEntries(localStorage.map(t => [t.key, t.value])),
  }))

  return (
      <div>
        <h1>Add a new backend </h1>
        <input placeholder="origin" value={origin}
               onchange={withEventValue(val => setOrigin(val))}/>
        <br/>
        <KeyValueEditor label="Headers : " kvs={headers}
                        onKVsUpdate={setHeaders}/>
        <KeyValueEditor label="Cookies : " kvs={cookies}
                        onKVsUpdate={setCookies}/>
        <KeyValueEditor label="LocalStorage : " kvs={localStorage}
                        onKVsUpdate={setLocalstorage}/>
        <br/>
        <button onclick={installDraftBackend} disabled={saving}>
          {saving ? 'Installing...' : 'Install backend'}
        </button>
      </div>
  );
};

export const AddProxyBackend = connect(proxyStore)(
    AddProxyBackendComponent);
