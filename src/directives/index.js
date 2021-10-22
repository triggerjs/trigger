const SHOULD_NOT_INHERIT_DIRECTIVES = ["tg-follow", "tg-ref"];

let directives = {
  "tg-name": require("./tg-name"),
  "tg-from": require("./tg-from"),
  "tg-to": require("./tg-to"),
  "tg-steps": require("./tg-steps"),
  "tg-step": require("./tg-step"),
  "tg-map": require("./tg-map"),
  "tg-filter": require("./tg-filter"),
  "tg-edge": require("./tg-edge"),
  "tg-follow": require("./tg-follow"),
  "tg-ref": require("./tg-ref"),
};

// Extract the value of tg element
export function extractValues(element, directive) {
  if (typeof directives[directive] === "undefined") {
    return null;
  }

  let targetElement = selfOrInheritFromParent(element, directive);

  // In order to know whether the attribute present or not
  let value = targetElement.hasAttribute(directive)
    ? targetElement.getAttribute(directive)
    : null;

  return directives[directive].get(value);
}

// Find the target element to get the value, is it from self, or inherit from parents?
function selfOrInheritFromParent(el, directive) {
  // If the current element has already been set the directive
  if (
    el.hasAttribute(directive) ||
    SHOULD_NOT_INHERIT_DIRECTIVES.includes(directive)
  ) {
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
