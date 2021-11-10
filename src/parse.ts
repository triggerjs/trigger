import { decimalsLength, getValueInRange } from './helpers';
import { extractValues } from './directives';
import { getPrefix } from './prefix';
import { FilterValue } from './directives/tg-filter';
import { EdgeOptions } from './directives/tg-edge';
import { direction, TgElement } from './type';
import { easePercentage as ease } from './ease';

/**
 * This function will be called in observe stage,
 * caching those values into an object for ease of use in scroll event.
 */
export function parseAttributes(element: HTMLElement): TgElement {
  const prefix = getPrefix()
  const follow: HTMLElement = extractValues(element, `${prefix}follow`);

  const actualElement = follow || element;

  const style = getComputedStyle(actualElement);
  const top = +style.getPropertyValue(`--${prefix}top`);
  const height = +style.getPropertyValue(`--${prefix}height`);
  const left = +style.getPropertyValue(`--${prefix}left`);
  const width = +style.getPropertyValue(`--${prefix}width`);

  const name: string = extractValues(element, `${prefix}name`);
  const from: number = extractValues(actualElement, `${prefix}from`);
  const to: number = extractValues(actualElement, `${prefix}to`);
  const steps: number = extractValues(actualElement, `${prefix}steps`);
  const step: number = extractValues(actualElement, `${prefix}step`);
  const direction: direction = extractValues(actualElement, `${prefix}direction`);
  const bezier: string | Array<number> = extractValues(
    actualElement,
    `${prefix}bezier`
  );

  const filter: FilterValue = extractValues(element, `${prefix}filter`);
  const edge: EdgeOptions = extractValues(actualElement, `${prefix}edge`);

  const range = Math.abs(to - from);
  const increment = step === 0 ? range / steps : step;
  const segments = steps ? steps : range / increment;
  const decimals = decimalsLength(increment);
  const multiplier = from > to ? -1 : 1;
  // get the size and the position changed according to tg-direction
  const size = direction === 'vertical' ? height : width;
  const position = direction === 'vertical' ? top : left;

  const mapping: Record<string, string> = extractValues(
    element,
    `${prefix}map`,
    {
      increment,
      decimals,
    }
  );

  return {
    el: element,
    top,
    left,
    height,
    width,
    direction,
    size,
    position,
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

/**
 * Calculation happens here,
 * this function is called when scroll event happens.
 * So keep this as light as possible.
 */
export function parseValues(elements: TgElement[]) {
  elements.forEach((element) => {
    const {
      el,
      position,
      size,
      direction,
      increment,
      segments,
      decimals,
      multiplier,
      name,
      from,
      // currently unused
      // to,
      mapping,
      filter,
      edge,
      lastValue,
      bezier,
    } = element;

    const { scrolled, viewSize } = getViewInfo(direction);

    // If the name is equal to '_' (--_), skip
    if (name === '--_') {
      return;
    }

    // edge is 'cover' by default
    let percentage = edge === 'cover' ? 
        getValueInRange((scrolled + viewSize - position) / (viewSize + size), 0, 1)
      : getValueInRange((scrolled - position) / (size - viewSize), 0, 1);

    

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

/**
 * get the size and the position of the viewbox according to the direction.
 */
function getViewInfo(direction: direction) {
  if (direction === 'vertical') {
    return {
      scrolled: document.documentElement.scrollTop,
      viewSize: document.documentElement.clientHeight
    }
  } else {
    return {
      scrolled: document.documentElement.scrollLeft,
      viewSize: document.documentElement.clientLeft
    }
  }
}
