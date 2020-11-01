const getAllDefinedKeys = (obj) => (obj.constructor
    && obj.constructor.name === "Object") ? [] : [
  ...Object.keys(obj),
  ...getAllDefinedKeys(Object.getPrototypeOf(obj))
]

const getAllDefinedEntries = (obj) => getAllDefinedKeys(obj).map(
    k => [k, obj[k]]);

export const dataclass = (clazz) => {
  class Dataclass extends clazz {
    constructor(fields) {
      super();
      Object.entries({...fields})
      .forEach(([k, v]) => this[k] = v);
    }

    asObject = () => Object.fromEntries(getAllDefinedEntries(this));

    static createFromObject = (fields) => new this(fields);
  }

  Object.defineProperty(Dataclass, 'name', {value: clazz.name});
  return Dataclass;
};

class NestedMap {
  _current = new Map();

  get = ([key, ...remainingKeys]) => remainingKeys.length === 0 ?
      this._current.get(key) : this._current.get(key).get(remainingKeys);

  has = ([key, ...remainingKeys]) => this._current.has(key) && (
      remainingKeys.length === 0 || this._current.get(key).has(remainingKeys));

  getOrElse = (keys, defaultValue) => this.has(keys) ?
      this.get(keys) : defaultValue;

  set = ([key, ...remainingKeys], value) => {
    if (remainingKeys.length === 0) {
      this._current.set(key, value);
    } else {
      this._current.has(key) || this._current.set(key, new NestedMap());
      this._current.get(key).set(remainingKeys, value);
    }
    return this;
  }
}

const PROPERTY_STORAGE = new NestedMap();
const identity = t => t;

const propertyDecorator = ({
  afterGet: getTransformer = identity, beforeSet: setTransformer = identity
} = {}) => (clazz, name, descriptor) => {
  const {get: oldGetter, set: oldSetter, initializer, value: oldValue} = descriptor;

  const defaultValue = oldValue || (initializer && initializer());

  const managedGetter = (instance) => PROPERTY_STORAGE.getOrElse(
      [clazz, instance, name], defaultValue);
  const managedSetter = (val, instance) => PROPERTY_STORAGE.set(
      [clazz, instance, name], val);

  const getter = oldGetter || managedGetter;
  const setter = oldSetter || managedSetter;
  return {
    // ...descriptor,
    configurable: true,
    enumerable: true,
    get() {
      return getTransformer(getter(this));
    },
    set(value) {
      setter(setTransformer(value), this);
    }
  };
}

export const filterNonEmptyKeys = (obj) => Object.fromEntries(
    Object.entries(obj).filter(([k, _]) => /\S+/.test(k)));

export const keepNonEmptyKeysOnly = propertyDecorator({
  beforeSet: filterNonEmptyKeys
});
