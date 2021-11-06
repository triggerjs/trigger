# Trigger JS

[![Build Status](https://github.com/triggerjs/trigger/actions/workflows/build.yml/badge.svg)](https://github.com/triggerjs/trigger/blob/main/.github/workflows/build.yml)
[![npm version](https://img.shields.io/npm/v/@triggerjs/trigger.svg)](https://www.npmjs.com/package/@triggerjs/trigger)
[![npm downloads](https://img.shields.io/npm/dm/@triggerjs/trigger.svg)](https://www.npmjs.com/package/@triggerjs/trigger)
![GitHub Stars](https://img.shields.io/github/stars/triggerjs/trigger)
![Github Forks](https://img.shields.io/github/forks/triggerjs/trigger)
![GitHub Open Issues](https://img.shields.io/github/issues/triggerjs/trigger)
![License](https://img.shields.io/github/license/triggerjs/trigger)

*毋須編寫 JavaScript，建立頁面捲動動畫。*

有時候我們想因應頁面捲動的位置建立動畫，或更新 HTML 元素的 CSS 樣式。就像影片播放一樣，動畫在頁面向上捲動時前進，向下捲動時後退。

使用 Trigger JS，在頁面捲動時即可透過 CSS 變數取得製作動畫所需的值，而毋須編寫任何 JavaScript 代碼，相關設置則可透過 HTML 屬性實現。[點擊這裡](https://codepen.io/collection/eJmoMr)查看範例。

閱讀本文檔的其他語言版本：[English](README.md)、[繁體中文](README.zh-Hant.md)、[简体中文](README.zh-Hans.md)。

## 如何使用

#### 方法一：使用 CDN 版本

1. 透過 script 標籤將 trigger.js 加載到網頁中：
   - UNPKG CDN:
    ```html
    <script src="//unpkg.com/@triggerjs/trigger" defer></script>
    ```
   - jsDelivr CDN:
    ```html
    <script src="//cdn.jsdelivr.net/npm/@triggerjs/trigger" defer></script>
    ```

2. 為對應的 DOM 元素加上 `tg-name` 屬性，設定值等於接收數值的 CSS 變數名。

```html
<div tg-name="scrolled" id="greeting">Hello, World</div>
```

上述例子中，CSS 變數 `--scrolled` 會被加入到 `#greeting` 選擇器中：

```html
<style>
  body {
    padding: 100vh 0; /* 確保頁面有足夠空間捲動 */
  }

  #greeting {
    transform: translateX(calc(var(--scrolled) * 1px)); /* 轉換為 px 單位 */
  }
</style>
```

5. 捲動頁面，測試效果。

#### 方法二：從原始碼打包

1. 從以下任一途徑獲取原始碼：
   - GitHub
   ```bash
   git clone https://github.com/triggerjs/trigger.git
   ```
   - NPM
   ```bash
   npm i @triggerjs/trigger
   ```
2. 切換到目錄內，安裝依賴：
   ```bash
   npm install
   ```
3. 本身已經有一個預打包的版本在 `dist/bundle.js`。運行一個本地網頁伺服器，查看範例歡迎頁 `index.html`：
   1. 例如透過運行 `npx serve`
   2. 在瀏覽器中打開 `http://localhost:5000`
   3. 捲動頁面，測試效果。
4. 以下指令會打包一個新的版本到 `dist/bundle.js`:
   - 開發環境版本（持續監聽修改）：
     ```bash
     npm run watch
     ```
   - 開發環境版本：
     ```bash
     npm run build
     ```
   - 生產環境版本：
     ```bash
     npm run prod
     ```

## `tg-` 屬性列表

| 屬性名稱    | 類型 | 預設值       | 簡介                                                                                                                                                                                                                     |
| ----------- | ---- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `tg-name`   | 必填 | -            | 接收捲動值的 CSS 變數名稱，是否加上 `--` 前綴都可。                                                                                                                                                                      |
| `tg-from`   | 選填 | `0`          | 起始值                                                                                                                                                                                                                   |
| `tg-to`     | 選填 | `1`          | 終點值                                                                                                                                                                                                                   |
| `tg-steps`  | 選填 | `100`        | 從 `tg-from` 至 `tg-to` 之間觸發多少次                                                                                                                                                                                   |
| `tg-step`   | 選填 | `0`          | 每次遞加的數值，如果此值不為 `0`，則會忽略 `tg-steps` 的設定。                                                                                                                                                           |
| `tg-map`    | 選填 | (空白字串)   | 將一個值映射至另一個值。格式：<br>- 一個值映射至另一個值：`value: newValue; value2: newValue2`<br>- 多個值映射至另一個值：`value,value2,value3: newValue`<br>- 一個範圍映射至另一個值：`value...value2: newValue`        |
| `tg-filter` | 選填 | (空白字串)   | 只當捲動值在列表當中時才觸發，格式：`1,3,5,7,9`。預設情況下，過濾模式是 `retain`（保留值），在設定值末端加入 `!` 符號可以將模式切換為 `exact`（絕對）。關於兩個模式的分別，請參考後續的內容。                            |
| `tg-edge`   | 選填 | cover        | 計算捲動值的起始點與結束點。`cover` 代表畫面外至畫面外，即在元素從底部進入畫面時開始計算，從頂部完整離開畫面時結束；`inset` 代表當元素的頂部觸及頁面的頂部時開始計算，元素的底部觸及頁面的底部時結束。以下將有圖解說明。 |
| `tg-follow` | 選填 | (空白字串)   | 引用其他元素的計算值。`tg-follow` 的設定值等於目標元素的 `tg-ref` 設定值。**注意**：當設定了 `tg-follow`，同一元素下的 `tg-from`、`tg-to`、`tg-steps`、`tg-step` 以及 `tg-edge` 設定會被忽略。                           |
| `tg-ref`    | 選填 | (空白字串)   | 定義可以被其他元素透過 `tg-follow` 引用的名稱。                                                                                                                                                                          |
| `tg-bezier` | 選填 | (空白字符串) | 貝茲曲線設定，設定值為 `ease`、`easeIn`、`easeOut`、`easeInOut` 或自定義的貝茲曲線數值，格式是：`p1x,p1y,p2x,p2y`。                                                                                                      |

## 映射 (Value Mapping)

數字並不適用於所有情況。例如，我們希望在捲動頁面的時候更改文字顏色，這個時候 `tg-map` 屬性就派上用場了。

以下例子示範如何根據下表的規則更新文字顏色：

| 元素位置（從頁底起） | 捲動的值 | 文字顏色 |
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
    padding: 100vh 0; /* 確保頁面有足夠空間捲動 */
  }

  #heading {
    color: var(--color);
  }
</style>
```

## Steps & Step

假設 `tg-from="200"` 以及 `tg-to="-200"`，我們想透過 `transform: translateX()` 將一個元素在 x 方向移動。`tg-steps` 讓我們設定從 `200` 到 `-200` 總共有多少步，舉個例子，`tg-steps="400"` 等於用 `400` 步從 `200` 遞減到 `-200`，每一步等於 `1`；換句話說，`tg-steps="800"` 就代表每一步等於 `0.5`。

但是有些時候，我們不想自行運算，這就是 `tg-step` 出現的原因。`tg-step` 直接定義每一步的值，所以如果定義了 `tg-step`，`tg-steps` 就會被忽略。

## 降噪

有時我們只對某些特定的值感興趣。例如，我們只想知道從 `0` 至 `100` (`tg-from="0"` 以及 `tg-to="100"`) 之間，什麼時候出現 `25, 50, 75`。在這個情況中，`tg-filter` 就可以幫上忙。

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
    padding: 100vh 0; /* 確保頁面有足夠空間捲動 */
  }

  #heading {
    color: var(--color);
  }
</style>
```

## `tg-filter` 的模式

`tg-filter` 有兩個模式，預設是 `retain`，另一個設定值是 `exact`。為了更好的說明差異，請參閱以下例子：

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
    padding: 100vh 0; /* 確保頁面有足夠空間捲動 */
  }

  #heading {
    --color: black;
    color: var(--color);
  }
</style>
```

上述例子中，文字顏色初始是黑色，而將文字捲動到頁面中間時，會變為藍色。不過文字就永遠都不會變回黑色了，因為沒有讓它改變為黑色的觸發點。

如果我們想文字顏色只在計算值是 `5` 的時候改變為藍色，其他時候是黑色，可以將代碼更改為：

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

這樣雖然可以，不過很快我們的代碼就變得冗長。為了解決這個情況，我們可以將模式切換為 `exact`，只須在 `tg-filter` 的末端加入 `!` 符號即可：

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

在 `exact` 模式下，`--color` 只會在計算值等於 `5` 的時候設定為 `blue`，其他值的時候就變為預設值。

直接在 `tg-filter` 中加入 `!` 符號這種設計，主要是考慮到這種需求應該只會在 `tg-filter` 中發生。如果又另外建立一個屬性來設定模式，可能會變得不需要甚至容易誤解。

## 繼承

就像一些 CSS 屬性一樣，`tg-` 屬性（除了 `tg-follow`，`tg-ref`）的值會繼承自父級元素（如果當前元素沒有設定的話）。如果不希望繼承父級元素的值，並設定為預設值的話，只需增加沒有值的 `tg-` 屬性即可。例如：

```html
<div tg-name="scale" tg-from="0" tg-to="50">
  <span tg-name="color" tg-to>
    <!-- tg-to 現在的值是 1（預設值） -->
  </span>
</div>
```

## `tg-edge` 圖解

`cover`（預設值）和 `edge` 的分別如下圖所示：

![](/readme-assets/tg-edge-explaination.png)

所以當 `tg-edge="inset"`，元素的高度必須大於瀏覽器視窗（`window.clientHeight`）的高度。

## JavaScript 事件

我們也可監聽指定元素的 `tg` 事件來獲取值：

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

## 自定義前綴

假如你擔心 `tg-` 前綴可能不符合 HTML 5 的標準，可以透過在 `body` 標籤中加入 `data-trigger-prefix` 去自定義它：

```html
<body data-trigger-prefix="data-tg">
  <div data-tg-name="scrolled" id="greeting">Hello, World</div>
</body>
```

上述例子中將前綴自定義為 `data-tg`。`data-*` 是完全符合 HTML5 標準的屬性，用於設置自定義的屬性和設定值。

## 參與開發

歡迎 Fork 這個 Repo 進行開發，並提交 Pull Requests。在 [GitHub Issues](https://github.com/triggerjs/trigger/issues) 回報 Bug，在 [GitHub Discussions](https://github.com/triggerjs/trigger/discussions) 討論功能／想法／問題。

## 授權協議

Trigger.js 使用 [MIT 授權](LICENSE).
