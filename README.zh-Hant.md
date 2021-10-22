# Trigger JS

透過 CSS 變數獲取頁面捲動的相對位置。經由映射功能，我們可以輕易地因應頁面捲動位置製作動畫，將頁面捲軸變為影片播放器的時間軸一樣。

閱讀本文檔的其他語言版本：[English](README.md)、[繁體中文](README.zh-Hant.md)、[简体中文](README.zh-Hans.md)。

## 簡介

有時候我們想因應頁面捲動的位置建立動畫，又或更新 DOM 元素的 CSS 樣式。而且它應該像影片播放一樣，動畫在頁面向上捲動時後退，頁面向下捲動時前進。

## 如何使用

1. 透過 script 標籤將 trigger.js 加載到網頁中：

```html
<script src="//unpkg.com/@triggerjs/trigger" defer></script>
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

3. 捲動頁面，測試效果。

## `tg-` 屬性列表

| 屬性名稱    | 類型 | 預設值     | 簡介                                                                                                                                         |
| ----------- | ---- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `tg-name`   | 必填 | -          | 接收捲動值的 CSS 變數名稱，是否加上 `--` 前綴都可。                                                                                          |
| `tg-from`   | 選填 | `0`        | 起始值                                                                                                                                       |
| `tg-to`     | 選填 | `1`        | 終點值                                                                                                                                       |
| `tg-steps`  | 選填 | `100`      | 從 `tg-from` 至 `tg-to` 之間觸發多少次                                                                                                       |
| `tg-step`   | 選填 | `0`        | 每次遞加的數值，如果此值不為 `0`，則會忽略 `tg-steps` 的設定。                                                                               |
| `tg-map`    | 選填 | (空白字串) | 將一個值映射至另一個值。格式：`value: newValue; value2: newValue2`。亦支援同時將多個值映射至另一個值：`value,value2,value3: newValue`        |
| `tg-filter` | 選填 | (空白字串) | 只當捲動值在列表當中時才觸發。格式：`1,3,5,7,9`                                                                                              |
| `tg-edge`   | 選填 | cover      | 計算捲動值的起始點。`cover` 代表畫面外至畫面外，即在元素進入畫面時即開始計算；`inset` 代表在元素完整進入畫面時開始計算，在剛離開畫面時終止。 |

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
    padding: 100vh 0; /* In order to make the page have enough rooms for scrolling */
  }

  #heading {
    color: var(--color);
  }
</style>
```

## 繼承

就像一些 CSS 屬性一樣，`tg-` 屬性的值會繼承自父級元素（如果當前元素沒有設定的話）。如果不希望繼承父級元素的值，並設定為預設值的話，只需增加沒有值的 `tg-` 屬性即可。例如：

```html
<div tg-name="scale" tg-from="0" tg-to="50">
  <span tg-name="color" tg-to>
    <!-- tg-to 現在的值是 1（預設值） -->
  </span>
</div>
```

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
  document.querySelector("#heading").addEventListener("tg", (e) => {
    console.log(e.detail); // {value: '#666'}
  });
</script>
```

## 參與開發

歡迎 Fork 這個 Repo 進行開發，並提交 Pull Requests。我們會在 GitHub Issues 中進行討論。

## 授權協議

Trigger.js 使用 [MIT 授權](LICENSE).
