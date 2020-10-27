export const dataclass = (clazz) => {
  class Dataclass extends clazz {
    constructor(fields) {
      super();
      Object.entries({...fields})
      .forEach(([k, v]) => this[k] = v);
    }

    static createFromObject = (fields) => new this(fields);
  }

  Object.defineProperty(Dataclass, 'name', {value: clazz.name});
  return Dataclass;
};



@dataclass
export class ProxyBackend {
  origin;
  headers = {};
  cookies = {};

  getCookieHeader = () => (
      Object.entries(this.cookies)
      .filter(([_, value]) => Boolean(value))
      .map(([name, value]) => `${name}=${value}`)
      .join("; ")
  );

  getAllHeaders = () => ({...this.headers, Cookie: this.getCookieHeader()});

  serialize = (encoding = 'base64') => Buffer.from(
      JSON.stringify(this), 'utf8').toString(encoding);

  static fromBase64(encodedObj) {
    const serializedJson = Buffer.from(encodedObj, 'base64').toString('ascii');
    const kv = JSON.parse(serializedJson);
    return this.createFromObject(kv);
  }
}

