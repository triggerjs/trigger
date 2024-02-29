import { decimalsLength } from './helpers';
import { extractValues } from './directives';
import { getPrefix } from './prefix';
import { FilterValue } from './directives/tg-filter';
import { EdgeOptions } from './directives/tg-edge';
import { direction, TgElement } from './type';
import { getPercentage, getMappingValue } from './value';

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
      name,
      // currently unused
      // to,
      mapping,
      filter,
      lastValue,
    } = element;

    // If the name is equal to '_' (--_), skip
    if (name === '--_') {
      return;
    }

    const percentage = getPercentage(element);
    const mappingValue = getMappingValue(element, percentage);

    if (filter.values.length > 0 && !filter.values.includes(mappingValue)) {
      // If the mode is 'exact', remove the CSS property
      // Setting the lastValue to null to ensure correct comparison below
      if (filter.mode === 'exact') {
        element.lastValue = null;
        el.style.removeProperty(name);
      }
      return;
    }

    const value: string = mapping[mappingValue] ? mapping[mappingValue] : `${mappingValue}`;

    if (lastValue != value) {
      el.style.setProperty(name, value);
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



