import { getPrefix } from "../prefix";

export function get(value) {
  if (!value) {
    return null;
  }

  // Suppose tg-ref is unique like id attribute
  let follow = document.querySelector(`[${getPrefix()}ref="${value}"]`);

  // Do not support follow chain right now
  if (!follow || follow.hasAttribute(`${getPrefix()}follow`)) {
    return null;
  }

  return follow;
}
