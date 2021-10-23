import { getPrefix } from "./prefix";

export default function (observer, hook) {
  // Before Hook
  typeof hook === "object" && typeof before === "function" && before();

  // Fetch all DOM elements with [tg-name] attribute and set the current top & left offset
  document.querySelectorAll(`[${getPrefix()}name]`).forEach((element) => {
    let { top, height } = element.getBoundingClientRect();

    element.style.setProperty("--tg-top", top + window.scrollY);
    element.style.setProperty("--tg-height", height);

    observer.observe(element);
  });

  // After Hook
  typeof hook === "object" && typeof after === "function" && after();
}
