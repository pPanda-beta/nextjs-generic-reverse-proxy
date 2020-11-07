import {dataclass, keepNonEmptyKeysOnly} from "./utils";

@dataclass
export class ProxyBackend {
  origin;
  @keepNonEmptyKeysOnly
  headers = {};
  @keepNonEmptyKeysOnly
  cookies = {};

  @keepNonEmptyKeysOnly
  localStorageItems = {};

  getCookieHeader = () => (
      Object.entries(this.cookies)
      .filter(([_, value]) => Boolean(value))
      .map(([name, value]) => `${name}=${value}`)
      .join("; ")
  );

  getAllHeaders = () => ({...this.headers, Cookie: this.getCookieHeader()});

  serialize = (encoding = 'base64') => Buffer.from(
      JSON.stringify(this.asObject()), 'utf8').toString(encoding);

  getLocalStoragePairs = () => Object.entries(this.localStorageItems);

  static fromBase64(encodedObj) {
    const serializedJson = Buffer.from(encodedObj, 'base64').toString('ascii');
    const kv = JSON.parse(serializedJson);
    return this.createFromObject(kv);
  }
}
