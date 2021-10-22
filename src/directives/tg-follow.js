export function get(value) {
  if (!value) {
    return null;
  }

  // Suppose tg-ref is unique like id attribute
  let follow = document.querySelector(`[tg-ref="${value}"]`);

  // Do not support follow chain right now
  if (!follow || follow.hasAttribute("tg-follow")) {
    return null;
  }

  return follow;
}
