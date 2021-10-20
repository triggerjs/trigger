import observer from "./observer";
import bind from "./bind";
import { parseAttributes, parseValues } from "./parse";

let activeElements = []; // Store the elements observed by IntersectionObserver
let ob; // Store the observer instance

function observeElements() {
  ob = observer((entries) => {
    entries.forEach((entry) => {
      let { target } = entry;
      if (entry.isIntersecting) {
        activeElements.push(parseAttributes(target));
      } else {
        // Remove element from array if not intersecting
        activeElements = activeElements.filter(function (obj) {
          return obj.el !== target;
        });
      }
    });
  });
}

function eventListeners() {
  // Bind tg elements
  window.addEventListener("DOMContentLoaded", () => {
    // Find all [tg-name] elements
    bind(ob);
  });

  // Re-bind if resize occurs
  window.addEventListener("resize", () => {
    bind(ob, {
      before: () => {
        // Clean Up if necessary
        activeElements.forEach((element) => {
          ob.unobserve(element.el);
        });
      },
    });
  });

  // Update the value of CSS variable for [tg-name] elements when scroll event happens
  window.addEventListener("scroll", (e) => {
    parseValues(activeElements);
  });
}

let Trigger = {
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
