import { decimalsLength } from "./helpers";
import { extractValues } from "./directives";

// This function will be called in observe stage, caching those values into an object for ease of use in scroll event.
export function parseAttributes(element) {
  let style = getComputedStyle(element);
  let top = Number(style.getPropertyValue("--tg-top"));
  let height = Number(style.getPropertyValue("--tg-height"));

  let name = extractValues(element, "tg-name");
  let from = extractValues(element, "tg-from");
  let to = extractValues(element, "tg-to");
  let steps = extractValues(element, "tg-steps");
  let step = extractValues(element, "tg-step");
  let mapping = extractValues(element, "tg-map");
  let only = extractValues(element, "tg-only");

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
    only,
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
      only,
      lastValue,
    } = element;

    let percentage = (scrolled - top + clientHeight) / (clientHeight + height);

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

    if (only.length > 0 && !only.includes(value) && lastValue !== null) {
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
