import React, {useEffect, useState} from "react";

//Idea copied from reflux
export class SimpleStore {
  _state;

  constructor(initialState) {
    this._state = initialState;
  }

  actions = {};
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
