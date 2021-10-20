export function get(value) {
  let items = [];

  if (typeof value === "string" && value.trim() !== "") {
    items = value.split(",").map((item) => Number(item.trim()));
  }

  return items;
}
