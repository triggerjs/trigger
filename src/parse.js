import { decimalsLength } from "./helpers";
import { extractValues } from "./directives";

// This function will be called in observe stage, caching those values into an object for ease of use in scroll event.
export function parseAttributes(element) {
  let follow = extractValues(element, "tg-follow");
  let actualElement = element;

  if (follow !== null) {
    actualElement = follow;
  }

  let style = getComputedStyle(actualElement);
  let top = Number(style.getPropertyValue("--tg-top"));
  let height = Number(style.getPropertyValue("--tg-height"));

  let name = extractValues(element, "tg-name");
  let from = extractValues(actualElement, "tg-from");
  let to = extractValues(actualElement, "tg-to");
  let steps = extractValues(actualElement, "tg-steps");
  let step = extractValues(actualElement, "tg-step");
  let mapping = extractValues(element, "tg-map");
  let filtered = extractValues(element, "tg-filter");
  let edge = extractValues(actualElement, "tg-edge");

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
    filtered,
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
      filtered,
      edge,
      lastValue,
    } = element;

    // edge = cover by default
    let percentage = (scrolled - top + clientHeight) / (clientHeight + height);

    // edge = inset
    if (edge === "inset") {
      percentage =
        (scrolled - top + clientHeight - height) / (clientHeight - height);
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

    if (filtered.length > 0 && !filtered.includes(value)) {
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
