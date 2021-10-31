import { Prefix } from './type';

let prefix = `tg`;

export function getPrefixSetting() {
  const newPrefix = document.body && document.body.getAttribute('data-trigger-prefix');
  newPrefix && setPrefix(newPrefix);
}

function setPrefix(str: string) {
  if (typeof str !== 'string' || !(str = str.trim())) {
    return;
  }

  prefix = str;
}

export function getPrefix(): Prefix {
  return `${prefix}-`;
}
