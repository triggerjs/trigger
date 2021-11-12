import { easePercentage as ease } from './ease';
import { compose, getValueInRange } from "./helpers";
import { TgElement, direction } from "./type";

/**
 * get the final percent with the percent function composed
 * @param ele 
 * @returns 
 */
export function getPercentage(ele: TgElement): number {
  const percentFunc = ele.bezier ?
    compose(
      getInitPercentage,
     (percentage: number) => ease(ele.bezier, percentage)
    ) : 
    getInitPercentage;
  
  return percentFunc(ele);
}

/**
 * get the mappingValue with the element
 * @param ele 
 * @param percentage 
 * @returns 
 */
export function getMappingValue(ele: TgElement, percentage: number): number {
  const {
    from,
    segments,
    decimals,
    increment,
    multiplier
  } = ele;
  const mappingValue = +(
    from +
    Math.floor((segments + 1) * percentage) * increment * multiplier
  ).toFixed(decimals);

  return mappingValue;
}

/**
 * get the initial percent with direction, size, position.
 * @param ele 
 * @returns {number} percentage
 */
function getInitPercentage(ele: TgElement): number {
    const {
      edge,
      size,
      direction,
      position,
    } = ele;
    const { scrolled, viewSize } = getViewInfo(direction);
    // edge is 'cover' by default
    const percentage = edge === 'cover' ? 
        getValueInRange((scrolled + viewSize - position) / (viewSize + size), 0, 1)
      : getValueInRange((scrolled - position) / (size - viewSize), 0, 1);

    return percentage;
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