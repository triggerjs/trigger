import { getPrefix } from '../prefix';
import { CustomDirective, TgDirective, TgElementExtraData } from '../type';

const SHOULD_NOT_INHERIT_DIRECTIVES = [`tg-follow`, `tg-ref`];

// As we cannot get the latest value of getPrefix here
// (require('...') run at webpack build time)
// so we have to use tg- here as key first
// and deal with custom prefix later

// Declare Object directives
const directives: Record<TgDirective, any> = {};

// Load all the directives
const importDir = require.context('./', false, /tg-[\S]+\.ts$/);
importDir.keys().map((key) => {
  const formatKey = key.match(/tg-[^.]+/)?.[0] as TgDirective | null;
  if (formatKey) {
    directives[formatKey] = importDir(key);
  }
});

// Extract the value of tg element
export function extractValues(
  element: HTMLElement,
  directive: CustomDirective,
  data?: TgElementExtraData
) {
  // Check if the directive prefix is customised
  // Replace custom prefix to tg- here if necessary
  // in order to have the correct object key
  // for getting the correct value from directives object
  let directiveKey = directive as TgDirective;

  if (directiveKey.substring(0, 3) !== 'tg-') {
    const newPrefix = getPrefix();
    directiveKey = `tg-${directiveKey.replace(newPrefix, '')}`;
  }

  if (typeof directives[directiveKey] === 'undefined') {
    return null;
  }

  const targetElement = selfOrInheritFromParent(
    element,
    directive,
    directiveKey
  );

  // In order to know whether the attribute present or not
  const value = targetElement.hasAttribute(directive)
    ? targetElement.getAttribute(directive)
    : null;

  return directives[directiveKey].get(value, data);
}

// Find the target element to get the value, is it from self, or inherit from parents?
function selfOrInheritFromParent(
  el: HTMLElement,
  directive: CustomDirective,
  directiveKey: TgDirective
) {
  // If the current element has already been set the directive
  if (
    el.hasAttribute(directive) ||
    SHOULD_NOT_INHERIT_DIRECTIVES.includes(directiveKey)
  ) {
    return el;
  }

  let currentEl: HTMLElement = el;

  // Traverse parents
  while (true) {
    currentEl = currentEl.parentElement!;

    // Already arrives to body, stop
    if (currentEl === document.body) {
      break;
    }

    if (currentEl.hasAttribute(directive)) {
      return currentEl;
    }
  }

  return el; // Return original (self) element, as no results from parents
}
