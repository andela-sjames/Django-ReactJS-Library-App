import { Promise } from 'es6-promise';

export default function lazyLoad(url: string) {
  return new Promise<string>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'arraybuffer';

    xhr.onload = () => {
      const mimetype = xhr.getResponseHeader('content-type');
      const array = new Uint8Array(xhr.response);
      let raw = '';
      array.forEach((charCode) => {
        raw += String.fromCharCode(charCode);
      });
      resolve(`data:${mimetype};base64,${btoa(raw)}`);
    };

    xhr.onerror = () => {
      reject(`Could not retrieve ${url}`);
    };

    xhr.send();
  });
}
