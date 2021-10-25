import { decimalsLength } from "./helpers";
import { extractValues } from "./directives";
import { getPrefix } from "./prefix";

// This function will be called in observe stage, caching those values into an object for ease of use in scroll event.
export function parseAttributes(element) {
  let follow = extractValues(element, `${getPrefix()}follow`);
  let actualElement = element;

  if (follow !== null) {
    actualElement = follow;
  }

  let style = getComputedStyle(actualElement);
  let top = Number(style.getPropertyValue("--tg-top"));
  let height = Number(style.getPropertyValue("--tg-height"));

  let name = extractValues(element, `${getPrefix()}name`);
  let from = extractValues(actualElement, `${getPrefix()}from`);
  let to = extractValues(actualElement, `${getPrefix()}to`);
  let steps = extractValues(actualElement, `${getPrefix()}steps`);
  let step = extractValues(actualElement, `${getPrefix()}step`);
  let mapping = extractValues(element, `${getPrefix()}map`);
  let filter = extractValues(element, `${getPrefix()}filter`);
  let edge = extractValues(actualElement, `${getPrefix()}edge`);

  let range = Math.abs(to - from);
  let increment = step === 0 ? range / steps : step;
  let segments = range / increment;
  let decimals = decimalsLength(increment);
  let multiplier = from > to ? -1 : 1;

  return {
    el: element,
    top,
    height,
    name,
    from,
    to,
    steps,
    step,
    mapping,
    filter,
    edge,
    range,
    increment,
    segments,
    decimals,
    multiplier,
    lastValue: null,
  };
}

// Calculation happens here, this function is called when scroll event happens. So keep this as light as possible.
export function parseValues(elements) {
  let scrolled = document.documentElement.scrollTop;
  let clientHeight = document.documentElement.clientHeight;

  elements.forEach((element) => {
    let {
      el,
      top,
      height,
      increment,
      segments,
      decimals,
      multiplier,
      name,
      from,
      to,
      mapping,
      filter,
      edge,
      lastValue,
    } = element;

    // If the name is equal to '_' (--_), skip
    if (name === "--_") {
      return;
    }

    // edge = cover by default
    let percentage = (scrolled - top + clientHeight) / (clientHeight + height);

    // edge = inset
    if (edge === "inset") {
      percentage = (scrolled - top) / clientHeight;
    }

    let value;

    let mappingValue = (
      from +
      Math.floor((segments + 1) * percentage) * increment * multiplier
    ).toFixed(decimals);

    if (multiplier === 1) {
      value = Math.min(Math.max(mappingValue, from), to);
    } else {
      value = Math.min(Math.max(mappingValue, to), from);
    }

    if (filter.values.length > 0 && !filter.values.includes(value)) {
      // If the mode is 'exact', remove the CSS property
      // Setting the lastValue to null to ensure correct comparison below
      if (filter.mode === "exact") {
        element.lastValue = null;
        el.style.removeProperty(name);
      }
      return;
    }

    if (typeof mapping[value] !== "undefined") {
      value = mapping[value];
    }

    if (lastValue != value) {
      el.style.setProperty(name, value);
      el.dispatchEvent(
        new CustomEvent("tg", {
          target: el,
          detail: {
            value,
          },
        })
      );

      element.lastValue = value;
      console.log("value", element, value);
    }
  });
}
