import { Prefix } from './type';

let prefix = `tg`;

export function getPrefixSetting() {
  if (
    typeof document.body === 'undefined' ||
    !document.body.hasAttribute('data-trigger-prefix')
  ) {
    return;
  }

  const newPrefix = document.body.getAttribute('data-trigger-prefix');
  newPrefix && setPrefix(newPrefix);
}

function setPrefix(str: string) {
  if (typeof str !== 'string' || str.trim() === '') {
    return;
  }

  str = str.trim();
  prefix = str;
}

export function getPrefix(): Prefix {
  return `${prefix}-`;
}
