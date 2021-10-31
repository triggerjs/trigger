import { decimalsLength } from './helpers';
import { extractValues } from './directives';
import { getPrefix } from './prefix';
import { FilterValue } from './directives/tg-filter';
import { EdgeOptions } from './directives/tg-edge';
import { TgElement } from './type';

// This function will be called in observe stage, caching those values into an object for ease of use in scroll event.
export function parseAttributes(element: HTMLElement): TgElement {
  const follow: HTMLElement = extractValues(element, `${getPrefix()}follow`);
  let actualElement = element;

  if (follow !== null) {
    actualElement = follow;
  }

  const style = getComputedStyle(actualElement);
  const top = Number(style.getPropertyValue('--tg-top'));
  const height = Number(style.getPropertyValue('--tg-height'));

  const name: string = extractValues(element, `${getPrefix()}name`);
  const from: number = extractValues(actualElement, `${getPrefix()}from`);
  const to: number = extractValues(actualElement, `${getPrefix()}to`);
  const steps: number = extractValues(actualElement, `${getPrefix()}steps`);
  const step: number = extractValues(actualElement, `${getPrefix()}step`);

  const filter: FilterValue = extractValues(element, `${getPrefix()}filter`);
  const edge: EdgeOptions = extractValues(actualElement, `${getPrefix()}edge`);

  const range = Math.abs(to - from);
  const increment = step === 0 ? range / steps : step;
  const segments = range / increment;
  const decimals = decimalsLength(increment);
  const multiplier = from > to ? -1 : 1;

  let mapping: Record<string, string> = extractValues(
    element,
    `${getPrefix()}map`,
    {
      increment,
      decimals,
    }
  );

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
export function parseValues(elements: TgElement[]) {
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
    if (name === '--_') {
      return;
    }

    // edge = cover by default
    let percentage = (scrolled - top + clientHeight) / (clientHeight + height);

    // edge = inset
    if (edge === 'inset') {
      percentage = (scrolled - top) / (height - clientHeight);
    }

    let value: string | number;

    let mappingValue = (
      from +
      Math.floor((segments + 1) * percentage) * increment * multiplier
    ).toFixed(decimals);

    if (multiplier === 1) {
      value = Math.min(Math.max(+mappingValue, from), to);
    } else {
      value = Math.min(Math.max(+mappingValue, to), from);
    }

    if (filter.values.length > 0 && !filter.values.includes(value)) {
      // If the mode is 'exact', remove the CSS property
      // Setting the lastValue to null to ensure correct comparison below
      if (filter.mode === 'exact') {
        element.lastValue = null;
        el.style.removeProperty(name);
      }
      return;
    }

    if (typeof mapping[value] !== 'undefined') {
      value = mapping[value];
    }

    if (lastValue != value) {
      el.style.setProperty(name, `${value}`);
      el.dispatchEvent(
        new CustomEvent('tg', {
          // @ts-ignore
          target: el,
          detail: {
            value,
          },
        })
      );

      element.lastValue = value;
      console.log('value', element, value);
    }
  });
}
