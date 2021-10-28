import { getPrefixSetting, getPrefix } from './prefix';
import { parseAttributes, parseValues } from './parse';
import observer from './observer';
import bind from './bind';

import { TgElement, Trigger as TriggerType } from './type';

let activeElements: TgElement[] = []; // Store the elements observed by IntersectionObserver
let ob: IntersectionObserver | null = null; // Store the observer instance

getPrefixSetting(); // Get the customised prefix setting if available

/**
 * Observe all `HTMLElement`.
 *
 * @private
 */
function observeElements() {
  ob = observer((entries) => {
    entries.forEach((entry) => {
      let { target } = entry;
      if (entry.isIntersecting) {
        activeElements.push(parseAttributes(target as HTMLElement));
      } else {
        // Remove element from array if not intersecting
        activeElements = activeElements.filter(function (obj) {
          return obj.el !== target;
        });
      }
    });
  });
}

/**
 * Add event listener for `DOMContentLoaded`, `resize`, `scroll` events of window.
 *
 * @private
 */
function eventListeners() {
  // Bind tg elements
  window.addEventListener('DOMContentLoaded', () => {
    // Find all [tg-name] elements
    bind(ob);

    setTimeout(() => {
      // Run once on start, so that correct style will be set before scroll happens
      let allElements = [
        ...document.querySelectorAll(`[${getPrefix()}name]`),
      ].map((element) => {
        return parseAttributes(element as HTMLElement);
      });
      parseValues(allElements);
    });
  });

  // Re-bind if resize occurs
  window.addEventListener('resize', () => {
    bind(ob, {
      before: () => {
        // Clean Up if necessary
        activeElements.forEach((element) => {
          ob?.unobserve(element.el);
        });
        // Clean up activeElements
        activeElements = [];
      },
    });
  });

  // Update the value of CSS variable for [tg-name] elements when scroll event happens
  window.addEventListener('scroll', (e) => {
    parseValues(activeElements);
  });
}

const Trigger: TriggerType = {
  start() {
    if (!document.body) {
      console.warn(`Unable to initialise, document.body does not exist.`);
      return;
    }

    observeElements();
    eventListeners();
  },
};

export default Trigger;
