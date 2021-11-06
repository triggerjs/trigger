# Trigger JS

[![Build Status](https://github.com/triggerjs/trigger/actions/workflows/build.yml/badge.svg)](https://github.com/triggerjs/trigger/blob/main/.github/workflows/build.yml)
[![npm version](https://img.shields.io/npm/v/@triggerjs/trigger.svg)](https://www.npmjs.com/package/@triggerjs/trigger)
[![npm downloads](https://img.shields.io/npm/dm/@triggerjs/trigger.svg)](https://www.npmjs.com/package/@triggerjs/trigger)
![GitHub Stars](https://img.shields.io/github/stars/triggerjs/trigger)
![Github Forks](https://img.shields.io/github/forks/triggerjs/trigger)
![GitHub Open Issues](https://img.shields.io/github/issues/triggerjs/trigger)
![License](https://img.shields.io/github/license/triggerjs/trigger)

*毋须编写 JavaScript，建立页面滚动动画。*

有时候我们想因应页面滚动的位置建立动画，或更新 HTML 元素的 CSS 样式。就像视频播放一样，动画在页面向上滚动时前进，向下滚动时后退。

使用 Trigger JS，在页面滚动时即可透过 CSS 变量取得制作动画所需的值，而毋须编写任何 JavaScript 代码，相关设置则可通过 HTML 属性实现。[点击这里](https://codepen.io/collection/eJmoMr)查看范例。

阅读本文档的其他语言版本：[English](README.md)、[繁體中文](README.zh-Hant.md)、[简体中文](README.zh-Hans.md)。

## 如何使用

#### 方法一：使用 CDN 版本

1. 通过 script 标签将 trigger.js 加载到网页中：
   - UNPKG CDN:
    ```html
    <script src="//unpkg.com/@triggerjs/trigger" defer></script>
    ```
   - jsDelivr CDN:
    ```html
    <script src="//cdn.jsdelivr.net/npm/@triggerjs/trigger" defer></script>
    ```

2. 为对应的 DOM 元素加上 `tg-name` 属性，设定值等于接收数值的 CSS 变量名。

```html
<div tg-name="scrolled" id="greeting">Hello, World</div>
```

上述例子中，CSS 变量 `--scrolled` 会被加入到 `#greeting` 选择器中：

```html
<style>
  body {
    padding: 100vh 0; /* 确保页面有足够空间滚动 */
  }

  #greeting {
    transform: translateX(calc(var(--scrolled) * 1px)); /* 转换为 px 单位 */
  }
</style>
```

3. 滚动页面，测试效果。

#### 方法二：从源代码打包

1. 从以下任一途径获取源代码：
   - GitHub
   ```bash
   git clone https://github.com/triggerjs/trigger.git
   ```
   - NPM
   ```bash
   npm i @triggerjs/trigger
   ```
2. 切换到目录内，安装依赖：
   ```bash
   npm install
   ```
3. 本身已经有一个预打包的版本在 `dist/bundle.js`。运行一个本地网页服务器，查看范例欢迎页 `index.html`：
   1. 例如通过运行 `npx serve`
   2. 在浏览器中打开 `http://localhost:5000`
   3. 滚动页面，测试效果。
4. 以下指令会打包一个新的版本到 `dist/bundle.js`:
   - 开发环境版本（持续监听修改）：
     ```bash
     npm run watch
     ```
   - 开发环境版本：
     ```bash
     npm run build
     ```
   - 生产环境版本：
     ```bash
     npm run prod
     ```

## `tg-` 属性列表

| 属性名称    | 类型 | 默认值       | 简介                                                                                                                                                                                                                     |
| ----------- | ---- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `tg-name`   | 必填 | -            | 接收滚动值的 CSS 变量名称，是否加上 `--` 前缀都可。                                                                                                                                                                      |
| `tg-from`   | 选填 | `0`          | 起始值                                                                                                                                                                                                                   |
| `tg-to`     | 选填 | `1`          | 终点值                                                                                                                                                                                                                   |
| `tg-steps`  | 选填 | `100`        | 从 `tg-from` 至 `tg-to` 之间触发多少次                                                                                                                                                                                   |
| `tg-step`   | 选填 | `0`          | 每次递加的数值，如果此值不为 `0`，则会忽略 `tg-steps` 的设置。                                                                                                                                                           |
| `tg-map`    | 选填 | (空白字符串) | 将一个值映射至另一个值。格式：<br>- 一个值映射至另一个值：`value: newValue; value2: newValue2`<br>- 多个值映射至另一个值：`value,value2,value3: newValue`<br>- 一个范围映射至另一个值：`value...value2: newValue`        |
| `tg-filter` | 选填 | (空白字符串) | 仅当滚动值在列表当中时才触发，格式：`1,3,5,7,9`。默认情况下，过滤模式是 `retain`（保留值），在设定值末端加入 `!` 符号可以将模式切换为 `exact`（绝对）。关于两个模式的区别，请参考后续的内容。                            |
| `tg-edge`   | 选填 | cover        | 计算滚动值的起始点与结束点。`cover` 代表画面外至画面外，即在元素从底部进入画面时开始计算，从顶部完整离开画面时结束；`inset` 代表当元素的顶部触及页面的顶部时开始计算，元素的底部触及页面的底部时结束。以下将有图解说明。 |
| `tg-follow` | 选填 | (空白字符串) | 引用其他元素的计算值。`tg-follow` 的设定值等于目标元素的 `tg-ref` 设定值。**注意**：当设定了 `tg-follow`，同一元素下的 `tg-from`、`tg-to`、`tg-steps`、`tg-step` 以及 `tg-edge` 设置会被忽略。                           |
| `tg-ref`    | 选填 | (空白字符串) | 定义可以被其他元素通过 `tg-follow` 引用的名称。                                                                                                                                                                          |
| `tg-bezier` | 选填 | (空白字符串) | 贝塞尔曲线设定，设定值为 `ease`、`easeIn`、`easeOut`、`easeInOut` 或自定义的贝塞尔曲线数值，格式是：`p1x,p1y,p2x,p2y`。                                                                                                  |

## 映射 (Value Mapping)

数字并不适用于所有情况。例如，我们希望在滚动页面的时候更改文字颜色，这个时候 `tg-map` 属性就派上用场了。

以下例子示范如何根据下表的规则更新文字颜色：

| 元素位置（从页底起） | 卷动的值 | 文字颜色 |
| -------------------- | -------- | -------- |
| 0% - 10%             | 1        | black    |
| 10% - 20%            | 2        | red      |
| 20% - 30%            | 3        | orange   |
| 30% - 40%            | 4        | yellow   |
| 40% - 50%            | 5        | green    |
| 50% - 60%            | 6        | cyan     |
| 60% - 70%            | 7        | blue     |
| 70% - 80%            | 8        | purple   |
| 80% - 90%            | 9        | grey     |
| 90% - 100%           | 10       | grey     |

```html
<h1
  id="heading"
  tg-name="color"
  tg-from="1"
  tg-to="10"
  tg-steps="9"
  tg-map="1: black; 2: red; 3: orange; 4: yellow; 5: green; 6: cyan; 7: blue; 8: purple; 9,10: grey"
>
  彩虹文字
</h1>

<style>
  body {
    padding: 100vh 0; /* 确保页面有足够空间滚动 */
  }

  #heading {
    color: var(--color);
  }
</style>
```

## Steps & Step

假设 `tg-from="200"` 以及 `tg-to="-200"`，我们想通过 `transform: translateX()` 将一个元素在 x 方向移动。`tg-steps` 让我们设定从 `200` 到 `-200` 总共有多少步，举个例子，`tg-steps="400"` 等于用 `400` 步从 `200` 递减到 `-200`，每一步等于 `1`；换句话说，`tg-steps="800"` 就代表每一步等于 `0.5`。

但是有些时候，我们不想自行运算，这就是 `tg-step` 出现的原因。`tg-step` 直接定义每一步的值，所以如果定义了 `tg-step`，`tg-steps` 就会被忽略。

## 降噪

有时我们只对某些特定的值感兴趣。例如，我们只想知道从 `0` 至 `100` (`tg-from="0"` 以及 `tg-to="100"`) 之间，什么时候出现 `25, 50, 75`。在这个情况中，`tg-filter` 就可以帮上忙。

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
    padding: 100vh 0; /* 确保页面有足够空间滚动 */
  }

  #heading {
    color: var(--color);
  }
</style>
```

## `tg-filter` 的模式

`tg-filter` 有两个模式，默认是 `retain`，另一个设定值是 `exact`。为了更好的说明差异，请参阅以下例子：

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
    padding: 100vh 0; /* 确保页面有足够空间滚动 */
  }

  #heading {
    --color: black;
    color: var(--color);
  }
</style>
```

上述例子中，文字颜色初始是黑色，而将文字卷动到页面中间时，会变为蓝色。不过文字就永远都不会变回黑色了，因为没有让它改变为黑色的触发点。

如果我们想文字颜色只在计算值是 `5` 的时候改变为蓝色，其他时候是黑色，可以将代码更改为：

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

这样虽然可以，不过很快我们的代码就变得冗长。为了解决这个情况，我们可以将模式切换为 `exact`，只须在 `tg-filter` 的末端加入 `!` 符号即可：

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

在 `exact` 模式下，`--color` 只会在计算值等于 `5` 的时候设定为 `blue`，其他值的时候就变为预设值。

直接在 `tg-filter` 中加入 `!` 符号这种设计，主要是考虑到这种需求应该只会在 `tg-filter` 中发生。如果又另外建立一个属性来设定模式，可能会变得不需要甚至容易误解。

## 继承

就像一些 CSS 属性一样，`tg-` 属性（除了 `tg-follow`，`tg-ref`）的值会继承自父级元素（如果当前元素没有设定的话）。如果不希望继承父级元素的值，并设定为默认值的话，只需增加没有值的 `tg-` 属性即可。例如：

```html
<div tg-name="scale" tg-from="0" tg-to="50">
  <span tg-name="color" tg-to>
    <!-- tg-to 现在的值是 1（默认值） -->
  </span>
</div>
```

## `tg-edge` 图解

`cover`（默认值）和 `inset` 的区别如下图所示：

![](/readme-assets/tg-edge-explaination.png)

所以当 `tg-edge="inset"`，元素的高度必须大于浏览器视窗（`window.clientHeight`）的高度。

## JavaScript 事件

我们也可监听指定元素的 `tg` 事件来获取值：

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

## 自定义前缀

假如你担心 `tg-` 前缀可能不符合 HTML 5 的标准，可以通过在 `body` 标签中加入 `data-trigger-prefix` 去自定义它：

```html
<body data-trigger-prefix="data-tg">
  <div data-tg-name="scrolled" id="greeting">Hello, World</div>
</body>
```

上述例子中将前缀自定义为 `data-tg`。`data-*` 是完全符合 HTML5 标准的属性，用于设置自定义的属性和设定值。

## 参与开发

欢迎 Fork 这个 Repo 进行开发，并提交 Pull Requests。在 [GitHub Issues](https://github.com/triggerjs/trigger/issues) 回报 Bug，在 [GitHub Discussions](https://github.com/triggerjs/trigger/discussions) 讨论功能／想法／问题。

## 授权协议

Trigger.js 使用 [MIT 授权](LICENSE).
