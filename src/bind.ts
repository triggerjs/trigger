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
  document
    .querySelectorAll<HTMLElement>(`[${getPrefix()}name]`)
    .forEach((element) => {
      const { top, height } = element.getBoundingClientRect();

      element.style.setProperty('--tg-top', `${top + window.scrollY}`);
      element.style.setProperty('--tg-height', `${height}`);

      observer?.observe(element);
    });

  // After Hook
  hook && typeof hook.after === 'function' && hook.after();
}
