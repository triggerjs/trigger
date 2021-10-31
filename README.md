# Trigger JS

[![Build Status](https://github.com/triggerjs/trigger/actions/workflows/build.yml/badge.svg)](https://github.com/triggerjs/trigger/blob/main/.github/workflows/build.yml)
[![npm version](https://img.shields.io/npm/v/@triggerjs/trigger.svg)](https://www.npmjs.com/package/@triggerjs/trigger)
[![npm downloads](https://img.shields.io/npm/dm/@triggerjs/trigger.svg)](https://www.npmjs.com/package/@triggerjs/trigger)
![GitHub Stars](https://img.shields.io/github/stars/triggerjs/trigger)
![Github Forks](https://img.shields.io/github/forks/triggerjs/trigger)
![GitHub Open Issues](https://img.shields.io/github/issues/triggerjs/trigger)
![License](https://img.shields.io/github/license/triggerjs/trigger)

*Scrolling your effect with CSS variable*

Get the desired value with CSS variable on page scroll for your animation needed, without writing a single line of JavaScript code.

Sometimes we want to create an animation or update the CSS style of an HTML element based on the scroll position, just like fast-forwarding or rewinding a video by scrolling up and down.

When Trigger started up, it only had the function that an element faded in or out in a page when an user scrolled it by setting a number from 0 to 1. However, This setting was not enough for various of animation needs. The number range needed to be configurable. With the helps of mapping and filtering, we are allowed to map a number to CSS effect such as color, for us to use it in CSS directly. Checkout [examples here](https://codepen.io/collection/eJmoMr).

Read this document in other languages: [English](README.md), [繁體中文](README.zh-Hant.md), [简体中文](README.zh-Hans.md).

## Getting Started

#### Method 1: Via CDN

1. Include Trigger JS to your webpage with a script tag:

```html
<script src="//unpkg.com/@triggerjs/trigger" defer></script>
```

2. Add `tg-name` to the DOM element that you want to monitor. The value of `tg-name` is the name of the CSS variable that binds to the element.

```html
<div tg-name="scrolled" id="greeting">Hello, World</div>
```

In the above example, CSS variable `--scrolled` is added to the selector `#greeting`:

```html
<style>
  body {
    padding: 100vh 0; /* In order to make the page have enough room for scrolling */
  }

  #greeting {
    transform: translateX(
      calc(var(--scrolled) * 1px)
    ); /* Converts to px unit */
  }
</style>
```

3. Scroll the page and see the result.

### Method 2: Build from source

1. Get the library in either way:
   - From GitHub
   ```bash
   git clone https://github.com/triggerjs/trigger.git
   ```
   - From NPM
   ```bash
   npm i @triggerjs/trigger
   ```
2. Change to the directory, install the dependencies:
   ```bash
   npm install
   ```
3. There is already a pre-built version `bundle.js` located in `dist`. Run a local web server and browse the greeting example in `index.html` :
   1. For example, type `npx serve` in the terminal
   2. Open up `http://localhost:5000` in web browser.
   3. Scroll the page and see the result.
4. The following command will build a new version to `dist/bundle.js`:
   - For development (with watch):
     ```bash
     npm run watch
     ```
   - For development:
     ```bash
     npm run build
     ```
   - For production:
     ```bash
     npm run prod
     ```

## The `tg-` Attributes

| Attribute   | Type     | Default | Description                                                                                                                                                                                                                                                                                                                                                                                                            |
| ----------- | -------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `tg-name`   | Required | -       | The CSS variable name to store the value, with or without `--` prefix.                                                                                                                                                                                                                                                                                                                                                 |
| `tg-from`   | Optional | `0`     | The start value                                                                                                                                                                                                                                                                                                                                                                                                        |
| `tg-to`     | Optional | `1`     | The end value                                                                                                                                                                                                                                                                                                                                                                                                          |
| `tg-steps`  | Optional | `100`   | Trigger steps from `tg-from` to `tg-to`                                                                                                                                                                                                                                                                                                                                                                           |
| `tg-step`   | Optional | `0`     | Step per increment, if this value isn't `0`, will override `tg-steps`.                                                                                                                                                                                                                                                                                                                                         |
| `tg-map`    | Optional | (Empty) | map the value to another value. Format: `value: newValue; value2: newValue2`. Multiple values mapped to one value is also supported: `value,value2,value3: newValue`                                                                                                                                                                                                                                                      |
| `tg-filter` | Optional | (Empty) | Only trigger if the scroll value is on the list. Format: `1,3,5,7,9`. By default, the filter mode is `retain`. If we want to switch the mode to `exact`, add an `!` at the end of the value. Read more about this in the dedicated section following.                                                                                                                                                                                     |
| `tg-edge`   | Optional | cover   | Calculate the start and end of the scrolling effect. `cover` means off-screen to off-screen. The calculation starts in the appearance of the element at the bottom, and ends in the disappearance of element at the top; `inset` represents the calculation begins after the top edge of the element touches the top of the screen, ends when the bottom edge of the element reached the bottom of the screen. See below section for a diagram. |
| `tg-follow` | Optional | (Empty) | Use the result calculated from another element instead. The value of `tg-follow` is the value of the target element's `tg-ref`. **Caution**: When `tg-follow` is set, `tg-from`, `tg-to`, `tg-steps`, `tg-step` and `tg-edge` are ignored in the same element.                                                                                                                                                  |
| `tg-ref`    | Optional | (Empty) | Define the name of the referenced used by an element with `tg-follow`.                                                                                                                                                                                                                                                                                                                                |

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

Sometimes we only interested in certain values. For example, we only want to know when `25, 50, 75` happens from `0` to `100` (`tg-from="0"` and `tg-to="100"`). In this situation, `tg-filter` takes part.

```html
<h1
  id="heading"
  tg-name="color"
  tg-from="0"
  tg-to="100"
  tg-step="1"
  tg-filter="25,50,75"
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

## The mode of `tg-filter`

There are two modes for `tg-filter`, `retain` by default, the other one is `exact`. Let's use an example to clarify this:

```html
<h1
  id="heading"
  tg-name="color"
  tg-from="0"
  tg-to="10"
  tg-step="1"
  tg-filter="5"
  tg-map="5: blue"
>
  Trigger.js
</h1>

<style>
  body {
    padding: 100vh 0; /* In order to make the page have enough rooms for scrolling */
  }

  #heading {
    --color: black;
    color: var(--color);
  }
</style>
```

In the above example, the text has an initial color of black, and it will turn blue when it arrives at the middle of the page and never turn black again because there is nothing to trigger the black color.

So let's say we want the text color becomes blue only when the calculation value is `5`, and becomes black for other values, We can change it to:

```html
<h1
  id="heading"
  tg-name="color"
  tg-from="0"
  tg-to="10"
  tg-step="1"
  tg-filter="4,5,6"
  tg-map="4: black; 5: blue; 6: black"
>
  Trigger.js
</h1>
```

This works, but the code becomes redundant quickly. To solve this, we can switch the filter mode to `exact` by adding an `!` at the end of `tg-filter`:

```html
<h1
  id="heading"
  tg-name="color"
  tg-from="0"
  tg-to="10"
  tg-step="1"
  tg-filter="5!"
  tg-map="5: blue"
>
  Trigger.js
</h1>
```

In `exact` mode, `--color` becomes `blue` when the value is `5`, and becomes the default when the value is other than `5`.

The design by adding an `!` directly to `tg-filter` is that this requirement should only happen when `tg-filter` is used. Separating to yet another attribute should not be necessary and might cause misunderstanding.

## Value Inheritance

Just like some CSS properties, the values of `tg-` attributes (except `tg-follow`, `tg-ref`) are inherited from parents if not being set in the current element. If we do not want to inherit from parent and set it as default value, just add the `tg-` attribute without value. For example:

```html
<div tg-name="scale" tg-from="0" tg-to="50">
  <span tg-name="color" tg-to>
    <!-- The value of tg-to is now 1 (Default value) -->
  </span>
</div>
```

## `tg-edge` Explaination

The different between `cover` (default) and `edge`:

![](/readme-assets/tg-edge-explaination.png)

So that if `tg-edge="inset"`, the element must be higher than the viewport (`window.clientHeight`).

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
  document.querySelector('#heading').addEventListener('tg', (e) => {
    console.log(e.detail); // {value: '#666'}
  });
</script>
```

## Customising the Prefix

In case you are concerning about the `tg-` prefix that is not quite fulfill the standard of HTML5, it can be customised by the following setting in the `body` tag with `data-trigger-prefix` attribute:

```html
<body data-trigger-prefix="data-tg">
  <div data-tg-name="scrolled" id="greeting">Hello, World</div>
</body>
```

The above example customised the prefix to `data-tg`. `data-*` is a completely valid attribute for putting custom data in HTML5.

## Contribute

Feel free to fork this repository and submit pull requests. Bugs report in [GitHub Issues](https://github.com/triggerjs/trigger/issues), features/ideas/questions discuss in [GitHub Discussions](https://github.com/triggerjs/trigger/discussions).

## License

Trigger.js is [MIT Licensed](LICENSE).
