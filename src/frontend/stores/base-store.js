import React, {useEffect, useState} from "react";

//Idea copied from reflux
export class SimpleStore {
  _state;

  constructor(initialState = {}) {
    this._state = initialState;
  }

  get actions() {
    return {};
  }

  listenerId = 0;
  listeners = {};

  subscribe = (handler) => {
    const subscriptionId = this.listenerId;
    const subscription = {unsubscribe: () => delete this.listeners[subscriptionId]};
    this.listeners[subscriptionId] = handler;
    this.listenerId++;
    return subscription;
  }

  setState = (newState) => this.state = newState;

  get state() {
    return this._state;
  }

  set state(newState) {
    this._state = {...this._state, ...newState};
    Object.values(this.listeners).forEach(handler => handler(this._state));
    console.log("Store updated with : ", this._state);
  }
}

// TODO: Too much risky, stores need to be mutually exclusive in terms of actions and state
export class MergedStore extends SimpleStore {
  stores;

  constructor(stores, initialState = {}) {
    super(MergedStore._mixStates(stores, initialState));
    this.stores = stores;
    this.stores.forEach(store => store.subscribe(
        stateDeltaOfThatStore => this.setState(stateDeltaOfThatStore)));
  }

  get actions() {
    return Object.fromEntries(this.stores.flatMap(
        store => Object.entries(store.actions)));
  }

  static _mixStates = (stores, initialState) => Object.fromEntries([
    ...stores.flatMap(store => Object.entries(store.state)),
    Object.entries(initialState)
  ]);
}

export const connect = (store) => (StatelessComponent) => (propsFromParent) => {
  const [storeState, setStoreState] = useState(store.state);
  useEffect(() => {
    const subscription = store.subscribe(setStoreState);
    return () => subscription.unsubscribe();
  });

  // TODO: Actions can be fired directly from store obj as well
  const props = {...propsFromParent, ...storeState, ...store.actions};
  // Caution : React uses reference equal for each props, so nested equality will not be checked before re-rendering
  return (<StatelessComponent {...props}  />);
};
