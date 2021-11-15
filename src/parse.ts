import { decimalsLength, getMapTypeAndValue } from './helpers';
import { extractValues } from './directives';
import { getPrefix } from './prefix';
import { FilterValue } from './directives/tg-filter';
import { EdgeOptions } from './directives/tg-edge';
import { TgElement } from './type';
import { easePercentage as ease } from './ease';
import { gradientColors } from './color';
import rgbcolor from 'rgb-color';

/**
 * This function will be called in observe stage,
 * caching those values into an object for ease of use in scroll event.
 */
export function parseAttributes(element: HTMLElement): TgElement {
  const prefix = getPrefix();
  const follow: HTMLElement = extractValues(element, `${prefix}follow`);

  const actualElement = follow || element;

  const style = getComputedStyle(actualElement);
  const top = +style.getPropertyValue(`--${prefix}top`);
  const height = +style.getPropertyValue(`--${prefix}height`);

  const name: string = extractValues(element, `${prefix}name`);
  const from: number = extractValues(actualElement, `${prefix}from`);
  const to: number = extractValues(actualElement, `${prefix}to`);
  const steps: number = extractValues(actualElement, `${prefix}steps`);
  const step: number = extractValues(actualElement, `${prefix}step`);
  const bezier: string | Array<number> = extractValues(
    actualElement,
    `${prefix}bezier`
  );

  const filter: FilterValue = extractValues(element, `${prefix}filter`);
  const edge: EdgeOptions = extractValues(actualElement, `${prefix}edge`);

  const range = Math.abs(to - from);
  const increment = step === 0 ? range / steps : step;
  const segments = range / increment;
  const decimals = decimalsLength(increment);
  const multiplier = from > to ? -1 : 1;

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

/**
 * Calculation happens here,
 * this function is called when scroll event happens.
 * So keep this as light as possible.
 */
export function parseValues(elements: TgElement[]) {
  const { scrollTop: scrolled, clientHeight } = document.documentElement;

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
      // currently unused
      // to,
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

    // edge is 'cover' by default
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
      if (filter.mode === 'smooth') {
        let region = calcKeyFrameRegion(mapping, value);
        // console.log(region);

        if (region.length) {
          value = calcKeyFrameValue(mapping, value, region);
        } else {
          return;
        }
      } else {
        if (filter.mode === 'exact') {
          element.lastValue = null;
          el.style.removeProperty(name);
        }
        return;
      }
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
    }
  });
}

// Calculate the result value of the keyframe corresponding to the current value
const calcKeyFrameValue = (
  mapping: Record<string, string>,
  value: number,
  region: Array<any>
) => {
  const [lkey, rkey] = region;
  const lValue = getMapTypeAndValue(mapping[lkey]);
  const rValue = getMapTypeAndValue(mapping[rkey]);
  const curKeyRange = Math.abs(value - +lkey);
  const percentage = curKeyRange / (rkey - lkey);
  // If the value is a color value
  if (rValue.type === 'color' && lValue.type === 'color') {
    // TODO: Link the steps here with user settings……
    const steps = 100;
    const graColor = gradientColors(lValue.val, rValue.val, steps);
    const key = (percentage * steps).toFixed(0);
    return graColor[key];
  } else {
    const range = Math.abs(rValue.val - lValue.val);
    const multiplier = lValue.val > rValue.val ? -1 : 1;
    return lValue.val + range * percentage * multiplier;
  }
};

// Calculate which range the current value is in the mapping
const calcKeyFrameRegion = (mapping: Record<string, string>, value: number) => {
  if (Object.keys(mapping).length === 1) {
    return [];
  } else {
    let lastKey = '',
      currentKey = '';

    for (const key of Object.getOwnPropertyNames(mapping).sort((a, b) => {
      return +a - +b;
    })) {
      if (lastKey === null) {
        lastKey = key;
        continue;
      } else {
        currentKey = key;
        if (
          (value >= +lastKey && value <= +currentKey) ||
          (value >= +currentKey && value <= +lastKey)
        ) {
          return [lastKey, currentKey];
        }
      }
      lastKey = key;
    }
  }
  return [];
};
