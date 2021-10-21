let directives = {
  "tg-name": require("./tg-name"),
  "tg-from": require("./tg-from"),
  "tg-to": require("./tg-to"),
  "tg-steps": require("./tg-steps"),
  "tg-step": require("./tg-step"),
  "tg-map": require("./tg-map"),
  "tg-only": require("./tg-only"),
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
  if (el.hasAttribute(directive)) {
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
