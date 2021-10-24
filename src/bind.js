import { getPrefix } from "./prefix";

/**
 * add observer
 * @param {IntersectionObserver} observer 
 * @param {object} hook 
 * @param {() => void} [hook.before]
 * @param {() => void} [hook.after]
 */
export default function (observer, hook = {}) {
  // Before Hook
  hook.before?.();

  // Fetch all DOM elements with [tg-name] attribute and set the current top & left offset
  document.querySelectorAll(`[${getPrefix()}name]`).forEach((element) => {
    let { top, height } = element.getBoundingClientRect();

    element.style.setProperty("--tg-top", top + window.scrollY);
    element.style.setProperty("--tg-height", height);

    observer.observe(element);
  });

  // After Hook
  hook.after?.();
}
