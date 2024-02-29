import { getPrefix } from './prefix';

export interface BindHook {
  before?: () => void;
  after?: () => void;
}

export default function (
  observer: IntersectionObserver | null,
  hook?: BindHook
) {
  // Before Hook
  hook && typeof hook.before === 'function' && hook.before();

  // Fetch all DOM elements with [tg-name] attribute and set the current top & left offset
  const prefix = getPrefix()
  document
    .querySelectorAll<HTMLElement>(`[${prefix}name]`)
    .forEach((element) => {
      const { top, height, left, width } = element.getBoundingClientRect();

      element.style.setProperty(`--${prefix}top`, `${top + window.scrollY}`);
      element.style.setProperty(`--${prefix}left`, `${left + window.scrollX}`);
      element.style.setProperty(`--${prefix}height`, `${height}`);
      element.style.setProperty(`--${prefix}width`, `${width}`);

      observer && observer.observe(element);
    });

  // After Hook
  hook && typeof hook.after === 'function' && hook.after();
}
