# Trigger JS

Getting DOM Elements' relative position with CSS variable when page scroll. With mapping support for values, it is easy to create scroll-to-position animation like video playback.

Read this article in other languages: [English](README.md), [繁體中文](README.zh-Hant.md), [简体中文](README.zh-Hans.md).

## Introduction

Sometimes we want to create an animation or update the style of a DOM element based on the scroll position of a page, and it should also support playing forward and backwards when the page scroll down and up, just like a video playback.

## Getting Started

1. Include Trigger JS to your webpage with script tag:

```html
<script src="//unpkg.com/@triggerjs/trigger" defer></script>
```

2. Add `tg-name` to the DOM element that you want to monitor. The value of `tg-name` will be the name of the CSS variable that bind to this element.

```html
<div tg-name="scrolled" id="greeting">Hello, World</div>
```

In the above example, CSS variable `--scrolled` will be available to `#greeting`:

```html
<style>
  body {
    padding: 100vh 0; /* In order to make the page have enough rooms for scrolling */
  }

  #greeting {
    transform: translateX(
      calc(var(--scrolled) * 1px)
    ); /* Converts to px unit */
  }
</style>
```

3. Scroll the page and see the result.

## The `tg-` Attributes

| Attribute  | Type     | Default | Description                                                                                                                                                       |
| ---------- | -------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `tg-name`  | Required | -       | The CSS variable name to store the value, with or without `--` prefix.                                                                                            |
| `tg-from`  | Optional | `0`     | The start value                                                                                                                                                   |
| `tg-to`    | Optional | `1`     | The end value                                                                                                                                                     |
| `tg-steps` | Optional | `100`   | How many steps between `tg-from` and `tg-to`                                                                                                                      |
| `tg-step`  | Optional | `0`     | Step per increment, if this value is other than `0`, will override `tg-steps`.                                                                                    |
| `tg-map`   | Optional | (Empty) | map the value to another value. Format: `value: newValue; value2: newValue2`. Multiple values map to one value is also supported: `value,value2,value3: newValue` |
| `tg-only`  | Optional | (Empty) | Only trigger if the scroll value is on the list. Format: `1,3,5,7,9`                                                                                              |

## Value Mapping

Numbers don't always work. For example, we want to update the text color based on the scroll value, the `tg-map` attribute can help.

The following example shows how to update the text color with the rules below:
| Element Position (From the Bottom) | Scroll Value | Text Color |
| ---------------------------------- | --------------- | ---------- |
| 0% - 10% | 1 | black |
| 10% - 20% | 2 | red |
| 20% - 30% | 3 | orange |
| 30% - 40% | 4 | yellow |
| 40% - 50% | 5 | green |
| 50% - 60% | 6 | cyan |
| 60% - 70% | 7 | blue |
| 70% - 80% | 8 | purple |
| 80% - 90% | 9 | grey |
| 90% - 100% | 10 | grey |

```html
<h1
  id="heading"
  tg-name="color"
  tg-from="1"
  tg-to="10"
  tg-steps="9"
  tg-map="1: black; 2: red; 3: orange; 4: yellow; 5: green; 6: cyan; 7: blue; 8: purple; 9,10: grey"
>
  Rainbow Text
</h1>

<style>
  body {
    padding: 100vh 0; /* In order to make the page have enough rooms for scrolling */
  }

  #heading {
    color: var(--color);
  }
</style>
```

## Steps & Step

Let's say `tg-from="200"` and `tg-to="-200"`, we want to move the element in x position with `transform: translateX()`. `tg-steps` let us define how many steps from `200` to `-200`, for example, `tg-steps="400"` means run from `200` to `-200` with `400` steps, `1` per increment; In other words, `tg-steps="800"` means `0.5` per increment.

But sometimes, we do not want to do the math by ourselves, that's why `tg-step` exists. `tg-step` define the exact value of increment, please note that if `tg-step` is defined, `tg-steps` will be ingored.

## Noise Reduction

Sometimes we only interested in certain values. For example, we only want to know when `25, 50, 75` happens from `0` to `100` (`tg-from="0"` and `tg-to="100"`). In this situation, `tg-only` takes part.

```html
<h1
  id="heading"
  tg-name="color"
  tg-from="0"
  tg-to="100"
  tg-step="1"
  tg-only="25,50,75"
  tg-map="25: red; 50: yellow; 75: green"
>
  Red (25), Yellow (50), Green (75)
</h1>

<style>
  body {
    padding: 100vh 0; /* In order to make the page have enough rooms for scrolling */
  }

  #heading {
    color: var(--color);
  }
</style>
```

## Value Inheritance

Just like some CSS properties, the values of `tg-` attributes are inherit from parents if not being set in the current element. If we do not want to inherit from parent and set it as default value, just add the `tg-` attribute without value. For example:

```html
<div tg-name="scale" tg-from="0" tg-to="50">
  <span tg-name="color" tg-to>
    <!-- The value of tg-to is now 1 (Default value) -->
  </span>
</div>
```

## JavaScript Event

We can also listen to the `tg` event on an element with JavaScript:

```html
<h1
  id="heading"
  tg-name="color"
  tg-from="1"
  tg-to="3"
  tg-steps="2"
  tg-map="1:#000;2:#666;3:#ccc"
>
  Trigger JS
</h1>

<style>
  body {
    padding: 100vh 0; /* In order to make the page have enough rooms for scrolling */
  }

  #heading {
    color: var(--color);
  }
</style>

<script>
  document.querySelector("#heading").addEventListener("tg", (e) => {
    console.log(e.detail); // {value: '#666'}
  });
</script>
```

## Contribute

Feel free to fork this repository and submit pull requests. Discussions will be in GitHub Issues.

## License

Trigger.js is [MIT Licensed](LICENSE).
