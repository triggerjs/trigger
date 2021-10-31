import { decimalsLength } from './helpers';
import { extractValues } from './directives';
import { getPrefix } from './prefix';
import { FilterValue } from './directives/tg-filter';
import { EdgeOptions } from './directives/tg-edge';
import { BezierOption, TgElement } from './type';
import { cubicBezier, defaultBezier } from './ease';

// This function will be called in observe stage, caching those values into an object for ease of use in scroll event.
export function parseAttributes(element: HTMLElement): TgElement {
  const follow: HTMLElement = extractValues(element, `${getPrefix()}follow`);

  const actualElement = follow || element;

  const style = getComputedStyle(actualElement);
  const top = Number(style.getPropertyValue('--tg-top'));
  const height = Number(style.getPropertyValue('--tg-height'));

  const name: string = extractValues(element, `${getPrefix()}name`);
  const from: number = extractValues(actualElement, `${getPrefix()}from`);
  const to: number = extractValues(actualElement, `${getPrefix()}to`);
  const steps: number = extractValues(actualElement, `${getPrefix()}steps`);
  const step: number = extractValues(actualElement, `${getPrefix()}step`);
  const bezier: string | Array<number> = extractValues(
    actualElement,
    `${getPrefix()}bezier`
  );

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
    bezier,
  };
}

// Calculation happens here, this function is called when scroll event happens. So keep this as light as possible.
export function parseValues(elements: TgElement[]) {
  const scrolled = document.documentElement.scrollTop;
  const clientHeight = document.documentElement.clientHeight;

  elements.forEach((element) => {
    const {
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
      bezier,
    } = element;

    // If the name is equal to '_' (--_), skip
    if (name === '--_') {
      return;
    }

    // edge = cover by default
    let percentage =
      edge === 'cover'
        ? Math.min(
            Math.max(
              (scrolled + clientHeight - top) / (clientHeight + height),
              0
            ),
            1
          )
        : Math.min(Math.max((scrolled - top) / (height - clientHeight), 0), 1);

    // Calculation result value of bezier
    percentage = bezier ? ease(bezier, percentage) : percentage;

    let value: string | number;

    const mappingValue = (
      from +
      Math.floor((segments + 1) * percentage) * increment * multiplier
    ).toFixed(decimals);
    value = +mappingValue;

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

function ease(bezier: BezierOption, percentage: number): number {
  if (typeof bezier === 'string') {
    percentage = defaultBezier[bezier as string](percentage);
  } else {
    let [p1x, p1y, p2x, p2y] = bezier as Array<number>;
    percentage = cubicBezier(p1x, p1y, p2x, p2y)(percentage);
  }
  return percentage;
}
