# Trigger JS

通过 CSS 变量获取页面卷动的相对位置。经由映射功能，我们可以轻易地因应页面卷动位置制作动画，将页面卷轴变为视频播放器的时间轴一样。

阅读本文档的其他语言版本：[English](README.md)、[繁體中文](README.zh-Hant.md)、[简体中文](README.zh-Hans.md)。

## 简介

有时候我们想因应页面卷动的位置建立动画，又或更新 DOM 元素的 CSS 样式。而且它应该像视频播放一样，动画在页面向上卷动时后退，页面向下卷动时前进。

## 如何使用

1. 通过 script 标签将 trigger.js 加载到网页中：

```html
<script src="//unpkg.com/@triggerjs/trigger" defer></script>
```

2. 为对应的 DOM 元素加上 `tg-name` 属性，设定值等于接收数值的 CSS 变量名。

```html
<div tg-name="scrolled" id="greeting">Hello, World</div>
```

上述例子中，CSS 变量 `--scrolled` 会被加入到 `#greeting` 选择器中：

```html
<style>
  body {
    padding: 100vh 0; /* 确保页面有足够空间卷动 */
  }

  #greeting {
    transform: translateX(calc(var(--scrolled) * 1px)); /* 转换为 px 单位 */
  }
</style>
```

3. 卷动页面，测试效果。

## `tg-` 属性列表

| 属性名称    | 类型 | 默认值     | 简介                                                                                                                                                                                           |
| ----------- | ---- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `tg-name`   | 必填 | -          | 接收卷动值的 CSS 变数名称，是否加上 `--` 前缀都可。                                                                                                                                            |
| `tg-from`   | 选填 | `0`        | 起始值                                                                                                                                                                                         |
| `tg-to`     | 选填 | `1`        | 终点值                                                                                                                                                                                         |
| `tg-steps`  | 选填 | `100`      | 从 `tg-from` 至 `tg-to` 之间触发多少次                                                                                                                                                         |
| `tg-step`   | 选填 | `0`        | 每次递加的数值，如果此值不为 `0`，则会忽略 `tg-steps` 的设定。                                                                                                                                 |
| `tg-map`    | 选填 | (空白字串) | 将一个值映射至另一个值。格式：`value: newValue; value2: newValue2`。亦支援同时将多个值映射至另一个值：`value,value2,value3: newValue`                                                          |
| `tg-filter` | 选填 | (空白字串) | 只当卷动值在列表当中时才触发，格式：`1,3,5,7,9`。默认情况下，过滤模式是 `retain`（保留值），在设定值末端加入 `!` 符号可以将模式切换为 `exact`（绝对）。关于两个模式的分别，请参考后续的内容。  |
| `tg-edge`   | 选填 | cover      | 计算卷动值的起始点。`cover` 代表画面外至画面外，即在元素进入画面时即开始计算；`inset` 代表在元素完整进入画面时开始计算，在刚离开画面时终止。                                                   |
| `tg-follow` | 选填 | (空白字串) | 引用其他元素的计算值。`tg-follow` 的设定值等于目标元素的 `tg-ref` 设定值。**注意**：当设定了 `tg-follow`，同一元素下的 `tg-from`、`tg-to`、`tg-steps`、`tg-step` 以及 `tg-edge` 设定会被忽略。 |
| `tg-ref`    | 选填 | (空白字串) | 定义可以被其他元素通过 `tg-follow` 引用的名称。                                                                                                                                                |

## 映射 (Value Mapping)

数字并不适用于所有情况。例如，我们希望在卷动页面的时候更改文字颜色，这个时候 `tg-map` 属性就派上用场了。

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
    padding: 100vh 0; /* 确保页面有足够空间卷动 */
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
    padding: 100vh 0; /* 确保页面有足够空间卷动 */
  }

  #heading {
    color: var(--color);
  }
</style>
```

## `tg-filter` 的模式

`tg-filter` 有两个模式，预设是 `retain`，另一个设定值是 `exact`。为了更好的说明差异，请参阅以下例子：

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
    padding: 100vh 0; /* 确保页面有足够空间卷动 */
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

就像一些 CSS 属性一样，`tg-` 属性的值会继承自父级元素（如果当前元素没有设定的话）。如果不希望继承父级元素的值，并设定为默认值的话，只需增加没有值的 `tg-` 属性即可。例如：

```html
<div tg-name="scale" tg-from="0" tg-to="50">
  <span tg-name="color" tg-to>
    <!-- tg-to 现在的值是 1（默认值） -->
  </span>
</div>
```

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
  document.querySelector("#heading").addEventListener("tg", (e) => {
    console.log(e.detail); // {value: '#666'}
  });
</script>
```

## 参与开发

欢迎 Fork 这个 Repo 进行开发，并提交 Pull Requests。我们会在 GitHub Issues 中进行讨论。

## 授权协议

Trigger.js 使用 [MIT 授权](LICENSE).
