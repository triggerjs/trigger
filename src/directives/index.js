import { getPrefix } from "../prefix";

const SHOULD_NOT_INHERIT_DIRECTIVES = [`tg-follow`, `tg-ref`];

// As we cannot get the latest value of getPrefix here
// (require('...') run at webpack build time)
// so we have to use tg- here as key first
// and deal with custom prefix later

// Declare Object directives
let directives = {};

// Load all the directives
const importDir = require.context("./", false, /tg-[\S]+\.js$/);
importDir.keys().map((key) => {
  let formatKey = key.match(/tg-[^.]+/)[0];
  directives[formatKey] = importDir(key);
});

// Extract the value of tg element
export function extractValues(element, directive) {
  // Check if the directive prefix is customised
  // Replace custom prefix to tg- here if necessary
  // in order to have the correct object key
  // for getting the correct value from directives object
  let directiveKey = directive;

  if (directiveKey.substring(0, 3) !== "tg-") {
    let newPrefix = getPrefix();
    directiveKey = directiveKey.replace(newPrefix, "");
    directiveKey = `tg-${directiveKey}`;
  }

  if (typeof directives[directiveKey] === "undefined") {
    return null;
  }

  let targetElement = selfOrInheritFromParent(element, directive, directiveKey);

  // In order to know whether the attribute present or not
  let value = targetElement.hasAttribute(directive) ? targetElement.getAttribute(directive) : null;

  return directives[directiveKey].get(value);
}

// Find the target element to get the value, is it from self, or inherit from parents?
function selfOrInheritFromParent(el, directive, directiveKey) {
  // If the current element has already been set the directive
  if (el.hasAttribute(directive) || SHOULD_NOT_INHERIT_DIRECTIVES.includes(directiveKey)) {
    return el;
  }

  let currentEl = el;

  // Traverse parents
  while (true) {
    currentEl = currentEl.parentElement;

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
