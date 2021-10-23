let prefix = `tg`;

export function getPrefixSetting() {
  if (
    typeof document.body === "undefined" ||
    !document.body.hasAttribute("data-trigger-prefix")
  ) {
    return;
  }

  let newPrefix = document.body.getAttribute("data-trigger-prefix");
  setPrefix(newPrefix);
}

function setPrefix(str) {
  if (typeof str !== "string" || str.trim() === "") {
    return;
  }

  str = str.trim();
  prefix = str;
}

export function getPrefix() {
  return `${prefix}-`;
}
